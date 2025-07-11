import { Component, input, InputSignal } from '@angular/core';
import { ContentListItem } from '../../shared/interfaces/content-list-item.interface';
import { WithSidenavAndIcons } from '../../shared/classes/with-sidenav-and-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-content-list-item',
  standalone: true,
  imports: [MatButtonModule, MatIcon,RouterLink],
  templateUrl: './content-list-item.component.html',
  styleUrl: './content-list-item.component.scss'
})
export class ContentListItemComponent extends WithSidenavAndIcons {

  item: InputSignal<ContentListItem | undefined> = input<ContentListItem>();

}
