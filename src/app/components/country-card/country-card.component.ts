import { Component, computed, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CountriesStore, Country } from '../../stores';
import { CommonModule } from '@angular/common';
import { CountryCardDetailsDialogComponent } from '../country-card-details-dialog/country-card-details-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    CountryCardDetailsDialogComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.scss'
})
export class CountryCardComponent {
  readonly countriesStore = inject(CountriesStore);
  private dialog = inject(MatDialog);

  country = input.required<Country>();
  
  isSelected = computed(() => this.countriesStore.selectedCountry()?.cca3 === this.country().cca3);

  openCountryDialog() {
    this.countriesStore.selectCountry(this.country());

    this.dialog.open(CountryCardDetailsDialogComponent, {
      width: 'calc(100dvw - 8rem)',
      height: 'calc(100dvh - 8rem)',
      maxHeight: '100dvh',
      maxWidth: '100dvw',
      data: {
        country: this.country()
      },
      autoFocus: false
    });
  }

}