import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Err404MobileComponent } from './err-404-mobile.component';

describe('Mobile404Component', () => {
  let component: Mobile404Component;
  let fixture: ComponentFixture<Err404MobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Err404MobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Err404MobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
