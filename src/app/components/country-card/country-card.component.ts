import {Component, computed, inject, input, InputSignal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {LayoutService} from '../../shared/';
import {CountriesStore, Country} from '../../stores';
import {CountryCardDetailsDialogComponent} from "../country-card-details-dialog/country-card-details-dialog.component";

@Component({
    selector: 'app-country-card',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './country-card.component.html',
    styleUrl: './country-card.component.scss'
})
export class CountryCardComponent {
    readonly countriesStore = inject(CountriesStore);
    private dialog = inject(MatDialog);
    private layoutService = inject(LayoutService);

    country: InputSignal<Country> = input.required<Country>();

    isSelected = computed(() => this.countriesStore.selectedCountry()?.cca3 === this.country().cca3);

    openCountryDialog() {
        this.countriesStore.selectCountry(this.country());

        const CONFIG_1 = {
            autoFocus: false,
            width: '50dvw',
            minWidth: '800px',
            height: '90dvh'
        }

        const CONFIG_2 = {
            autoFocus: false,
            width: '90dvw',
            minWidth: '75dvw',
            height: '90dvh'
        }

        const dialogConfig = this.layoutService.layoutPC().matches ? CONFIG_1 : CONFIG_2;

        this.dialog.open(CountryCardDetailsDialogComponent, dialogConfig);


    }

}