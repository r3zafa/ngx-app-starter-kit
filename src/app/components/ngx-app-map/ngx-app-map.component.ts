import {Component, computed, inject, input, InputSignal, signal} from '@angular/core';
import {
    ControlComponent,
    FullscreenControlDirective,
    GeolocateControlDirective,
    LayerComponent,
    MapComponent,
    MarkerComponent,
    NavigationControlDirective,
    ScaleControlDirective,
    VectorSourceComponent
} from '@maplibre/ngx-maplibre-gl';
import {MatIcon} from "@angular/material/icon";
import {MapZoomService, matIconRecord, MatIconType, ThemeService} from "../../shared";
import {FormsModule} from "@angular/forms";
import {
    alidadeSmoothMapStyle,
    darkMatterMapStyle,
    mapLibreMapStyle,
    MapStyleType,
    MapStyleValue,
    outdoorsMapStyle,
    positronLightMapStyle
} from "./map-styles";
import {LineLayerSpecification} from "maplibre-gl";
import {MatIconAnchor} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {maplibreBase64} from "./assets/maplibre.base64";
import {darkMatterBase64} from "./assets/dark-matter.base64";
import {alidadeSmoothBase64} from "./assets/alidade-smooth.base64";
import {outdoorsBase64} from "./assets/outdoors.base64";
import {positronBase64} from "./assets/positron.base64";
import {NgClass} from "@angular/common";

const stylesRecord: Record<MapStyleType, MapStyleValue> = {
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
};

@Component({
  selector: 'ngx-app-map',
  standalone: true,
  templateUrl: './ngx-app-map.component.html',
  styleUrls: ['./ngx-app-map.component.scss'],
    imports: [
        MapComponent,
        ControlComponent,
        NavigationControlDirective,
        FullscreenControlDirective,
        MarkerComponent,
        MatIcon,
        FormsModule,
        ScaleControlDirective,
        GeolocateControlDirective,
        LayerComponent,
        VectorSourceComponent,
        MatIconAnchor,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
        NgClass,
    ],
})
export class NgxAppMapComponent {
    // injects
    private mapZoomService: MapZoomService = inject(MapZoomService);
    private themeService: ThemeService = inject(ThemeService);

    // inputs
    latlng: InputSignal<[number, number] | undefined> = input();
    latlngCapital: InputSignal<[number, number] | undefined> = input();
    capital: InputSignal<string[] | undefined> = input();
    area: InputSignal<number | undefined> = input();

    // constants
    readonly icon: Record<MatIconType, MatIconType> = matIconRecord;
    readonly styles = stylesRecord;
    readonly styleKeys: MapStyleType[] = Object.keys(stylesRecord) as MapStyleType[];
    readonly isDarkMode = this.themeService.isDarkMode;
    // variables
    selectedStyle: MapStyleType = this.themeService.isDarkMode() ? "darkMatter" : 'Outdoors';
    currentStyle = this.themeService.isDarkMode() ? stylesRecord.darkMatter.style : stylesRecord.Outdoors.style;

    // signals
    borderVisible = signal(false);


    // computed values
    readonly latLongReverse = computed(() => this.reverseLatLong(this.latlng()));
    readonly latLongCapitalReverse = computed(() => this.reverseLatLong(this.latlngCapital()));
    readonly calculatedZoom = computed(() => this.mapZoomService.getZoomForCountry(this.area()));
    readonly layout = computed<LineLayerSpecification["layout"]>(() => ({
        visibility: this.borderVisible() ? 'visible' : 'none'
    }));


    // methods
    changeStyle(styleKey: MapStyleType): void {
        this.selectedStyle = styleKey;
        this.currentStyle = stylesRecord[styleKey].style;
    }

    /**
     * Reverses a [latitude, longitude] pair to [longitude, latitude]
     * @param latlong - Coordinate pair as [latitude, longitude]
     * @returns Coordinate pair as [longitude, latitude] or undefined if input is undefined
     */
    reverseLatLong(latlong: [number, number]): [number, number] | undefined {
        if (!latlong.length) return undefined;
        return [latlong[1], latlong[0]];
    }

    toggleBorder() {
        this.borderVisible.update(visible => !visible);
    }


}
