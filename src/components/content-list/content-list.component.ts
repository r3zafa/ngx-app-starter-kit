import { Component } from '@angular/core';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss'
})
export class ContentListComponent {

  items: string[] = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4'
];

}
