import { computed, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { inject } from "@angular/core";
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: "root",
})
export class SidenavService {
  // inject
  private breakpointObserver = inject(BreakpointObserver);

  private breakpoints: Signal<BreakpointState> = toSignal(
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]),
    { initialValue: { matches: false, breakpoints: {} } }
  );

  // signals
  // These signals are used to manage the state of the sidenav
  private opened: WritableSignal<boolean> = signal(true);
  private mode: WritableSignal<"over" | "push" | "side"> = signal("side");
  private position: WritableSignal<"start" | "end"> = signal("start");
  private hasBackdrop: WritableSignal<boolean> = signal(false);
  private disableClose: WritableSignal<boolean> = signal(false);
  private isCollapsed: WritableSignal<boolean> = signal(true);
  private mobileWidth: WritableSignal<string> = signal("100dvw");
  private desktopWidth: WritableSignal<string> = signal("16rem");
  private collapsedWidth: WritableSignal<string> = signal("4.5rem");

  // computed properties
  // This computed property determines the width of the sidenav based on the current breakpoint
  private width = computed(() => {
    const isMobile = !!this.breakpoints().breakpoints[Breakpoints.XSmall];
    return this.isCollapsed() ?
      this.collapsedWidth() : isMobile ?
        this.mobileWidth() : this.desktopWidth();
  });

  private contentMargin = computed(() => {
    const isMobile = !!this.breakpoints().breakpoints[Breakpoints.XSmall];
    return !this.opened ? '0': this.isCollapsed() ?
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

  getIsCollapsed(): WritableSignal<boolean> {
    return this.isCollapsed;
  }

  getCollapsedWidth(): WritableSignal<string> {
    return this.collapsedWidth;
  }

  getWidth(): Signal<string> {
    return this.width;
  }

  getMobileWidth(): WritableSignal<string> {
    return this.mobileWidth;
  }

  getDesktopWidth(): WritableSignal<string> {
    return this.desktopWidth;
  }

  getHasBackdrop(): WritableSignal<boolean> {
    return this.hasBackdrop;
  }

  getDisableClose(): WritableSignal<boolean> {
    return this.disableClose;
  }

  getOpened(): WritableSignal<boolean> {
    return this.opened;
  }

  getMode(): WritableSignal<"over" | "push" | "side"> {
    return this.mode;
  }

  getPosition(): WritableSignal<"start" | "end"> {
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

  setMode(mode: "over" | "push" | "side"): void {
    this.mode.set(mode);
  }
  setPosition(position: "start" | "end"): void {
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
