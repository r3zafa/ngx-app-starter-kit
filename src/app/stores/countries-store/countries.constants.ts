import { CountriesState } from "./countries.interfaces";

/**
 * Basic country fields used for initial listing and cards
 * @constant
 * @type {string}
 * @description Contains minimal fields needed to display country cards:
 * - name: Country name
 * - capital: Capital city
 * - region: Geographic region
 * - population: Population count
 * - flags: Flag image URLs
 * - cca3: 3-letter country code
 */
export const BASIC_FIELDS = [
  'name',
  'capital',
  'region',
  'subregion',
  'area',
  'cca3',
  'population',
  'timezones',
  'continents',
  'flags',
].join(',');

/**
 * First group of detailed country fields (max 10 fields)
 * @constant
 * @type {string}
 * @description Contains geographic and administrative details:
 * - subregion: Geographic subregion
 * - languages: Official languages
 * - currencies: Currency information
 * - maps: Links to map services
 * - coatOfArms: National coat of arms images
 * - timezones: Time zones in the country
 * - latlng: Latitude/longitude coordinates
 * - area: Total area in square kilometers
 * - capitalInfo: Capital city coordinates
 * - independent: Independence status
 */
export const DETAIL_FIELDS_GROUP1 = [
  'tld',
  'cca2',
  'ccn3',
  'cioc',
  'independent',
  'status',
  'unMember',
  'currencies',
  'idd',
  'altSpellings'
].join(',');

/**
 * Second group of detailed country fields (max 10 fields)
 * @constant
 * @type {string}
 * @description Contains political and communication details:
 * - status: Country status (official/official)
 * - unMember: UN membership status
 * - idd: International dialing codes
 * - tld: Top-level domains
 * - borders: Bordering country codes
 * - demonyms: What citizens are called
 * - gini: Income inequality coefficient
 * - fifa: FIFA country code
 * - car: Driving side information
 * - postalCode: Postal code format
 */
export const DETAIL_FIELDS_GROUP2 = [
  'languages',
  'latlng',
  'landlocked',
  'borders',
  'demonyms',
  'translations',
  'flag',
  'maps',
  'gini',
  'fifa'
].join(',');

/**
 * Third group of detailed country fields (remaining fields)
 * @constant
 * @type {string}
 * @description Contains additional identifiers and metadata:
 * - translations: Name translations
 * - cioc: IOC country code
 * - cca2: 2-letter country code
 * - ccn3: 3-digit country code
 * - landlocked: Whether country is landlocked
 * - startOfWeek: First day of the week
 * - flag: Flag emoji
 * - altSpellings: Alternative name spellings
 * - continents: Continent information
 */
export const DETAIL_FIELDS_GROUP3 = [
  'car',
  'coatOfArms',
  'postalCode',
  'capitalInfo',
  'startOfWeek'
].join(',');

/**
 * Initial state for countries reducer
 * @constant
 * @type {CountriesState}
 * @property {Array} countries - Empty array for storing country data
 * @property {boolean} loading - Initial loading state (false)
 * @property {null} error - Initial error state (null)
 * @property {Array} selectedRegions - Empty array for region filters
 * @property {string} searchQuery - Empty string for search term
 * @property {null} selectedCountry - No country selected initially
 * @property {string} sortOption - Default sort option ('alphabetical')
 */
export const initialState: CountriesState = {
  countries: [],
  loading: false,
  error: null,
  selectedRegions: [],
  searchQuery: '',
  selectedCountry: null,
  sortOption: 'alphabetical'
};