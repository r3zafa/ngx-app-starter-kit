import {computed, inject, signal, WritableSignal} from "@angular/core";
import {Router} from "@angular/router";
import {ContentListItem, LayoutService, matIconRecord, MatIconType, SidenavService} from "../index";
import {routePaths} from "../../routes/_routes.constants";


export abstract class WithSidenavAndIcons {

    // constants
    public icon: Record<MatIconType, MatIconType> = matIconRecord;

    // injections
    protected sidenavService: SidenavService = inject(SidenavService);
    protected layoutService = inject(LayoutService);
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

    // Mobile detection - using the layout service
    protected readonly isMobile = computed(() => this.layoutService.isHandsetPortrait());

}