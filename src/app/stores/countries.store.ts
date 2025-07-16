// countries.store.ts
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, retry, delay, catchError, of } from 'rxjs';

// Define the exact fields we want from the API
type Country = {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  population: number;
  flags: {
    png: string;
    svg: string;
  };
};

interface CountriesState {
  countries: Country[];
  loading: boolean;
  error: string | null;
  selectedRegion: string | null;
}

const initialState: CountriesState = {
  countries: [],
  loading: false,
  error: null,
  selectedRegion: null
};

// Fields we want to request from the API
const API_FIELDS = [
  'name',
  'capital',
  'region',
  'population',
  'flags'
].join(',');

export const CountriesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, http = inject(HttpClient)) => ({
    loadCountries: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() => {
          const url = `https://restcountries.com/v3.1/all?fields=${API_FIELDS}`;
          return http.get<Country[]>(url).pipe(
            retry(2),
            delay(500),
            tap({
              next: (countries) => patchState(store, { 
                countries, 
                loading: false 
              }),
              error: (error) => patchState(store, { 
                error: 'Failed to load countries. Please try again later.', 
                loading: false 
              })
            }),
            catchError(() => of([])) // Return empty array on error
          );
        })
      )
    ),
    setRegion(region: string | null) {
      patchState(store, { selectedRegion: region });
    }
  })),
  withComputed((store) => ({
    filteredCountries: computed(() => {
      if (!store.selectedRegion()) return store.countries();
      return store.countries().filter(
        country => country.region === store.selectedRegion()
      );
    }),
    regions: computed(() => {
      const regions = new Set(store.countries().map(country => country.region));
      return Array.from(regions).sort();
    }),
    totalPopulation: computed(() => {
      return store.countries().reduce((sum, country) => sum + country.population, 0);
    })
  }))
);