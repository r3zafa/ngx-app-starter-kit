import {alidadeSmoothBase64, darkMatterBase64, maplibreBase64, outdoorsBase64, positronBase64} from "./assets/";
import {MapStyleType, MapStyleValue} from "./app-map.interfaces";
import {
    alidadeSmoothMapStyle,
    darkMatterMapStyle,
    mapLibreMapStyle,
    outdoorsMapStyle,
    positronLightMapStyle
} from "./map-styles";

export const mapStylesRecord: Record<MapStyleType, MapStyleValue> = {
    MapLibre: {
        name: 'MapLibre',
        style: mapLibreMapStyle,
        thumbnail: maplibreBase64
    },
    darkMatter: {
        name: 'Dark matter',
        style: darkMatterMapStyle,
        thumbnail: darkMatterBase64
    },
    AlidadeSmooth: {
        name: 'Alidade Smooth',
        style: alidadeSmoothMapStyle,
        thumbnail: alidadeSmoothBase64
    },
    Outdoors: {
        name: 'Outdoors',
        style: outdoorsMapStyle,
        thumbnail: outdoorsBase64
    },
    positron: {
        name: 'Positron',
        style: positronLightMapStyle,
        thumbnail: positronBase64
    },
} as const;
