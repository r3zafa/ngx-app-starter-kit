import {computed, inject, Injectable, signal, Signal, WritableSignal} from "@angular/core";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {toSignal} from '@angular/core/rxjs-interop';

export type DrawerMode = "over" | "push" | "side";
export type DrawerPosition = "start" | "end";

@Injectable({
    providedIn: "root",
})
export class SidenavService {
    // inject
    private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

    private breakpoints: Signal<BreakpointState> = toSignal(
        this.breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large,
            Breakpoints.XLarge,
        ]),
        {initialValue: {matches: false, breakpoints: {}}}
    );

    // signals - These signals are used to manage the state of the sidenav
    private opened: WritableSignal<boolean> = signal(true);
    private mode: WritableSignal<DrawerMode> = signal("side");
    private position: WritableSignal<DrawerPosition> = signal("start");
    private hasBackdrop: WritableSignal<boolean> = signal(false);
    private disableClose: WritableSignal<boolean> = signal(false);
    private isCollapsed: WritableSignal<boolean> = signal(true);
    private mobileWidth: WritableSignal<string> = signal("100dvw");
    private desktopWidth: WritableSignal<string> = signal("16rem");
    private collapsedWidth: WritableSignal<string> = signal("5rem");

    // computed properties
    // This computed property determines the width of the sidenav based on the current breakpoint
    private width: Signal<string> = computed((): string => {
        const isMobile: boolean = !!this.breakpoints().breakpoints[Breakpoints.XSmall];
        return this.isCollapsed() ?
            this.collapsedWidth() : isMobile ?
                this.mobileWidth() : this.desktopWidth();
    });

    private contentMargin: Signal<string> = computed((): string => {
        return !this.opened ? '0' : this.isCollapsed() ?
            this.collapsedWidth() : this.desktopWidth();
    });


    getContentMargin(): Signal<string> {
        return this.contentMargin;
    }

    // methods

    toggle(): void {
        this.opened.set(!this.opened());
    }

    // getters

    getIsCollapsed(): Signal<boolean> {
        return this.isCollapsed;
    }

    getCollapsedWidth(): Signal<string> {
        return this.collapsedWidth;
    }

    getWidth(): Signal<string> {
        return this.width;
    }

    getMobileWidth(): Signal<string> {
        return this.mobileWidth;
    }

    getDesktopWidth(): Signal<string> {
        return this.desktopWidth;
    }

    getHasBackdrop(): Signal<boolean> {
        return this.hasBackdrop;
    }

    getDisableClose(): Signal<boolean> {
        return this.disableClose;
    }

    getOpened(): Signal<boolean> {
        return this.opened;
    }

    getMode(): Signal<DrawerMode> {
        return this.mode;
    }

    getPosition(): Signal<DrawerPosition> {
        return this.position;
    }

    // setters

    setHasBackdrop(hasBackdrop: boolean): void {
        this.hasBackdrop.set(hasBackdrop);
    }

    setDisableClose(disableClose: boolean): void {
        this.disableClose.set(disableClose);
    }

    setOpened(opened: boolean): void {
        this.opened.set(opened);
    }

    setMode(mode: DrawerMode): void {
        this.mode.set(mode);
    }

    setPosition(position: DrawerPosition): void {
        this.position.set(position);
    }

    setMobileWidth(width: string): void {
        this.mobileWidth.set(width);
    }

    setDesktopWidth(width: string): void {
        this.desktopWidth.set(width);
    }

    setCollapsedWidth(width: string): void {
        this.collapsedWidth.set(width);
    }

    setIsCollapsed(isCollapsed: boolean): void {
        this.isCollapsed.set(isCollapsed);
    }

}
