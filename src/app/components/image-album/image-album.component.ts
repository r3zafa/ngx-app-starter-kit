import { Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { ImageAlbumStore } from '../../stores/image-album/image-album.store';

@Component({
    selector: 'app-image-album',
    standalone: true,
    imports: [
        MatProgressSpinner,
        MatCard,
        NgOptimizedImage,
        MatButton,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption
    ],
    templateUrl: './image-album.component.html',
    styleUrls: ['./image-album.component.scss']
})
export class ImageAlbumComponent {
    public imageAlbumStore = inject(ImageAlbumStore);

    // Expose properties for template
    albums = this.imageAlbumStore.albums;
    currentImageUrl = this.imageAlbumStore.currentImageUrl;
    selectedAlbumIndex = this.imageAlbumStore.selectedAlbumIndex;
    isLoading = this.imageAlbumStore.isLoading;
    selectedAlbum = this.imageAlbumStore.selectedAlbum;
    currentImageInfo = this.imageAlbumStore.currentImageInfo;
    currentImageNavInfo = this.imageAlbumStore.currentImageNavInfo;

    // File input handler
    onFilesSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectRootFolder(Array.from(input.files));
        }
    }

    selectRootFolder(images: File[]) {
        this.imageAlbumStore.setImages(images);
    }

    onAlbumSelect(index: number) {
        this.imageAlbumStore.setSelectedAlbumIndex(index);
    }

    prevFolder() {
        this.imageAlbumStore.prevFolder();
    }

    nextFolder() {
        this.imageAlbumStore.nextFolder();
    }

    navigateImage(offset: number) {
        this.imageAlbumStore.navigateImage(offset);
    }

    goToFirstImage() {
        this.imageAlbumStore.goToFirstImage();
    }

    goToLastImage() {
        this.imageAlbumStore.goToLastImage();
    }

    trackByAlbumName(index: number, album: any) {
        return album.name;
    }
}