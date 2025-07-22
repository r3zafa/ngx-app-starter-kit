import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCardDetailsDialogComponent } from './country-card-details-dialog.component';

describe('CountryCardDetailsDialogComponent', () => {
  let component: CountryCardDetailsDialogComponent;
  let fixture: ComponentFixture<CountryCardDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryCardDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryCardDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
