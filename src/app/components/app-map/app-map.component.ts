import {Component, computed, inject, input, InputSignal, signal} from '@angular/core';
import {MatIconAnchor} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
// map library
import {LineLayerSpecification} from "maplibre-gl";
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
// internal imports
import {MapZoomService, matIconRecord, MatIconType, ThemeService} from "../../shared";
import {mapStylesRecord} from './app-map.constants';
import {MapStyleType} from "./app-map.interfaces";

@Component({
    selector: 'app-map',
  standalone: true,
    templateUrl: './app-map.component.html',
    styleUrls: ['./app-map.component.scss'],
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
export class AppMapComponent {
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
    readonly styles = mapStylesRecord;
    readonly styleKeys: MapStyleType[] = Object.keys(mapStylesRecord) as MapStyleType[];
    readonly isDarkMode = this.themeService.isDarkMode;
    // variables
    selectedStyle: MapStyleType = this.themeService.isDarkMode() ? "darkMatter" : 'Outdoors';
    currentStyle = this.themeService.isDarkMode() ? mapStylesRecord.darkMatter.style : mapStylesRecord.Outdoors.style;

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
        this.currentStyle = mapStylesRecord[styleKey].style;
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
