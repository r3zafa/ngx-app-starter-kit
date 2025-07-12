import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTogglerComponent } from './menu-toggler.component';

describe('MenuTogglerComponent', () => {
  let component: MenuTogglerComponent;
  let fixture: ComponentFixture<MenuTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTogglerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
