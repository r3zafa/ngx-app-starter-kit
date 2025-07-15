import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Desktop404Component } from './desktop-404.component';

describe('Desktop404Component', () => {
  let component: Desktop404Component;
  let fixture: ComponentFixture<Desktop404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Desktop404Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Desktop404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
