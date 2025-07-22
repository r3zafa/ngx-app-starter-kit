import { signalStore, withState, withMethods, withComputed, patchState, withHooks } from '@ngrx/signals';
import { computed, inject, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, retry, delay, catchError, map, of, forkJoin } from 'rxjs';
import { Country, CountriesState, SortOption } from './countries.interfaces';
import { BASIC_FIELDS, DETAIL_FIELDS_GROUP1, DETAIL_FIELDS_GROUP2, initialState } from './countries.constants';
import { createEmptyCountry, sortCountriesAlphabetically, sortCountriesByRegion, sortCountriesReverseAlphabetically } from './countries.helpers';


/**
 * Country Data Management Store
 * 
 * @description
 * SignalStore implementation for managing country data with:
 * - API data fetching
 * - Filtering and sorting
 * - Detailed country information
 * - Search functionality
 */
export const CountriesStore = signalStore(
  { providedIn: 'root' },

  withState<CountriesState>(initialState),

  withMethods((store, http = inject(HttpClient)) => ({

    loadCountries: rxMethod<void>(pipe(
      tap(() => patchState(store, { loading: true, error: null })),
      switchMap(() => http.get<Country[]>(`https://restcountries.com/v3.1/all?fields=${BASIC_FIELDS}`).pipe(tap({
        next: (countries) => patchState(store, {
          countries: countries.map(createEmptyCountry),
          loading: false
        }),
        error: (error) => patchState(store, {
          error: 'Failed to load countries',
          loading: false
        })
      }),
        catchError(() => [])
      )))
    ),

    loadCountryDetails: (cca3: string) => {
      const existing = store.countries().find((c: Country) => c.cca3 === cca3);
      if (existing?.subregion && existing?.borders) return of(existing);

      const url1 = `https://restcountries.com/v3.1/alpha/${cca3}?fields=${DETAIL_FIELDS_GROUP1}`;
      const url2 = `https://restcountries.com/v3.1/alpha/${cca3}?fields=${DETAIL_FIELDS_GROUP2}`;

      return forkJoin([
        http.get<Country>(url1),
        http.get<Country>(url2)
      ]).pipe(
        map(([details1, details2]) => ({ ...details1, ...details2 })),
        tap(details => {
          patchState(store, state => ({
            countries: state.countries.map((c: Country) =>
              c.cca3 === cca3 ? { ...createEmptyCountry(c), ...details } : c
            ),
            selectedCountry: state.selectedCountry?.cca3 === cca3 ?
              { ...state.selectedCountry, ...details } :
              state.selectedCountry
          }));
        }),
        catchError(() => of(null))
      );
    },

    setRegions: (regions: string[]) => {
      patchState(store, { selectedRegions: regions });
    },

    setSearchQuery: (query: string) => {
      patchState(store, { searchQuery: query.toLowerCase() });
    },

  })),

  withMethods((store) => ({

    selectCountry: rxMethod<Country | null>(pipe(
      tap(country => patchState(store, { selectedCountry: country })),
      switchMap(country => {
        if (!country?.cca3) return [null];
        return store.loadCountryDetails(country.cca3);
      })
    )),

    setSortOption: (option: SortOption) => {
      patchState(store, { sortOption: option });
    },

  })),

  withComputed((store) => {

    const regions = computed(() => {
      const regions = new Set(store.countries().map((c: Country) => c.region));
      return Array.from(regions).sort();
    });

    const filteredCountries = computed(() => {
      const { countries, selectedRegions, searchQuery } = store;
      let result = countries();

      if (selectedRegions().length > 0) {
        result = result.filter((c: Country) => selectedRegions().includes(c.region));
      }

      if (searchQuery()) {
        const query = searchQuery().toLowerCase();
        result = result.filter((c: Country) =>
          c.name.common.toLowerCase().startsWith(query) ||
          c.capital?.[0]?.toLowerCase()?.startsWith(query)
        );
      }

      return result;
    });

    const sortedCountries = computed(() => {
      const countries = filteredCountries();
      switch (store.sortOption()) {
        case 'reverse-alphabetical':
          return sortCountriesReverseAlphabetically(countries);
        case 'region':
          return sortCountriesByRegion(countries);
        case 'alphabetical':
        default:
          return sortCountriesAlphabetically(countries);
      }
    });

    return {
      regions,
      filteredCountries,
      sortedCountries,
      regionsForSelect: computed(() => store.selectedRegions().length === 0 ? ['All Regions', ...regions()] : regions()),
      selectedCountryDetails: computed(() => store.selectedCountry()),
    }

  }),

  withHooks({
    onInit(store) { store.loadCountries(); },
    onDestroy() { console.log('Store destroyed'); }
  })
);

