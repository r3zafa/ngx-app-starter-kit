import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoAlbumComponent } from './photo-album.component';

describe('PhotoAlbumComponent', () => {
  let component: PhotoAlbumComponent;
  let fixture: ComponentFixture<PhotoAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoAlbumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
