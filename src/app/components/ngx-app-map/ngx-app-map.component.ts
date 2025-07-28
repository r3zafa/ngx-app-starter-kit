import { Component, input, InputSignal, ViewEncapsulation } from '@angular/core';
import { ControlComponent, FullscreenControlDirective, MapComponent, NavigationControlDirective } from '@maplibre/ngx-maplibre-gl';
import { StyleSpecification } from 'maplibre-gl';

@Component({
  selector: 'ngx-app-map',
  standalone: true,
  imports: [
    MapComponent,
    ControlComponent,
    NavigationControlDirective,
    FullscreenControlDirective,
  ],
  templateUrl: './ngx-app-map.component.html',
  styleUrl: './ngx-app-map.component.scss',
  encapsulation:ViewEncapsulation.None,
})
export class NgxAppMapComponent {

  style: StyleSpecification;

  latlng: InputSignal<[number, number] | undefined> = input();
  latlngCapital: InputSignal<[number, number] | undefined> = input();

}
