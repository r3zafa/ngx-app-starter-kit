import { SidenavService } from "../../shared/services/sidenav/sidenav.service";
import { matIconRecord } from '../../shared/constants/mat-icon-record.constant';
import { MatIconType } from '../../shared/types/mat-icon.type';
import { inject, signal, WritableSignal } from "@angular/core";
import { ContentListItem } from "../interfaces/content-list-item.interface";

export abstract class WithSidenavAndIcons {
    public icon: Record<MatIconType, MatIconType> = matIconRecord;
    protected sidenavService: SidenavService = inject(SidenavService);

    // Using signals to manage the state of the sidenav
    protected opened = this.sidenavService.getOpened();
    protected mode = this.sidenavService.getMode();
    protected position = this.sidenavService.getPosition();
    protected hasBackdrop = this.sidenavService.getHasBackdrop();
    protected disableClose = this.sidenavService.getDisableClose();
    protected width = this.sidenavService.getWidth();
    protected contentMargin = this.sidenavService.getContentMargin();
    protected isColapsed = this.sidenavService.getIsColapsed();


    contentList: WritableSignal<ContentListItem[]> = signal([
        {
            title: 'Home',
            route: '/home',
            icon: this.icon.home,
        },
        {
            title: 'About Us',
            route: '/about-us',
            icon: this.icon.info,
        }
    ]);
}