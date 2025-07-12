import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavExpandTogglerComponent } from './sidenav-expand-toggler.component';

describe('SidenavExpandTogglerComponent', () => {
  let component: SidenavExpandTogglerComponent;
  let fixture: ComponentFixture<SidenavExpandTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavExpandTogglerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavExpandTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
