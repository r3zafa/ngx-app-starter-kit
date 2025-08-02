import {Component, computed, inject, input, InputSignal, signal} from '@angular/core';
import {
    ControlComponent,
    FullscreenControlDirective,
    GeolocateControlDirective,
    GlobeControlDirective,
    LayerComponent,
    MapComponent,
    MarkerComponent,
    NavigationControlDirective,
    ScaleControlDirective,
    VectorSourceComponent
} from '@maplibre/ngx-maplibre-gl';
import {MatIcon} from "@angular/material/icon";
import {MapZoomService, matIconRecord, MatIconType} from "../../shared";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
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
import {
    MatAnchor,
    MatButton,
    MatIconAnchor,
    MatIconButton,
    MatMiniFabAnchor,
    MatMiniFabButton
} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatRipple} from "@angular/material/core";
import {NgClass} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

const stylesRecord: Record<MapStyleType, MapStyleValue> = {
    MapLibre: {name: 'MapLibre', style: mapLibreMapStyle},
    darkMatter: {name: 'Dark matter', style: darkMatterMapStyle},
    AlidadeSmooth: {name: 'Alidade Smooth', style: alidadeSmoothMapStyle},
    Outdoors: {name: 'Outdoors', style: outdoorsMapStyle},
    positron: {name: 'Positron', style: positronLightMapStyle},
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
        MatRadioGroup,
        FormsModule,
        MatRadioButton,
        ScaleControlDirective,
        GeolocateControlDirective,
        GlobeControlDirective,
        LayerComponent,
        VectorSourceComponent,
        MatIconButton,
        MatTooltip,
        MatMiniFabButton,
        MatRipple,
        MatButton,
        MatAnchor,
        MatMiniFabAnchor,
        NgClass,
        MatIconAnchor,
        MatMenuTrigger,
        MatMenu,
        MatMenuItem,
    ],
})
export class NgxAppMapComponent {
    // injects
    private mapZoomService: MapZoomService = inject(MapZoomService);

    // inputs
    latlng: InputSignal<[number, number] | undefined> = input();
    latlngCapital: InputSignal<[number, number] | undefined> = input();
    capital: InputSignal<string[] | undefined> = input();
    area: InputSignal<number | undefined> = input();

    // constants
    readonly icon: Record<MatIconType, MatIconType> = matIconRecord;
    readonly styles = stylesRecord;
    readonly styleKeys: MapStyleType[] = Object.keys(stylesRecord) as MapStyleType[];

    // variables
    selectedStyle: MapStyleType = 'MapLibre';
    currentStyle = stylesRecord.MapLibre.style;

    // signals
    readonly borderVisible = signal(false);


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
