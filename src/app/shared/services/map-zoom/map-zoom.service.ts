import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MapZoomService {
    // Size categories with actual smallest country size (Vatican City)
    private readonly SIZE_CATEGORIES = {
        XXXL: 15000000,  // Russia
        XXL: 8000000,    // Future very large countries
        XL: 5000000,     // Canada, China, USA
        L: 1000000,      // India, Argentina
        M: 500000,       // France, Spain
        S: 100000,       // Portugal, South Korea
        XS: 15000,       // Lebanon, Jamaica
        XXS: 3000,       // Malta, Maldives
        XXXS: 100,       // Very small nations
        XXXXS: 0.44      // Vatican City (smallest country)
    };

    // Zoom levels for each category
    private readonly CATEGORY_ZOOMS = {
        XXXL: 1.2,
        XXL: 1.5,
        XL: 2,
        L: 2.5,
        M: 3,
        S: 4,
        XS: 5.5,
        XXS: 6.5,
        XXXS: 8,
        XXXXS: 9
    };

    getZoomForCountry(areaKm2: number): number {
        // Clamp area to minimum of 0.44 km² (Vatican City)
        const clampedArea = Math.max(areaKm2, this.SIZE_CATEGORIES.XXXXS);

        // Determine size category
        let category: keyof typeof this.SIZE_CATEGORIES;

        if (clampedArea >= this.SIZE_CATEGORIES.XXXL) {
            category = 'XXXL';
        } else if (clampedArea >= this.SIZE_CATEGORIES.XXL) {
            category = 'XXL';
        } else if (clampedArea >= this.SIZE_CATEGORIES.XL) {
            category = 'XL';
        } else if (clampedArea >= this.SIZE_CATEGORIES.L) {
            category = 'L';
        } else if (clampedArea >= this.SIZE_CATEGORIES.M) {
            category = 'M';
        } else if (clampedArea >= this.SIZE_CATEGORIES.S) {
            category = 'S';
        } else if (clampedArea >= this.SIZE_CATEGORIES.XS) {
            category = 'XS';
        } else if (clampedArea >= this.SIZE_CATEGORIES.XXS) {
            category = 'XXS';
        } else if (clampedArea >= this.SIZE_CATEGORIES.XXXS) {
            category = 'XXXS';
        } else {
            category = 'XXXXS';
        }

        // Get base zoom for category
        let zoom = this.CATEGORY_ZOOMS[category];

        // Apply logarithmic scaling within category
        const categoryMin = this.SIZE_CATEGORIES[category];
        const categoryMax = this.getNextCategoryThreshold(category);
        const normalizedSize = (Math.log(clampedArea) - Math.log(categoryMin)) /
            (Math.log(categoryMax) - Math.log(categoryMin));

        // Adjust zoom based on normalized size (more sensitive for small countries)
        const zoomRange = 0.5 * (1 + (category === 'XXXXS' ? 2 : 1));
        zoom -= normalizedSize * zoomRange;

        // Clamp zoom between 1 and 10
        return Math.min(10, Math.max(1, Math.round(zoom * 10) / 10));
    }

    private getNextCategoryThreshold(current: keyof typeof this.SIZE_CATEGORIES): number {
        const categories = Object.keys(this.SIZE_CATEGORIES) as Array<keyof typeof this.SIZE_CATEGORIES>;
        const currentIndex = categories.indexOf(current);
        return currentIndex < categories.length - 1
            ? this.SIZE_CATEGORIES[categories[currentIndex + 1]]
            : Infinity;
    }
}