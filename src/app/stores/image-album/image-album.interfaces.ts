

export interface ImageAlbum {
    name: string;
    images: File[];
    currentImageIndex: number;
}


export interface ImageAlbumState {
    albums: ImageAlbum[];
    selectedAlbumIndex: number | null;
    currentImageUrl: string | null;
    isLoading: boolean;
    error: string | null;
}
