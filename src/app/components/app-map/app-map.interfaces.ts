import {Base64} from "../../shared/types/base64.type";

export type MapStyleType = 'MapLibre' | 'darkMatter' | 'positron' | 'AlidadeSmooth' | 'Outdoors';

export interface MapStyleValue {
    name: 'MapLibre' | 'Dark matter' | 'Alidade Smooth' | 'Outdoors' | 'Positron';
    style: any;
    thumbnail: Base64;
}