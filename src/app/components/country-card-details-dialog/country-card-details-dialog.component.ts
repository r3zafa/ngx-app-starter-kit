import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CountriesStore, Country } from '../../stores';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-card-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './country-card-details-dialog.component.html',
  styleUrl: './country-card-details-dialog.component.scss'
})
export class CountryCardDetailsDialogComponent {

  readonly countriesStore = inject(CountriesStore);

  displayedColumns: string[] = ['name', 'value'];

}


