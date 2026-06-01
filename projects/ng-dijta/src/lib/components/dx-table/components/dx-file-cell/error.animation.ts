import { transition, style, animate, trigger } from "@angular/animations";

export const enterTransition = transition(':enter', [
    style({
        opacity: 0
    }),
    animate('1s ease-in', style({
        opacity: 1
    }))
]);

export const leaveTrans = transition(':leave', [
    style({
        opacity: 1
    }),
    animate('1s ease-out', style({
        opacity: 0
    }))
])

export const fadeIn = trigger('fadeIn', [
    enterTransition
]);

export const fadeOut = trigger('fadeOut', [
    leaveTrans
]);