export type SortOption = 'alphabetical' | 'reverse-alphabetical' | 'region';

/**
 * Country name information
 * @property common - Common name used in everyday language
 * @property official - Official name used in formal contexts
 */
export interface CountryName {
  common: string;
  official: string;
}

/**
 * National flag images
 * @property png - PNG format flag image URL
 * @property svg - SVG format flag image URL
 */
export interface CountryFlag {
  png: string;
  svg: string;
}

/**
 * National coat of arms images
 * @property png - PNG format coat of arms image URL
 * @property svg - SVG format coat of arms image URL
 */
export interface CoatOfArms {
  png: string;
  svg: string;
}

/**
 * Map service links
 * @property googleMaps - Google Maps URL
 * @property openStreetMaps - OpenStreetMap URL
 */
export interface CountryMaps {
  googleMaps: string;
  openStreetMaps: string;
}

/**
 * Currency information
 * @property name - Full currency name
 * @property [symbol] - Optional currency symbol
 */
export interface Currency {
  name: string;
  symbol?: string;
}

/**
 * Capital city coordinates
 * @property [latlng] - Latitude and longitude of the capital
 */
export interface CapitalInfo {
  latlng?: [number, number];
}

/**
 * Core country information (always available)
 * @property name - Country name information
 * @property capital - Array of capital cities
 * @property region - Geographic region
 * @property population - Total population count
 * @property flags - National flag images
 * @property cca3 - 3-letter country code (ISO 3166-1 alpha-3)
 */
export interface CountryBase {
  name: CountryName;
  capital: string[];
  region: string;
  population: number;
  flags: CountryFlag;
  cca3: string;
}

/**
 * Extended country details (optional properties)
 * @property [subregion] - More specific geographic classification
 * @property [languages] - Languages spoken in the country
 * @property [currencies] - Currencies used in the country
 * @property [maps] - Map service links
 * @property [coatOfArms] - National coat of arms images
 * @property [timezones] - Time zones observed
 * @property [latlng] - Latitude/longitude coordinates
 * @property [area] - Total area in square kilometers
 * @property [capitalInfo] - Capital city coordinates
 * @property [independent] - Independence status
 * @property [status] - Country status
 * @property [unMember] - Whether country is a UN member
 * @property [idd] - International direct dialing information
 * @property [tld] - Top-level domain(s)
 * @property [borders] - Border country codes
 */
export interface CountryDetails {
  subregion?: string;
  languages?: Record<string, string>;
  currencies?: Record<string, Currency>;
  maps?: CountryMaps;
  coatOfArms?: CoatOfArms;
  timezones?: string[];
  latlng?: [number, number];
  area?: number;
  capitalInfo?: CapitalInfo;
  independent?: boolean;
  status?: string;
  unMember?: boolean;
  idd?: {
    root: string;
    suffixes: string[];
  };
  tld?: string[];
  borders?: string[];
}

/**
 * Complete country information
 */
export interface Country extends CountryBase, CountryDetails { }

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
  sortOption: SortOption;
}

