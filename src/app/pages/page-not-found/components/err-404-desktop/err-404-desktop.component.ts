import { Component, computed, input, InputSignal } from '@angular/core';
import { ThemeColorMode } from '../../../../shared/types';
import { Err404Svg } from '../../../../shared/classes';

@Component({
  selector: 'app-err-404-desktop',
  standalone: true,
  imports: [],
  templateUrl: './err-404-desktop.component.html',
  styleUrl: './err-404-desktop.component.scss'
})
export class Err404DesktopComponent extends Err404Svg {
  theme: InputSignal<ThemeColorMode> = input<ThemeColorMode>('dark');
}
