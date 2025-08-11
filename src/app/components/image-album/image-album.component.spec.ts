import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAlbumComponent } from './image-album.component';

describe('ImageAlbumComponent', () => {
  let component: ImageAlbumComponent;
  let fixture: ComponentFixture<ImageAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageAlbumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
