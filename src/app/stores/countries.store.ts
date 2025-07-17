import { signalStore, withState, withMethods, withComputed, patchState, withHooks } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap, retry, delay, catchError, scheduled, asapScheduler, map, of } from 'rxjs';


/**
 * @interface Country
 * Represents a country with its core properties:
 * @property name - Country name information
 * @property capital - Array of capital cities
 * @property region - Geographic region the country belongs to
 * @property [subregion] - More specific geographic classification
 * @property population - Total population count
 * @property flags - National flag images
 * @property cca3 - 3-letter country code (ISO 3166-1 alpha-3)
 * @property [languages] - Languages spoken in the country
 * @property [currencies] - Currencies used in the country
 * @property [maps] - Map service links
 * @property [coatOfArms] - National coat of arms images
 * @property [timezones] - Time zones observed in the country
 * @property [latlng] - Latitude and longitude coordinates
 * @property [area] - Total area in square kilometers
 * @property [capitalInfo] - Capital city coordinates
 * @property [independent] - Independence status
 * @property [status] - Country status (e.g., 'officially-assigned')
 */
export interface Country {
  /**
   *  @property common - Common name used in everyday language
   *  @property official - Official name used in formal contexts
   */
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  subregion?: string;
  population: number;
  /**
   *  @property png - PNG format flag image URL
   *  @property svg - SVG format flag image URL
   */
  flags: {
    png: string;
    svg: string;
  };
  cca3: string;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol?: string }>;
  /**
   * @property googleMaps - Google Maps URL
   * @property openStreetMaps - OpenStreetMap URL
   */
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
  /**
   * @property png - PNG format coat of arms image URL
   * @property svg - SVG format coat of arms image URL
   */
  coatOfArms?: {
    png: string;
    svg: string;
  };
  timezones?: string[];
  latlng?: [number, number];
  area?: number;
  capitalInfo?: {
    /** @property [latlng] - Latitude and longitude of the capital */
    latlng?: [number, number];
  };
  independent?: boolean;
  status?: string;
}

/**
 * @interface CountriesState
 * Represents the state structure of the countries store:
 * @property countries - Array of all loaded countries
 * @property loading - Loading status indicator
 * @property error - Error message if API requests fail
 * @property selectedRegions - Currently selected regions for filtering
 * @property searchQuery - Current search query for filtering
 * @property selectedCountry - Currently selected country details
 * @property detailedCountries - Cache of countries with detailed information
 */
export interface CountriesState {
  countries: Country[];
  loading: boolean;
  error: string | null;
  selectedRegions: string[];
  searchQuery: string;
  selectedCountry: Country | null;
  detailedCountries: Record<string, Country>;
}

/**
 * Initial state for the countries store
 * @constant
 * @type {CountriesState}
 */
export const initialState: CountriesState = {
  countries: [],
  loading: false,
  error: null,
  selectedRegions: [],
  searchQuery: '',
  selectedCountry: null,
  detailedCountries: {}
};

/**
 * Fields to fetch for basic country information
 * @constant
 * @type {string}
 */
const BASIC_FIELDS = ['name', 'capital', 'region', 'population', 'flags', 'cca3'].join(',');

/**
 * Additional fields to fetch for detailed country information
 * @constant
 * @type {string}
 */
