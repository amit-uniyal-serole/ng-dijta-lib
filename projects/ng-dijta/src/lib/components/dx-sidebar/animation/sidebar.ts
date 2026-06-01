import { trigger, state, style, transition, animate } from "@angular/animations";

export enum SIDEBAR_MENU_ENUM {
  EASY_IN_OUT_400MS = '1s ease-in-out',
  IN = 'in',
  OUT = 'out',
}

export const SIDEBAR_SIDE_IN_OUT = trigger('slideInOut', [
  state(
    SIDEBAR_MENU_ENUM.IN,
    style({
      height: '*',
      width: '250px',
      overflow: 'auto',
      'overflow-x': 'hidden'
    })
  ),
  state(
    SIDEBAR_MENU_ENUM.OUT,
    style({
      width: '0px', // new change
      overflow: 'hidden',

    })
  ),
  transition('in => out', animate(SIDEBAR_MENU_ENUM.EASY_IN_OUT_400MS)),
  transition('out => in', animate(SIDEBAR_MENU_ENUM.EASY_IN_OUT_400MS)),
]);

export const SLIDING_WINDOW = trigger('slideWindowInOut', [
  state('in', style({ transform: 'width:auto' })),
  state('out', style({ transform: 'translateX(-130%)' })),
  transition('in => out', [animate('300ms ease-in')]),
  transition('out => in', [animate('300ms ease-out')])
])
export const SIDEBAR_SIDE_IN_OUT_OPACITY = trigger('slideInOutTwo', [
  state(
    SIDEBAR_MENU_ENUM.IN,
    style({
      opacity: 1,
    })
  ),
  state(
    SIDEBAR_MENU_ENUM.OUT,
    style({
      opacity: 0,
    })
  ),
  transition('in => out', animate(SIDEBAR_MENU_ENUM.EASY_IN_OUT_400MS)),
  transition('out => in', animate(SIDEBAR_MENU_ENUM.EASY_IN_OUT_400MS)),
]);

export const SIDEBAR_ROTATE = trigger('rotatedState', [
  state('false', style({ transform: 'rotate(45deg)' })),
  state(
    'true',
    style({ transform: 'rotate(0deg)', color: 'var(--primary-base)' })
  ),
  transition('true => false', animate('200ms ease-out')),
  transition('false => true', animate('200ms ease-in')),
]);

export const SIDEBAR_MENU_VISIBILITY = trigger('menuItems', [
  state('menuItemVisibility',
    style({
      opacity: 1,
    })
  ),
  transition('void => menuItemVisibility', [
    style({
      opacity: 0,
    }),
    animate('500ms ease-in')
  ]),
])
