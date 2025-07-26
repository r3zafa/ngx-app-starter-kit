import {Component, input, InputSignal, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ContentListItem, WithSidenavAndIcons} from "../../shared";

@Component({
    selector: 'app-content-list',
    standalone: true,
    imports: [
        MatNavList,
        MatListItem,
        MatIcon,
        RouterLink,
        RouterLinkActive,
        MatTooltipModule
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