const DETAIL_FIELDS = ['subregion', 'languages', 'currencies', 'maps', 'coatOfArms',
  'timezones', 'latlng', 'area', 'capitalInfo', 'independent', 'status'].join(',');

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
  withState(initialState),
  withMethods((store, http = inject(HttpClient)) => {
    /**
     * Loads detailed information for a specific country by its cca3 code.
     * Caches results to avoid redundant API calls.
     * @param cca3 - The country's unique cca3 identifier
     * @returns Observable emitting the detailed country or null if error occurs
     */
    const loadCountryDetails = (cca3: string) => {
      if (store.detailedCountries()[cca3]) {
        return scheduled([store.detailedCountries()[cca3]], asapScheduler);
      }

      return http.get<Country[]>(`https://restcountries.com/v3.1/alpha/${cca3}?fields=${DETAIL_FIELDS}`).pipe(
        map(response => response[0]),
        tap(detailedCountry => {
          patchState(store, state => ({
            detailedCountries: {
              ...state.detailedCountries,
              [cca3]: {
                ...state.countries.find(c => c.cca3 === cca3),
                ...detailedCountry
              }
            }
          }));
        }),
        catchError(() => scheduled([null], asapScheduler))
      );
    };

    return {
      /**
       * Fetches all countries from the API with basic fields
       * Handles loading state and errors automatically
       * @remarks Uses retry(2) and delay(500) for better UX
       */
      loadCountries: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(() => http.get<Country[]>(`https://restcountries.com/v3.1/all?fields=${BASIC_FIELDS}`).pipe(
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
            catchError(() => scheduled([[]], asapScheduler))
          ))
        )
      ),
      /**
       * Updates the selected regions filter
       * @param regions - Array of region names to filter by
       * @remarks Automatically handles empty array as "All Regions"
       */
      setRegions: (regions: string[]) => {
        patchState(store, {
          selectedRegions: regions.includes('') ? [] : regions
        });
      },
      /**
       * Updates the search query for country filtering
       * @param query - Search string (case-insensitive)
       */
      setSearchQuery: (query: string) => {
        patchState(store, { searchQuery: query.toLowerCase() });
      },
      /**
       * Selects a country and loads its detailed information
       * @param country - The country object or null to clear selection
       */
      selectCountry: rxMethod<Country | null>(
        pipe(
          tap(country => patchState(store, { selectedCountry: country })),
          switchMap(country => {
            if (!country?.cca3) return scheduled([null], asapScheduler);
            return loadCountryDetails(country.cca3);
          })
        )
      ),
      /**
       * Sorts countries alphabetically by common name
       * @param countries - Array of countries to sort
       * @returns New sorted array (immutable)
       */
      sortCountriesAlphabetically: (countries: Country[]) => {
        return [...countries].sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
      },
      /**
       * Sorts countries by region, then by name within each region
       * @param countries - Array of countries to sort
       * @returns New sorted array (immutable)
       */
      sortCountriesByRegion: (countries: Country[]) => {
        return [...countries].sort((a, b) =>
          a.region.localeCompare(b.region) ||
          a.name.common.localeCompare(b.name.common)
        );
      }
    };
  }),
  withComputed((store) => {

    /**
     * Unique list of all available regions, sorted alphabetically
     * @computed
     * @returns {string[]} Sorted array of unique regions
     */
    const regions = computed(() => {
      const regions = new Set(store.countries().map(c => c.region));
      return Array.from(regions).sort();
    });

    // Then return all computed properties
    return {
      regions,

      /**
       * Regions list formatted for select dropdowns
       * @computed
       * @returns {string[]} Includes 'All Regions' option when no filters are active
       */
      regionsForSelect: computed(() => store.selectedRegions().length === 0 ? ['All Regions', ...regions()] : regions()),

      /**
       * Countries filtered by current region and search selections
       * @computed
       * @returns {Country[]} Filtered array of countries
       */
      filteredCountries: computed(() => {
        let countries = store.countries();
        if (store.selectedRegions().length > 0) countries = countries.filter(c => store.selectedRegions().includes(c.region));
        if (store.searchQuery()) {
          const query = store.searchQuery().toLowerCase();
          countries = countries.filter(c => c.name.common.toLowerCase().includes(query) || c.capital?.[0]?.toLowerCase()?.includes(query));
        }
        return countries;
      }),

      /**
       * Detailed information for the currently selected country
       * @computed
       * @returns {Country | null} Full country details or null if none selected
       */
      selectedCountryDetails: computed(() => store.detailedCountries()[store.selectedCountry()?.cca3 ?? ''] ?? null),
    };
  }),
  withComputed((store) => ({
    /**
     * Countries sorted alphabetically by common name
     * @computed
     * @returns {Country[]} Sorted array of countries
     */
    sortedCountries: computed(() => {
      return store.filteredCountries().sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
    }),

  })),

withHooks({
    /**
     * Initialization hook - loads countries when store is created
     */
    onInit(store) {
      store.loadCountries();
    },
    
    /**
     * Cleanup hook - can be used for teardown logic
     */
    onDestroy() {
      console.log('CountriesStore destroyed');
    }
  })
);