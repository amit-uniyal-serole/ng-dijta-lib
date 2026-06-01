import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationTriggerMetadata,
} from '@angular/animations';
export type TOGGLE_ANIMATIONS = 'sm' | 'md' | 'lg';
export class ToggleAnimationConstant {
  static getAnimations(
    type?: TOGGLE_ANIMATIONS
  ): AnimationTriggerMetadata[] | undefined {
    switch (type) {
      case 'sm':
        return ToggleAnimationConstant.small;
      case 'md':
        return ToggleAnimationConstant.medium;
      case 'lg':
        return ToggleAnimationConstant.large;
      default:
        return ToggleAnimationConstant.medium;
    }
  }
  static readonly small = [
    trigger('panelOpen', [
      state(
        'open',
        style({
          width: '200px',
          opacity: 1,
        })
      ),
      state(
        'close',
        style({
          width: '0',
          opacity: 0,
        })
      ),
      transition('open=>close', animate('300ms ease-in-out')),
      transition('close=>open', animate('400ms ease-in-out')),
    ]),
  ];
  static readonly medium = [
    trigger('panelOpen', [
      state(
        'open',
        style({
          width: '400px',
          opacity: 1,
        })
      ),
      state(
        'close',
        style({
          width: '0',
          opacity: 0,
        })
      ),
      transition('open=>close', animate('300ms ease-in-out')),
      transition('close=>open', animate('400ms ease-in-out')),
    ]),
  ];
  static readonly large = [
    trigger('panelOpen', [
      state(
        'open',
        style({
          width: '600px',
          opacity: 1,
        })
      ),
      state(
        'close',
        style({
          width: '0',
          opacity: 0,
        })
      ),
      transition('open=>close', animate('300ms ease-in-out')),
      transition('close=>open', animate('400ms ease-in-out')),
    ]),
  ];
}
