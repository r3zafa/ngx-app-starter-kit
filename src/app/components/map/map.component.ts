import { Component, inject, input, InputSignal } from '@angular/core';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {

  map = inject(Map)


  latitude: InputSignal<number> = input(0);
  longitude : InputSignal<number> = input(0);
}
