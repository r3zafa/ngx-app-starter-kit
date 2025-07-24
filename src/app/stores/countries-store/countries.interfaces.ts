/**
 * Sorting options for country lists
 */
export type CountrySortOptionType = 'alphabetical' | 'reverse-alphabetical' | 'region';

/**
 * Country top-level domain(s)
 */
type CountryTopLevelDomainType = string[];

/**
 * Capital city/cities of the country
 */
type CountryCapitalType = string[];

/**
 * Alternative spellings for the country name
 */
type CountryAltSpellingsType = string[];

/**
 * Geographic coordinates (latitude, longitude)
 */
type CountryLatLngType = [number, number];  // Tuple: [latitude, longitude]

/**
 * Country flag emoji
 */
type CountryFlagEmojiType = string;

/**
 * Time zones in the country
 */
type CountryTimeZonesType = string[];

/**
 * Continents the country belongs to
 */
type CountryContinentsType = string[];

/**
 * Bordering country codes
 */
type CountryBordersType = string[];

/**
 * Native name information for a country
 * @property official - Official native name
 * @property common - Common native name
 */
interface CountryNativeNameEntry {
  official: string;
  common: string;
}

/**
 * Native names in different languages
 */
interface CountryNativeNameInterface {
  [languageCode: string]: CountryNativeNameEntry;
}

/**
 * Country name information
 * @property common - Common name used in everyday language
 * @property official - Official name used in formal contexts
 * @property nativeName - Native names in different languages
 */
interface CountryNameInterface {
  common: string;
  official: string;
  nativeName: CountryNativeNameInterface;
}

/**
 * Currency information
 * @property name - Full currency name
 * @property symbol - Currency symbol (optional)
 */
interface CountryCurrencyInterface {
  name: string;
  symbol?: string;
}

/**
 * Currencies used in the country
 */
interface CountryCurrencies {
  [currencyCode: string]: CountryCurrencyInterface;
}

/**
 * International dialing information
 * @property root - The root calling code (e.g., "+6")
 * @property suffixes - Array of suffixes for different regions/areas
 */
interface CountryInternationalDialingCodesInterface {
  root: string;
  suffixes: string[];
}

/**
 * Languages spoken in the country
 */
interface CountryLanguagesInterface {
  [languageCode: string]: string;
}

/**
 * Demonym forms by gender
 * @property f - Feminine form
 * @property m - Masculine form
 */
interface CountryDemonymGenderInterface {
  f: string;
  m: string;
}

/**
 * Demonyms in different languages
 */
interface CountryDemonymsInterface {
  [languageCode: string]: CountryDemonymGenderInterface;
}

/**
 * Country name translation
 * @property official - Official name translation
 * @property common - Common name translation
 */
interface CountryNameTranslationInterface {
  official: string;
  common: string;
}

/**
 * Country name translations in different languages
 */
interface CountryNameTranslationsInterface {
  [languageCode: string]: CountryNameTranslationInterface;
}

/**
 * Map service links
 * @property googleMaps - Google Maps URL
 * @property openStreetMaps - OpenStreetMap URL
 */
interface CountryMapsInterface {
  googleMaps: string;
  openStreetMaps: string;
}

/**
 * Vehicle information
 * @property signs - License plate country codes (e.g., ["NZ"])
 * @property side - Driving side ("left" or "right")
 */
interface CountryCarInfoInterface {
  signs: string[];
  side: "left" | "right";
}

/**
 * National flag images
 * @property png - PNG format flag image URL
 * @property svg - SVG format flag image URL
 * @property alt - Alternative text description of the flag
 */
interface CountryFlagImageUrlsInterface {
  png: string;
  svg: string;
  alt?: string;
}

/**
 * National coat of arms images
 * @property png - PNG format coat of arms image URL
 * @property svg - SVG format coat of arms image URL
 */
interface CountryCoatOfArmsInterface {
  png: string;
  svg: string;
}

/**
 * Capital city coordinates
 * @property latlng - Latitude and longitude of the capital
 */
interface CountryCapitalInfoInterface {
  latlng: CountryLatLngType;
}

