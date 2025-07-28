import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';
import {CountriesStore} from '../../stores';
import {CountryCardComponent} from "../../components/country-card/country-card.component";

@Component({
    selector: 'app-countries',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatOptionModule,
        CountryCardComponent,
        MatIcon
    ],
    templateUrl: './countries.component.html',
    styleUrl: './countries.component.scss'
})
export class CountriesComponent {

    readonly countriesStore = inject(CountriesStore);

    handleSearch(event: Event) {
        const target = event.target as HTMLInputElement;
        this.countriesStore.setSearchQuery(target.value);
    }

    onRegionsChange(regions: string[]) {
        this.countriesStore.setRegions(regions);
    }

    onSortChange(sortOption: 'alphabetical' | 'reverse-alphabetical' | 'region') {
        this.countriesStore.setSortOption(sortOption);
    }

}