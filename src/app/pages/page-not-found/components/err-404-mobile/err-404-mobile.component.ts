import { Component, input, InputSignal } from '@angular/core';
import { ThemeType } from '../../../../shared/types';
import { Err404Svg } from '../../../../shared/classes';


@Component({
  selector: 'app-err-404-mobile',
  standalone: true,
  imports: [],
  templateUrl: './err-404-mobile.component.html',
  styleUrl: './err-404-mobile.component.scss'
})
export class Err404MobileComponent extends Err404Svg {
  theme: InputSignal<ThemeType> = input<ThemeType>('dark');
}