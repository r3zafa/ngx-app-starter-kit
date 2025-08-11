import { Component } from '@angular/core';
import { ImageAlbumComponent } from '../../components/image-album/image-album.component';

@Component({
  selector: 'app-photo-album',
  standalone: true,
  imports: [ImageAlbumComponent],
  templateUrl: './photo-album.component.html',
  styleUrl: './photo-album.component.scss'
})
export class PhotoAlbumComponent {

}
