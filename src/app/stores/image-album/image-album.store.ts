import { signalStore, withState, withMethods, withComputed, withHooks, patchState } from '@ngrx/signals';
import { ImageAlbum, ImageAlbumState } from './image-album.interfaces';
import { computed } from '@angular/core';

const initialState: ImageAlbumState = {
  albums: [],
  error: null,
  isLoading: false,
  currentImageUrl: null,
  selectedAlbumIndex: null
};

/**
 * Image Album Data Management Store
 *
 * @description
 * SignalStore implementation for managing image albums with:
 * - Album navigation
 * - Image navigation
 * - Error and loading state
 * - Selection and current image info
 */
export const ImageAlbumStore = signalStore(
  { providedIn: 'root' },

  withState<ImageAlbumState>(initialState),

  withMethods((store) => ({
    prevFolder: () => {
      const idx = store.selectedAlbumIndex();
      if (idx !== null && idx > 0) {
        patchState(store, { selectedAlbumIndex: idx - 1 });
      }
    },
    nextFolder: () => {
      const idx = store.selectedAlbumIndex();
      if (idx !== null && idx < store.albums().length - 1) {
        patchState(store, { selectedAlbumIndex: idx + 1 });
      }
    },
    navigateImage: (offset: number) => {
      const idx = store.selectedAlbumIndex();
      if (idx === null) return;
      const album = store.albums()[idx];
      let newIdx = album.currentImageIndex + offset;
      newIdx = Math.max(0, Math.min(album.images.length - 1, newIdx));
      const updatedAlbums = store.albums().map((a, i) =>
        i === idx ? { ...a, currentImageIndex: newIdx } : a
      );
      // Update currentImageUrl
      let currentImageUrl: string | null = null;
      if (album.images.length > 0) {
        currentImageUrl = URL.createObjectURL(album.images[newIdx]);
      }
      patchState(store, { albums: updatedAlbums, currentImageUrl });
    },
    goToFirstImage: () => {
      const idx = store.selectedAlbumIndex();
      if (idx === null) return;
      const album = store.albums()[idx];
      const updatedAlbums = store.albums().map((a, i) =>
        i === idx ? { ...a, currentImageIndex: 0 } : a
      );
      let currentImageUrl: string | null = null;
      if (album.images.length > 0) {
        currentImageUrl = URL.createObjectURL(album.images[0]);
      }
      patchState(store, { albums: updatedAlbums, currentImageUrl });
    },
    goToLastImage: () => {
      const idx = store.selectedAlbumIndex();
      if (idx === null) return;
      const album = store.albums()[idx];
      const updatedAlbums = store.albums().map((a, i) =>
        i === idx ? { ...a, currentImageIndex: a.images.length - 1 } : a
      );
      let currentImageUrl: string | null = null;
      if (album.images.length > 0) {
        currentImageUrl = URL.createObjectURL(album.images[album.images.length - 1]);
      }
      patchState(store, { albums: updatedAlbums, currentImageUrl });
    },
    setImages: (images: File[]) => {
      // Group files by subfolder name using webkitRelativePath
      const albumMap: Record<string, File[]> = {};
      images.forEach(file => {
        // webkitRelativePath: "folder/subfolder/file.jpg"
        const relPath = (file as any).webkitRelativePath || file.name;
        const parts = relPath.split('/');
        // Use first subfolder as album name, or 'Default' if none
        let albumName = parts.length > 1 ? parts[parts.length - 2] : 'Default';
        if (!albumMap[albumName]) albumMap[albumName] = [];
        albumMap[albumName].push(file);
      });
      const albums = Object.entries(albumMap).map(([name, files]) => ({
        name,
        images: files,
        currentImageIndex: 0
      }));
      // Set currentImageUrl to first image of first album if available
      let currentImageUrl: string | null = null;
      if (albums.length > 0 && albums[0].images.length > 0) {
        currentImageUrl = URL.createObjectURL(albums[0].images[0]);
      }
      patchState(store, {
        albums,
        error: null,
        isLoading: false,
        selectedAlbumIndex: albums.length > 0 ? 0 : null,
        currentImageUrl
      });
    },
    setAlbums: (albums: ImageAlbum[]) => {
      patchState(store, { albums, error: null, isLoading: false });
    },
    setLoading: (isLoading: boolean) => {
      patchState(store, { isLoading });
    },
    setError: (error: any) => {
      patchState(store, { error: error?.message || String(error) });
    },
    setCurrentImageUrl: (url: string | null) => {
      patchState(store, { currentImageUrl: url });
    },
    setSelectedAlbumIndex: (index: number | null) => {
      // Update currentImageUrl to first image of selected album
      let currentImageUrl: string | null = null;
      const albums = store.albums();
      if (index !== null && albums[index] && albums[index].images.length > 0) {
        currentImageUrl = URL.createObjectURL(albums[index].images[0]);
      }
      patchState(store, { selectedAlbumIndex: index, currentImageUrl });
    }
  })),

  withComputed((store) => ({
    albums: store.albums,
    currentImageUrl: store.currentImageUrl,
    selectedAlbumIndex: store.selectedAlbumIndex,
    isLoading: store.isLoading,
    selectedAlbum: computed(() => {
      const idx = store.selectedAlbumIndex();
      return idx !== null ? store.albums()[idx] : null;
    }),
    currentImageInfo: computed(() => {
      const idx = store.selectedAlbumIndex();
      const album = idx !== null ? store.albums()[idx] : null;
      if (!album) return null;
      const imageIdx = album.currentImageIndex;
      return album.images[imageIdx] || null;
    }),
    currentImageNavInfo: computed(() => {
      const idx = store.selectedAlbumIndex();
      const album = idx !== null ? store.albums()[idx] : null;
      if (!album) return null;
      return {
        current: album.currentImageIndex + 1,
        total: album.images.length
      };
    })
  })),

  withHooks({
    onInit(store) {
      // Optionally, load initial albums or perform setup here
    },
    onDestroy() {
      // Cleanup if needed
    }
  })
);
