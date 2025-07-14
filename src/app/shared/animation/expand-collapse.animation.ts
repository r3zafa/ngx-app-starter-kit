import { trigger, state, style, transition, animate } from '@angular/animations';

const defaultParams = {
  expandedWidth: '16rem',
  collapsedWidth: '4.5rem',
  expandDuration: '300ms',  // Separate duration for expanding
  collapseDuration: '200ms' // Separate duration for collapsing
};

export const expandCollapseAnimation = [
  trigger('expandCollapse', [
    state('expanded', style({
      width: '{{expandedWidth}}',
    }), { params: defaultParams }),
    state('collapsed', style({
      width: '{{collapsedWidth}}',
    }), { params: defaultParams }),
    
    // Different transitions for expand vs collapse
    transition('collapsed => expanded', [
      animate('{{expandDuration}} ease-in-out')
    ]),
    transition('expanded => collapsed', [
      animate('{{collapseDuration}} ease-in-out')
    ]),
    
    transition(':enter', [
      style({ width: '0', opacity: 0 }),
      animate('{{expandDuration}} ease-in-out', style({ 
        width: '{{expandedWidth}}',
      }))
    ], { params: defaultParams }),
    
    transition(':leave', [
      animate('{{collapseDuration}} ease-in-out', style({ 
        width: '0',
      }))
    ], { params: defaultParams })
  ])
];