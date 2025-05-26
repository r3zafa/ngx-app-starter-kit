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
  private opened: WritableSignal<boolean> = signal(false);
  private mode: WritableSignal<"over" | "push" | "side"> = signal("over");
  private position: WritableSignal<"start" | "end"> = signal("start");
  private hasBackdrop: WritableSignal<boolean> = signal(true);
  private disableClose: WritableSignal<boolean> = signal(false);
  private mobileWidth: WritableSignal<string> = signal("100dvw");
  private tabletWidth: WritableSignal<string> = signal("50dvw");
  private desktopWidth: WritableSignal<string> = signal("16rem");
  private height: WritableSignal<string> = signal("100%");

  // computed properties
  // This computed property determines the width of the sidenav based on the current breakpoint
  private width = computed(() => {
    const bp = this.breakpoints().breakpoints;
    if (bp[Breakpoints.XSmall] || bp[Breakpoints.Small]) return this.mobileWidth();
    else if (bp[Breakpoints.Medium]) return this.tabletWidth();
    else return this.desktopWidth();
  });

  // methods

  toggle(): void {
    this.opened.set(!this.opened());
  }

  // getters

  getWidth(): Signal<string> {
    return this.width;
  }

  getHeight(): WritableSignal<string> {
    return this.height;
  }

  getMobileWidth(): WritableSignal<string> {
    return this.mobileWidth;
  }

  getTabletWidth(): WritableSignal<string> {
    return this.tabletWidth;
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

  setHeight(height: string): void {
    this.height.set(height);
  }

  setMobileWidth(width: string): void {
    this.mobileWidth.set(width);
  }

  setTabletWidth(width: string): void {
    this.tabletWidth.set(width);
  }

  setDesktopWidth(width: string): void {
    this.desktopWidth.set(width);
  }
}
