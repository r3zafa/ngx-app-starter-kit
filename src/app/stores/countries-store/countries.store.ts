import { signalStore, withState, withMethods, withComputed, patchState, withHooks } from '@ngrx/signals';
import { computed, inject, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, catchError, map, of, forkJoin } from 'rxjs';
import { Country, CountriesState, CountrySortOptionType } from './countries.interfaces';
import { BASIC_FIELDS, DETAIL_FIELDS_GROUP1, DETAIL_FIELDS_GROUP2, DETAIL_FIELDS_GROUP3, initialState } from './countries.constants';
import { capitalizeFirstLetter, createEmptyCountry, createLink, formatObjectAsHtmlList, formatObjectAsHtmlTable, formatObjectValues, getCurrencies, getGiniCoefficient, getInternationalDialing, mapValues, sortCountriesAlphabetically, sortCountriesByRegion, sortCountriesReverseAlphabetically } from './countries.helpers';


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

    /**
     * Loads detailed information for a specific country
     * @method
     * @param cca3 - 3-letter country code
     * @returns Observable with detailed country data
     * @description
     * - Uses forkJoin to combine multiple API requests
     * - Checks for existing complete data before making requests
     * - Properly merges results from all three field groups
     * - Updates both countries list and selected country
     */
    loadCountryDetails: (cca3: string) => {
      const existing = store.countries().find((c: Country) => c.cca3 === cca3);

      // Check if we already have all necessary details
      const hasCompleteDetails = existing?.subregion &&
        existing?.borders &&
        existing?.translations;

      if (hasCompleteDetails) return of(existing);

      const url1 = `https://restcountries.com/v3.1/alpha/${cca3}?fields=${DETAIL_FIELDS_GROUP1}`;
      const url2 = `https://restcountries.com/v3.1/alpha/${cca3}?fields=${DETAIL_FIELDS_GROUP2}`;
      const url3 = `https://restcountries.com/v3.1/alpha/${cca3}?fields=${DETAIL_FIELDS_GROUP3}`;

      return forkJoin([
        http.get<Partial<Country>>(url1),
        http.get<Partial<Country>>(url2),
        http.get<Partial<Country>>(url3)
      ]).pipe(
        map(([details1, details2, details3]) => ({
          ...details1,
          ...details2,
          ...details3
        })),
        tap(details => {
          patchState(store, state => ({
            countries: state.countries.map((c: Country) => c.cca3 === cca3 ? { ...createEmptyCountry(c), ...details } : c),
            selectedCountry: state.selectedCountry?.cca3 === cca3 ? { ...state.selectedCountry, ...details } : state.selectedCountry,
          }));
        }),
        catchError((error) => {
          console.error('Error loading country details:', error);
          return of(null);
        })
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
      tap(country => patchState(store, { selectedCountry: country, loading: country !== null })),
      switchMap(country => {
        if (!country?.cca3) return of(null);

        // Check if we already have complete details
        const hasCompleteDetails = country.subregion && country.borders && country.translations;

        if (hasCompleteDetails) {
          patchState(store, { loading: false });
          return of(country);
        }

        return store.loadCountryDetails(country.cca3).pipe(
          tap({
            next: (details) => {
              if (details) {
                patchState(store, {
                  selectedCountry: { ...country, ...details },
                  loading: false
                });
              }
            },
            error: (error) => {
              console.error('Error loading country details:', error);
              patchState(store, {
                error: 'Failed to load country details',
                loading: false
              });
            }
          })
        );
      })
    )),

    setSortOption: (option: CountrySortOptionType) => {
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

      if (selectedRegions().length > 0 && selectedRegions().length <= regions().length) {
        result = result.filter((c: Country) => selectedRegions().includes(c.region));
      }

      if (searchQuery() && searchQuery().length > 0) {
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

    const selectedCountryWithDetails = computed(() => {
      const selected = store.selectedCountry();
      if (!selected) return null;
      // Get the most current version from countries list
      return store.countries().find(c => c.cca3 === selected.cca3) || selected;
    });

    const selectedCountryTableDataSource = computed(() => {
      const country = selectedCountryWithDetails();
      if (!country) return [];

      return [
        { name: 'Official Name', value: country.name.official },
        { name: 'Common Name', value: country.name.common },
        { name: 'Native Name', value: formatObjectAsHtmlList(country.name.nativeName) },
        { name: 'Capital', value: country.capital?.join(', ') || 'N/A' },
        { name: 'Region', value: country.region },
        { name: 'Subregion', value: country.subregion || 'N/A' },
        { name: 'Area', value: `${country.area?.toLocaleString() || 'N/A'} km²` },
        { name: 'Population', value: country.population?.toLocaleString() || 'N/A' },
        { name: 'Time Zones', value: country.timezones?.join(', ') || 'N/A' },
        { name: 'Continents', value: country.continents?.join(', ') || 'N/A' },
        { name: 'Country Codes', value: `CCA2: ${country.cca2 || 'N/A'}, CCA3: ${country.cca3}, CCN3: ${country.ccn3 || 'N/A'}, CIOC: ${country.cioc || 'N/A'}` },
        { name: 'Top Level Domain', value: country.tld?.join(', ') || 'N/A' },
        { name: 'Independent', value: country.independent ? 'Yes' : 'No' },
        { name: 'Status', value: country.status || 'N/A' },
        { name: 'UN Member', value: country.unMember ? 'Yes' : 'No' },
        { name: 'Currencies', value: getCurrencies(country.currencies) },
        { name: 'International Dialing', value: getInternationalDialing(country.idd) },
        { name: 'Alternative spellings', value: country.altSpellings?.join(', ') || 'N/A' },
        { name: 'Languages', value: mapValues(country.languages) },
        { name: 'Coordinates', value: country.latlng?.join(', ') || 'N/A' },
        { name: 'Landlocked', value: country.landlocked ? 'Yes' : 'No' },
        { name: 'Bordering Countries', value: country.borders?.join(', ') || 'None' },
        { name: 'Demonyms', value: formatObjectAsHtmlList(country.demonyms) },
        { name: 'Translations', value: formatObjectAsHtmlList(country.translations) },
        { name: 'Google Maps', value: country.maps?.googleMaps ? createLink(country.maps.googleMaps, 'Google Maps') : 'N/A' },
        { name: 'OpenStreetMap', value: country.maps?.openStreetMaps ? createLink(country.maps.openStreetMaps, 'OpenStreetMap') : 'N/A' },
        { name: 'Gini Coefficient', value: getGiniCoefficient(country.gini) || 'N/A' },
        { name: 'FIFA Code', value: country.fifa || 'N/A' },
        { name: 'Driving Side', value: country.car?.side ? capitalizeFirstLetter(country.car.side) : 'N/A' },
        { name: 'License plate country codes', value: country.car?.signs?.join(', ').toUpperCase() || 'N/A' },
        { name: 'Postal Code Format', value: country.postalCode?.format || 'N/A' },
        { name: 'Capital city coordinates', value: country.capitalInfo?.latlng?.join(', ') || 'N/A' },
        { name: 'Start of Week', value: country.startOfWeek ? capitalizeFirstLetter(country.startOfWeek) : 'N/A' },
      ];
    });


    return {
      regions,
      filteredCountries,
      sortedCountries,
      selectedCountryWithDetails,
      selectedCountryTableDataSource,
      regionsForSelect: computed(() => store.selectedRegions().length === 0 ? [...regions()] : regions()),
    }

  }),

  withHooks({
    onInit(store) { store.loadCountries(); },
    onDestroy() { console.log('Store destroyed'); }
  })
);



