import { Country, CountryBase } from "./countries.interfaces";

export function sortCountriesAlphabetically(countries: Country[]): Country[] {
  return [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));
}

export function sortCountriesByRegion(countries: Country[]): Country[] {
  return [...countries].sort((a, b) =>
    a.region.localeCompare(b.region) || a.name.common.localeCompare(b.name.common)
  );
}

export function sortCountriesReverseAlphabetically(countries: Country[]): Country[] {
  return [...countries].sort((a, b) => 
    b.name.common.localeCompare(a.name.common)
  );
}

export function createEmptyCountry(base: CountryBase): Country {
  return {
    ...base,
    subregion: undefined,
    languages: undefined,
    currencies: undefined,
    maps: undefined,
    coatOfArms: undefined,
    timezones: undefined,
    latlng: undefined,
    area: undefined,
    capitalInfo: undefined,
    independent: undefined,
    status: undefined,
    unMember: undefined,
    idd: undefined,
    tld: undefined,
    borders: undefined
  };
}