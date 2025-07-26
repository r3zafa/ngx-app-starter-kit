import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAppMapComponent } from './ngx-app-map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxAppMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxAppMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
