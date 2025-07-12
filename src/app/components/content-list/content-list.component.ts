import { Component, input, InputSignal, ViewEncapsulation } from '@angular/core';
import { ContentListItem } from '../../shared/interfaces/content-list-item.interface';
import { WithSidenavAndIcons } from '../../shared/classes/with-sidenav-and-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { MatMenuItem } from '@angular/material/menu';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [
    MatNavList,
    MatMenuItem,
    MatIcon,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-content-list'
  }
})
export class ContentListComponent extends WithSidenavAndIcons {
  itemList: InputSignal<ContentListItem[]> = input<ContentListItem[]>([]);


}
