import {Injectable} from '@angular/core';

type CountrySizeCategory =
    | 'CONTINENTAL'
    | 'SUPER_LARGE'
    | 'EXTRA_LARGE'
    | 'VERY_LARGE'
    | 'LARGE'
    | 'MEDIUM_XL'      // New category
    | 'MEDIUM_LARGE'
    | 'MEDIUM'         // New category
    | 'MEDIUM_SMALL'
    | 'SMALL'
    | 'VERY_SMALL'
    | 'TINY'
    | 'MICRO'
    | 'CITY_STATE'
    | 'MINIATURE'
    | 'POINT';

@Injectable({ providedIn: 'root' })
export class MapZoomService {

    private readonly SIZE_CATEGORIES: Record<CountrySizeCategory, number> = {
        CONTINENTAL: 15000000,  // Russia
        SUPER_LARGE: 8000000,   // Future very large countries
        EXTRA_LARGE: 5000000,   // Canada, China, USA
        VERY_LARGE: 4000000,    // New category (e.g., India)
        LARGE: 3000000,         // Argentina, Kazakhstan
        MEDIUM_XL: 2000000,     // New category (e.g., Mexico, Saudi Arabia)
        MEDIUM_LARGE: 1000000,  // France, Egypt
        MEDIUM: 750000,         // New category (e.g., Turkey, Chile)
        MEDIUM_SMALL: 500000,   // Spain, Thailand
        SMALL: 250000,         // UK, Ghana
        VERY_SMALL: 100000,     // Portugal, South Korea
        TINY: 50000,           // Slovakia, Estonia
        MICRO: 10000,          // Lebanon, Jamaica
        CITY_STATE: 1000,      // Singapore, Luxembourg
        MINIATURE: 100,        // Monaco, San Marino
        POINT: 0.44            // Vatican City
    };

    private readonly CATEGORY_ZOOMS: Record<CountrySizeCategory, number> = {
        CONTINENTAL: 1.5,
        SUPER_LARGE: 1.8,
        EXTRA_LARGE: 1.6,
        VERY_LARGE: 2.0,
        LARGE: 2.2,
        MEDIUM_XL: 2.4,
        MEDIUM_LARGE: 2.8,
        MEDIUM: 3.0,
        MEDIUM_SMALL: 4.2,
        SMALL: 4.8,
        VERY_SMALL: 4.2,
        TINY: 5.5,
        MICRO: 6.2,
        CITY_STATE: 7.8,
        MINIATURE: 8.0,
        POINT: 8
    };

    private readonly CATEGORY_ORDER: CountrySizeCategory[] = [
        'CONTINENTAL',
        'SUPER_LARGE',
        'EXTRA_LARGE',
        'VERY_LARGE',
        'LARGE',
        'MEDIUM_XL',
        'MEDIUM_LARGE',
        'MEDIUM',
        'MEDIUM_SMALL',
        'SMALL',
        'VERY_SMALL',
        'TINY',
        'MICRO',
        'CITY_STATE',
        'MINIATURE',
        'POINT'
    ];

    getZoomForCountry(areaKm2: number): number {
        const clampedArea = Math.max(areaKm2, this.SIZE_CATEGORIES.POINT);
        const category = this.CATEGORY_ORDER.find(
            cat => clampedArea >= this.SIZE_CATEGORIES[cat]
        ) ?? 'POINT';

        //window.alert(category)

        let zoom = this.CATEGORY_ZOOMS[category];
        const categoryMin = this.SIZE_CATEGORIES[category];
        const nextCategory = this.CATEGORY_ORDER[this.CATEGORY_ORDER.indexOf(category) + 1];
        const categoryMax = nextCategory ? this.SIZE_CATEGORIES[nextCategory] : Infinity;

        const normalizedSize = (Math.log(clampedArea) - Math.log(categoryMin)) /
            (Math.log(categoryMax) - Math.log(categoryMin));

        const zoomRange = 0.5 * (1 + (category === 'POINT' ? 2 : 1));
        zoom -= normalizedSize * zoomRange;

        return Math.min(10, Math.max(1, Math.round(zoom * 10) / 10));
    }
}