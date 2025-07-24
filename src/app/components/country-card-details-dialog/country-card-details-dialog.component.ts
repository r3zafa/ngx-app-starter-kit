import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CountriesStore } from '../../stores';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-country-card-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTableModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIcon
  ],
  templateUrl: './country-card-details-dialog.component.html',
  styleUrl: './country-card-details-dialog.component.scss'
})
export class CountryCardDetailsDialogComponent {

  readonly countriesStore = inject(CountriesStore);
  displayedColumns: string[] = ['name', 'value'];
  selectedToggle = 'info'; // Set 'info' as the default selection

  classNameFromName(str:string) {
    return str.replace(/\s/g, "-").toLowerCase();
  }
}


