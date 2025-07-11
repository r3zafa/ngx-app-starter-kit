import { Component, input, InputSignal } from '@angular/core';
import { ContentListItem } from '../../shared/interfaces/content-list-item.interface';
import { ContentListItemComponent } from '../content-list-item/content-list-item.component';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [ContentListItemComponent],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss'
})
export class ContentListComponent {
  itemList: InputSignal<ContentListItem[]>  = input<ContentListItem[]>([]);
}
