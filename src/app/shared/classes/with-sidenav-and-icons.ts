import { SidenavService } from "../../shared/services/sidenav/sidenav.service";
import { matIconRecord } from '../../shared/constants/mat-icon-record.constant';
import { MatIconType } from '../../shared/types/mat-icon.type';
import { inject, signal, WritableSignal } from "@angular/core";
import { ContentListItem } from "../interfaces/content-list-item.interface";
import { Router } from "@angular/router";
import { routePaths } from "../../app.routes";

export abstract class WithSidenavAndIcons {

    // constants
    public icon: Record<MatIconType, MatIconType> = matIconRecord;

    // injctions
    protected sidenavService: SidenavService = inject(SidenavService);
    private router: Router = inject(Router);

    // Using signals to manage the state of the sidenav
    protected opened = this.sidenavService.getOpened();
    protected mode = this.sidenavService.getMode();
    protected position = this.sidenavService.getPosition();
    protected hasBackdrop = this.sidenavService.getHasBackdrop();
    protected disableClose = this.sidenavService.getDisableClose();
    protected width = this.sidenavService.getWidth();
    protected contentMargin = this.sidenavService.getContentMargin();
    protected isCollapsed = this.sidenavService.getIsCollapsed();


    // content list
    contentList: WritableSignal<ContentListItem[]> = signal([
        {
            title: 'Home',
            route: routePaths.home,
            icon: this.icon.home,
        },
        {
            title: 'About Us',
            route: routePaths.aboutUs,
            icon: this.icon.info,
        },
        {
            title: 'Posts',
            route: routePaths.posts,
            icon: this.icon.message
        },
        {
            title: 'Countries',
            route: routePaths.countries,
            icon: this.icon.flag
        }
    ]);



    // route active check
    public isRouteActive(route: string | undefined): boolean {
        return route ? this.router.isActive(route, {
            paths: 'subset',
            queryParams: 'subset',
            fragment: 'ignored',
            matrixParams: 'ignored'
        }) : false;
    }
}