/**
 * Postal code information
 * @property format - Format pattern (e.g., "#####", "A#A #A#")
 * @property regex - Validation regex pattern
 */
interface CountryPostalCodeInterface {
  format: string | null;
  regex: string | null;
}

/**
 * Gini coefficient by year
 */
interface CountryGiniInterface {
  [year: string]: number;
}

/**
 * Core country information (always available)
 * @property name - Country name information
 * @property capital - Array of capital cities
 * @property region - Geographic region
 * @property subregion - Geographic subregion
 * @property area - Total area in square kilometers
 * @property cca3 - 3-letter country code (ISO 3166-1 alpha-3)
 * @property population - Total population count
 * @property timezones - Time zones in the country
 * @property continents - Continents the country belongs to
 * @property flags - National flag images
 */
export interface CountryBase {
  name: CountryNameInterface;
  capital: CountryCapitalType;
  region: string;
  subregion: string;
  area: number;
  cca3: string;
  population: number;
  timezones: CountryTimeZonesType;
  continents: CountryContinentsType;
  flags: CountryFlagImageUrlsInterface;
}

/**
 * Extended country details (optional properties)
 * @property tld - Top-level domain(s)
 * @property cca2 - 2-letter country code (ISO 3166-1 alpha-2)
 * @property ccn3 - 3-digit country code (ISO 3166-1 numeric)
 * @property cioc - International Olympic Committee code
 * @property independent - Independence status
 * @property status - Country status
 * @property unMember - Whether country is a UN member
 * @property currencies - Currencies used in the country
 * @property idd - International direct dialing information
 * @property altSpellings - Alternative spellings for the country name
 * @property languages - Languages spoken in the country
 * @property latlng - Latitude/longitude coordinates
 * @property landlocked - Whether the country is landlocked
 * @property borders - Bordering country codes
 * @property demonyms - Demonyms for the country
 * @property translations - Country name translations
 * @property flag - Flag emoji
 * @property maps - Map service links
 * @property gini - Gini coefficient by year
 * @property fifa - FIFA code
 * @property car - Car information
 * @property coatOfArms - National coat of arms images
 * @property postalCode - Postal code format information
 * @property capitalInfo - Capital city coordinates
 * @property startOfWeek - First day of the week ("monday", "sunday", etc.)
 */
export interface CountryDetails {
  tld?: CountryTopLevelDomainType;
  cca2?: string;
  ccn3?: string;
  cioc?: string;
  independent?: boolean;
  status?: string;
  unMember?: boolean;
  currencies?: CountryCurrencies;
  idd?: CountryInternationalDialingCodesInterface;
  altSpellings?: CountryAltSpellingsType;
  languages?: CountryLanguagesInterface;
  latlng?: CountryLatLngType;
  landlocked?: boolean;
  borders?: CountryBordersType;
  demonyms?: CountryDemonymsInterface;
  translations?: CountryNameTranslationsInterface;
  flag?: CountryFlagEmojiType;
  maps?: CountryMapsInterface;
  gini?: CountryGiniInterface;
  fifa?: string;
  car?: CountryCarInfoInterface;
  coatOfArms?: CountryCoatOfArmsInterface;
  postalCode?: CountryPostalCodeInterface;
  capitalInfo?: CountryCapitalInfoInterface;
  startOfWeek?: string;
}

export interface Country extends CountryBase, CountryDetails { }

/**
 * @interface CountriesState
 * Represents the state structure of the countries store:
 * @property countries - Array of all loaded countries
 * @property loading - Loading status indicator
 * @property loadingDetails - Loading status indicator
 * @property error - Error message if API requests fail
 * @property selectedRegions - Currently selected regions for filtering
 * @property searchQuery - Current search query for filtering
 * @property selectedCountry - Currently selected country details
 * @property detailedCountries - Cache of countries with detailed information
 */
export interface CountriesState {
  countries: Country[];
  loading: boolean;
  loadingDetails: boolean;
  error: string | null;
  errorDetails: string | null;
  selectedRegions: string[];
  searchQuery: string;
  selectedCountry: Country | null;
  sortOption: CountrySortOptionType;
}

