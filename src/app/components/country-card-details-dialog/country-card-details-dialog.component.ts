import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { Country } from '../../stores';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-card-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule
  ],
  templateUrl: './country-card-details-dialog.component.html',
  styleUrl: './country-card-details-dialog.component.scss'
})
export class CountryCardDetailsDialogComponent {
  protected readonly data = inject<{ country: Country }>(MAT_DIALOG_DATA);
  numberPipe: any;

  // Helper to check if a value exists and should be displayed
  hasValue(value: any): boolean {
    return value !== undefined && value !== null &&
      (!Array.isArray(value) || value.length > 0) &&
      (typeof value !== 'object' || Object.keys(value).length > 0);
  }

  getCapitalCoordinates(): string | null {
    const latlng = this.data.country.capitalInfo?.latlng;
    if (!latlng || latlng.length !== 2) return null;

    const lat = this.numberPipe.transform(latlng[0], '1.2-2');
    const lng = this.numberPipe.transform(latlng[1], '1.2-2');
    return `(${lat}°N, ${lng}°E)`;
  }
}
