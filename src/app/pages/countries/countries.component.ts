import { Component, inject } from '@angular/core';
import {CountriesStore} from '../../stores'

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss'
})
export class CountriesComponent {
 countriesStore = inject(CountriesStore);

   onRegionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      this.countriesStore.setRegion(selectElement.value);
    }
  }
}
