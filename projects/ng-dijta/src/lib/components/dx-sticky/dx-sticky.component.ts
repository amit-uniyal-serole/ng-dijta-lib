import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, throttleTime } from 'rxjs/operators';
import { WindowRef } from '../../core/window-ref/public-api';

export type StickyStatus = 'normal' | 'follow' | 'stay' | 'remain';

@Component({
  selector: 'dx-sticky',
  template: `
    <div #stickyWrapper [style.zIndex]="zIndex">
      <ng-content></ng-content>
    </div>
  `,
  preserveWhitespaces: false,
})
export class DxStickyComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('style.position') hostPosition = 'relative';
  @Input() zIndex!: number;
  @Input() backgroundColor!: string;
  @Input() boxShadow!: string;
  @Input() container!: Element;
  @Input() view!: {
    top?: number;
    bottom?: number;
  };
  @Input() scrollTarget;

  @Output() statusChange: EventEmitter<StickyStatus> = new EventEmitter<StickyStatus>();
  @ViewChild('stickyWrapper', { static: true }) wrapper;

  _prevStatus: StickyStatus | undefined = undefined;
  _status: StickyStatus = 'normal';
  set status(status: StickyStatus) {
    if (status !== this._status) {
      this._prevStatus = this._status;
      this._status = status;
      this.statusChange.emit(this._status);
      this.statusProcess(this._status);
    }
  }
  get status() {
    return this._status;
  }

  parentNode;
  containerLeft;

  private THROTTLE_DELAY = 16;
  private THROTTLE_TRIGGER = 100;
  private scrollPreStart;
  private scrollTimer;
  subscription!: Subscription;

  constructor(private el: ElementRef, private windowRef: WindowRef) { }

  ngOnInit() {
    this.parentNode = this.el.nativeElement.parentNode;
    if (!this.container) {
      this.container = this.parentNode;
    }
  }

  ngAfterViewInit() {
    this.scrollTarget = this.scrollTarget || this.windowRef.window;
    this.scrollTarget.addEventListener('scroll', this.throttle);
    this.initScrollStatus(this.scrollTarget);
    if (this.scrollTarget !== this.windowRef.window) {
      this.subscription = fromEvent<Event>(this.windowRef?.window!, 'scroll')
        .pipe(
          throttleTime(100, undefined, { leading: true, trailing: true }),
          filter(
            (event) =>
              event.target !== this.scrollTarget &&
              (event.target === this.windowRef.window ||
                event.target === this.windowRef.document ||
                ((<HTMLElement>event.target).contains && (<HTMLElement>event.target).contains(this.scrollTarget)))
          )
        )
        .subscribe((event) => {
          this.statusProcess(this._status);
        });
    }
  }

  ngOnDestroy() {
    this.scrollTarget.removeEventListener('scroll', this.throttle);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  statusProcess(status) {
    switch (status) {
      case 'normal':
        this.wrapper.nativeElement.style.top = 'auto';
        this.wrapper.nativeElement.style.left = 'auto';
        this.wrapper.nativeElement.style.position = 'static';
        this.wrapper.nativeElement.style.backgroundColor ='inherit';
        this.wrapper.nativeElement.style.boxShadow = 'none';
        break;
      case 'follow':
        {
          const viewOffset = this.scrollTarget && this.scrollTarget !== this.windowRef.window ?
            this.scrollTarget.getBoundingClientRect().top : 0;
          this.wrapper.nativeElement.style.top = Number(viewOffset) + ((this.view && this.view.top) || 0) + 'px';
          this.wrapper.nativeElement.style.left = this.wrapper.nativeElement.getBoundingClientRect().left + 'px';
          this.wrapper.nativeElement.style.position = 'fixed';
          this.wrapper.nativeElement.style.width = '100%';
          this.wrapper.nativeElement.style.backgroundColor = this.backgroundColor;
          this.wrapper.nativeElement.style.boxShadow = this.boxShadow

          break;
        }
      case 'stay':
        {
          this.wrapper.nativeElement.style.top = this.calculateRelativePosition(this.wrapper.nativeElement, this.parentNode, 'top') + 'px';
          this.wrapper.nativeElement.style.left = 'auto';
          this.wrapper.nativeElement.style.position = 'relative';
          break;
        }
      case 'remain':
        {
          if (this.wrapper.nativeElement.style.position !== 'fixed' || this.wrapper.nativeElement.style.position !== 'absolute') {
            this.wrapper.nativeElement.style.top = this.calculateRelativePosition(this.wrapper.nativeElement, this.parentNode, 'top') + 'px';
            this.wrapper.nativeElement.style.left = 'auto';
            this.wrapper.nativeElement.style.position = 'absolute';
          }
          this.wrapper.nativeElement.style.top =
            this.calculateRemainPosition(this.wrapper.nativeElement, this.parentNode, this.container) + 'px';
          this.wrapper.nativeElement.style.left = this.calculateRelativePosition(this.wrapper.nativeElement, this.parentNode, 'left') + 'px';
          this.wrapper.nativeElement.style.position = 'relative';
          break;
        }
      default:
        break;
    }
  }

  @HostListener('window:resize')
  throttle = () => {
    const fn = this.scrollAndResizeHock;
    const time = Date.now();
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
    if (!this.scrollPreStart) {
      this.scrollPreStart = time;
    }
    if (time - this.scrollPreStart > this.THROTTLE_TRIGGER) {
      fn();
      this.scrollPreStart = null;
      this.scrollTimer = null;
    } else {
      this.scrollTimer = setTimeout(() => {
        fn();
        this.scrollPreStart = null;
        this.scrollTimer = null;
      }, this.THROTTLE_DELAY);
    }
  };
  scrollAndResizeHock = () => {
    if (this.container.getBoundingClientRect().left - (this.containerLeft || 0) !== 0) {
      this.status = 'stay';
      this.containerLeft = this.container.getBoundingClientRect().left;
    } else {
      this.scrollHandler();
    }
  };

  scrollHandler = () => {
    const viewOffsetTop = this.scrollTarget && this.scrollTarget !== this.windowRef.window ?
      this.scrollTarget.getBoundingClientRect().top : 0;
    const computedStyle = this.windowRef.window?.getComputedStyle(this.container);
    if (this.parentNode.getBoundingClientRect().top - viewOffsetTop > ((this.view && this.view.top) || 0)) {
      this.status = 'normal';
    } else if (
      this.container.getBoundingClientRect().top +
      parseInt(computedStyle?.paddingTop ?? '0', 10) +
      parseInt(computedStyle?.borderTopWidth ?? '0', 10) -
      viewOffsetTop >=
      ((this.view && this.view.top) || 0)
    ) {
      this.status = 'normal';
    } else if (
      this.container.getBoundingClientRect().bottom -
      parseInt(computedStyle?.paddingBottom ?? '0', 10) -
      parseInt(computedStyle?.borderBottomWidth ?? '0', 10) <
      viewOffsetTop +
      ((this.view && this.view.top) || 0) +
      this.wrapper.nativeElement.getBoundingClientRect().height +
      ((this.view && this.view.bottom) || 0)
    ) {
      this.status = 'remain';
    } else if (
      this.container.getBoundingClientRect().top + parseInt(computedStyle?.paddingTop ?? '0', 10) - viewOffsetTop <
      ((this.view && this.view.top) || 0)
    ) {
      this.status = 'follow';
    }
  };

  calculateRelativePosition(element, relativeElement, direction) {
    const key = {
      left: ['left', 'Left'],
      top: ['top', 'Top'],
    };
    if (this.windowRef.window && this.windowRef.window.getComputedStyle) {
      const computedStyle = this.windowRef.window.getComputedStyle(relativeElement);
      return (
        element.getBoundingClientRect()[key[direction][0]] -
        relativeElement.getBoundingClientRect()[key[direction][0]] -
        parseInt(computedStyle['padding' + key[direction][1]], 10) -
        parseInt(computedStyle['border' + key[direction][1] + 'Width'], 10)
      );
    }
    return
  }
  calculateRemainPosition(element, relativeElement, container) {
    if (this.windowRef.window && this.windowRef.window.getComputedStyle) {
      const computedStyle = this.windowRef.window.getComputedStyle(container);
      const result =
        container.getBoundingClientRect().height -
        element.getBoundingClientRect().height +
        container.getBoundingClientRect().top -
        relativeElement.getBoundingClientRect().top -
        parseInt(computedStyle['paddingTop'], 10) -
        parseInt(computedStyle['borderTopWidth'], 10) -
        parseInt(computedStyle['paddingBottom'], 10) -
        parseInt(computedStyle['borderBottomWidth'], 10);
      return result < 0 ? 0 : result;
    }
    return
  }

  initScrollStatus(target) {
    const scrollTargets = target === this.windowRef.window ?
      [this.windowRef.document.documentElement, this.windowRef.document.body] : [target];
    let flag = false;
    scrollTargets.forEach((scrollTarget) => {
      if (scrollTarget.scrollTop && scrollTarget.scrollTop > 0) {
        flag = true;
      }
    });
    if (flag) {
      setTimeout(this.scrollHandler);
    }
  }

  public recalculatePosition() {
    this.initScrollStatus(this.scrollTarget);
  }
}

