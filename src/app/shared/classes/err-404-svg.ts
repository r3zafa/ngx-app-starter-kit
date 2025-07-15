import { computed, InputSignal } from '@angular/core';
import { COLORS } from '../constants';
import { ThemeType } from '../types';

export abstract class Err404Svg {
  // Required input that child components must provide
  abstract theme: InputSignal<ThemeType>;

  // Color computations
  textColor = computed(() => this.theme() === 'dark' ? COLORS.LIGHT : COLORS.DARK);
  error404Bkg = computed(() => this.theme() === 'dark' ? COLORS.DARK : COLORS.LIGHT);
  circleBkg = computed(() => this.theme() === 'dark' ? COLORS.PRIMARY_30 : COLORS.PRIMARY_70);
  parachuteBkg = computed(() => this.theme() === 'dark' ? COLORS.PRIMARY_60 : COLORS.PRIMARY_50);
  //
  personOutline = computed(() => this.theme() === 'dark' ? COLORS.PRIMARY_0 : COLORS.PRIMARY_0);
  personFace = computed(() => this.theme() === 'dark' ? COLORS.NEUTRAL_90 : COLORS.NEUTRAL_90);
  //
  smokeBkg = computed(() => this.theme() === 'dark' ? COLORS.NEUTRAL_50 : COLORS.NEUTRAL_70);
  smokeFwdg = computed(() => this.theme() === 'dark' ? COLORS.NEUTRAL_20 : COLORS.NEUTRAL_10);
  //
  impactFront = computed(() => this.theme() === 'dark' ? COLORS.TERTIARY_50 : COLORS.TERTIARY_50);
  impactBack = computed(() => this.theme() === 'dark' ? COLORS.TERTIARY_35 : COLORS.TERTIARY_25);
  //
  spaceshipOutline = computed(() => this.theme() === 'dark' ? COLORS.PRIMARY_0 : COLORS.PRIMARY_0);
  spaceShipWings = computed(() => this.theme() === 'dark' ? COLORS.SECONDARY_40 : COLORS.SECONDARY_40);
  spaceShipBody = computed(() => this.theme() === 'dark' ? COLORS.SECONDARY_50 : COLORS.SECONDARY_50);
  spaceshipWindow = computed(() => this.theme() === 'dark' ? COLORS.PRIMARY_20 : COLORS.PRIMARY_60);
  spaceshipWindowReflection = computed(() => this.theme() === 'dark' ? COLORS.PRIMARY_30 : COLORS.PRIMARY_80);
  spaceshipWindowFrame = computed(() => this.theme() === 'dark' ? COLORS.SECONDARY_20 : COLORS.SECONDARY_10);
}