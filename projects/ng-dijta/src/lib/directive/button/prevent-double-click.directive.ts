import {
    Directive,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Directive({
    selector: '[appPreventDoubleClick]',
})
export class PreventDoubleClickDirective implements OnInit, OnDestroy {
    @Input()
    throttleTime = 500;

    @Output()
    throttledClick = new EventEmitter<MouseEvent>();

    private clicks = new Subject<MouseEvent>();
    private subscription!: Subscription;
    private keyboardEnter = new Subject<KeyboardEvent>();


    ngOnInit() {
        this.subscription = this.clicks
            .pipe(throttleTime(this.throttleTime))
            .subscribe((e: MouseEvent) => this.emitThrottledClick(e));
    }

    emitThrottledClick(e: MouseEvent): void {
        this.throttledClick.emit(e);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    @HostListener('click', ['$event'])
    clickEvent(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }

    @HostListener('document:keydown.enter', ['$event'])
    handleEnterKey(event: KeyboardEvent): void {
      event.preventDefault();
      event.stopPropagation();
      this.keyboardEnter.next(event);
    }
}
