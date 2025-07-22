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

/**
 * Creates a Country object with all optional fields initialized as undefined
 * @param base - The base country data with required fields
 * @returns A complete Country object with all optional fields explicitly set to undefined
 * 
 * @description
 * This function ensures we have a properly typed Country object where all optional fields
 * are explicitly initialized as undefined. This is useful for:
 * - Initializing country objects before loading detailed data
 * - Ensuring consistent object structure
 * - Making missing fields explicit rather than implicit
 */
export function createEmptyCountry(base: CountryBase): Country {
  return {
    // Required base fields (from CountryBase)
    ...base,

    // Optional fields (from CountryDetails)
    // Note: We don't override any base fields that are already defined

    // Identification codes
    cca2: undefined,
    ccn3: undefined,
    cioc: undefined,

    // Political status
    independent: undefined,
    status: undefined,
    unMember: undefined,

    // Geographic information
    latlng: undefined,
    landlocked: undefined,
    borders: undefined,

    // Economic information
    currencies: undefined,
    gini: undefined,

    // Communication
    tld: undefined,
    idd: undefined,
    postalCode: undefined,

    // Cultural information
    languages: undefined,
    demonyms: undefined,
    translations: undefined,
    altSpellings: undefined,

    // Sports/Organizations
    fifa: undefined,

    // Transportation
    car: undefined,

    // Visual representations
    flag: undefined,
    startOfWeek: undefined,
    coatOfArms: undefined,

    // Mapping services
    maps: undefined,

    // Capital information
    capitalInfo: undefined
  };
}


// methods
export function getCurrencies(currencies: any): string {
  if (!currencies) return 'N/A';
  return Object.entries(currencies)
    .map(([code, currency]: [string, any]) => `${currency.name} (${currency.symbol || 'No symbol'})`)
    .join(', ');
}

export function getInternationalDialing(idd: any): string {
  if (!idd) return 'N/A';
  return `${idd.root || ''} ${idd.suffixes?.join(', ') || ''}`.trim();
}

export function mapValues(obj: any): string {
  if (!obj) return 'N/A';
  return Object.values(obj).join(', ');
}

export function createLink(url: string, text: string): string {
  return `<a href="${url}" target="_blank">${text}</a>`;
}

export function getGiniCoefficient(gini: any): string {
  if (!gini) return '';
  return Object.entries(gini)
    .map(([year, value]) => `${year}: ${value}`)
    .join(', ');
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats nested object values into a readable string
 * @param obj - The object to format
 * @param valueKey - Optional specific key to extract from nested objects
 * @param maxDepth - Maximum nesting level to format (default: 3)
 * @returns Formatted string representation
 */
export const formatObjectValues = (
  obj: Record<string, any> | undefined,
  valueKey?: string,
  maxDepth: number = 3
): string => {
  if (!obj) return 'N/A';
  
  const formatValue = (value: any, currentDepth: number): string => {
    if (currentDepth > maxDepth) return '...';
    
    if (valueKey && value && typeof value === 'object' && valueKey in value) {
      return formatValue(value[valueKey], currentDepth + 1);
    }
    
    if (Array.isArray(value)) {
      return value.map(v => formatValue(v, currentDepth + 1)).join(', ');
    }
    
    if (value && typeof value === 'object') {
      const entries = Object.entries(value).map(
        ([k, v]) => `${k}: ${formatValue(v, currentDepth + 1)}`
      );
      return `{ ${entries.join(', ')} }`;
    }
    
    return String(value);
  };

  return Object.entries(obj)
    .map(([key, value]) => {
      return `${key.toUpperCase()}: ${formatValue(value, 1)}`;
    })
    .join(', ');
};