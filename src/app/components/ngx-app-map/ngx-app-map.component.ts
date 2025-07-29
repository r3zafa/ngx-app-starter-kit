import {Component, computed, inject, input, InputSignal} from '@angular/core';
import {
  ControlComponent,
  FullscreenControlDirective,
  MapComponent,
  MarkerComponent,
  NavigationControlDirective
} from '@maplibre/ngx-maplibre-gl';
import {MatIcon} from "@angular/material/icon";
import {MapZoomService, matIconRecord} from "../../shared";

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

  readonly icon = matIconRecord;
  readonly latLongReverse = computed(() => this.reverseLatLong(this.latlng()));
  readonly latLongCapitalReverse = computed(() => this.reverseLatLong(this.latlngCapital()));

  readonly calculatedZoom = computed(() => this.mapZoomService.getZoomForCountry(this.area()));

  /**
   * Reverses a [latitude, longitude] pair to [longitude, latitude]
   * @param latlong - Coordinate pair as [latitude, longitude]
   * @returns Coordinate pair as [longitude, latitude] or undefined if input is undefined
   */
  reverseLatLong(latlong: [number, number]): [number, number] | undefined {
    if (!latlong.length) return undefined;
    return [latlong[1], latlong[0]];
  }



}
