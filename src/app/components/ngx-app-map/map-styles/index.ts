export * from './alidade-smooth-map-style';
export * from './dark-matter-map-style';
export * from './maplibrel-map-style';
export * from './outdoors-map-style';
export * from './positron-light-map-style';


export type MapStyleType = 'MapLibre' | 'darkMatter' |
    'positron' | 'AlidadeSmooth' | 'Outdoors';


export interface MapStyleValue {
    name: string;
    style: any;
    thumbnail: string;
}