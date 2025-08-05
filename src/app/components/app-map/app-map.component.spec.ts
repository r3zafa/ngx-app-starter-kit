import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMapComponent } from './app-map.component';

describe('MapComponent', () => {
  let component: AppMapComponent;
  let fixture: ComponentFixture<AppMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
