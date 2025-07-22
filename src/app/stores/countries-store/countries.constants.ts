import { CountriesState } from "./countries.interfaces";

export const BASIC_FIELDS = [
    'name',
    'capital',
    'region',
    'population',
    'flags',
    'cca3'
].join(',');

// Split DETAIL_FIELDS into two groups since we can't request all at once
export const DETAIL_FIELDS_GROUP1 = [
  'subregion', 'languages', 'currencies', 'maps', 'coatOfArms',
  'timezones', 'latlng', 'area', 'capitalInfo', 'independent'
].join(',');

export const DETAIL_FIELDS_GROUP2 = [
  'status', 'unMember', 'idd', 'tld', 'borders'
].join(',');

export const initialState: CountriesState = {
    countries: [],
    loading: false,
    error: null,
    selectedRegions: [],
    searchQuery: '',
    selectedCountry: null,
    sortOption: 'alphabetical'
};
