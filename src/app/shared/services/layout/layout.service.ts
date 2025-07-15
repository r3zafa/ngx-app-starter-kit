import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

export type BreakpointType = 'Handset' | 'Tablet' | 'Web' |
  'HandsetPortrait' | 'TabletPortrait' | 'WebPortrait' |
  'HandsetLandscape' | 'TabletLandscape' | 'WebLandscape';

export const BREAK_POINTS: Record<BreakpointType, string> = {
  Handset: Breakpoints.Handset,
  Tablet: Breakpoints.Tablet,
  Web: Breakpoints.Web,
  HandsetPortrait: Breakpoints.HandsetPortrait,
  TabletPortrait: Breakpoints.TabletPortrait,
  WebPortrait: Breakpoints.WebPortrait,
  HandsetLandscape: Breakpoints.HandsetLandscape,
  TabletLandscape: Breakpoints.TabletLandscape,
  WebLandscape: Breakpoints.WebLandscape
};

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  // inject
  private bpObs = inject(BreakpointObserver);

  layoutLandscape = toSignal(this.bpObs.observe([
    BREAK_POINTS.HandsetLandscape,
    BREAK_POINTS.TabletLandscape,
    BREAK_POINTS.WebLandscape
  ]), { initialValue: { matches: false, breakpoints: {} } });

  layoutPortrait = toSignal(this.bpObs.observe([
    BREAK_POINTS.HandsetPortrait,
    BREAK_POINTS.TabletPortrait,
    BREAK_POINTS.WebPortrait,
  ]), { initialValue: { matches: false, breakpoints: {} } });

  layoutHandset = toSignal(this.bpObs.observe([
    BREAK_POINTS.Handset,
    BREAK_POINTS.HandsetPortrait,
    BREAK_POINTS.HandsetLandscape,
  ]), { initialValue: { matches: false, breakpoints: {} } });

  layoutTablet = toSignal(this.bpObs.observe([
    BREAK_POINTS.Tablet,
    BREAK_POINTS.TabletPortrait,
    BREAK_POINTS.TabletLandscape,
  ]), { initialValue: { matches: false, breakpoints: {} } });

  layoutPC = toSignal(this.bpObs.observe([
    BREAK_POINTS.Web,
    BREAK_POINTS.WebPortrait,
  ]), { initialValue: { matches: false, breakpoints: {} } });


  isLandscape: Signal<boolean> = computed(() => this.layoutLandscape().matches);
  isPortrait: Signal<boolean> = computed(() => this.layoutPortrait().matches);

  isPcOrTablet: Signal<boolean> = computed(() => this.layoutPC().matches || this.layoutTablet().matches);
  isPcOrTabletLandscape: Signal<boolean> = computed(() => this.isPcOrTablet() && this.layoutLandscape().matches);
  isPcOrTabletPortrait: Signal<boolean> = computed(() => this.isPcOrTablet() && this.layoutPortrait().matches);

  isHandsetLandscape: Signal<boolean> = computed(() => this.layoutHandset().matches && this.layoutLandscape().matches);
  isHandsetPortrait: Signal<boolean> = computed(() => this.layoutHandset().matches && this.layoutPortrait().matches);

}


