import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { DEFAULT_MODE, DEFAULT_ZINDEX, ESC_KEYCODE } from './fullscreen.config';
import { FullscreenMode } from './fullscreen.type';

@Component({
  selector: 'dx-fullscreen',
  templateUrl: './dx-fullscreen.component.html',
  styleUrls: ['./dx-fullscreen.component.scss'],
  preserveWhitespaces: false
})
export class DxFullscreenComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() mode: FullscreenMode = DEFAULT_MODE;
  @Input() zIndex = DEFAULT_ZINDEX;
  /**
   * @deprecated
   */
  @Input() target!: HTMLElement;
  @Input() container!: HTMLElement;
  @Input() beforeChange!: (isFullscreen: boolean, trigger: string) => boolean | Promise<boolean> | Observable<boolean>;
  @Output() fullscreenLaunch: EventEmitter<any> = new EventEmitter<any>();
  document: Document;
  private currentTarget!: HTMLElement | any;
  private isFullscreen = false;

  constructor(@Inject(DOCUMENT) private doc: any, private elementRef: ElementRef, private render: Renderer2) {
    this.document = this.doc;
  }

  ngOnInit() {
    this.document.addEventListener('fullscreenchange', this.onFullScreenChange);
    this.document.addEventListener('MSFullscreenChange', this.onFullScreenChange);
    this.document.addEventListener('webkitfullscreenchange', this.onFullScreenChange);
    this.document.addEventListener('keydown', this.handleKeyDown);
  }

  ngAfterViewInit() {
    const btnLaunch = this.elementRef.nativeElement.querySelector('[fullscreen-launch]');
    if (btnLaunch) {
      btnLaunch.addEventListener('click', this.handleFullscreen);
    }
  }

  ngOnDestroy() {
    this.document.removeEventListener('fullscreenchange', this.onFullScreenChange);
    this.document.removeEventListener('MSFullscreenChange', this.onFullScreenChange);
    this.document.removeEventListener('webkitfullscreenchange', this.onFullScreenChange);
    this.document.removeEventListener('keydown', this.handleKeyDown);
    const btnLaunch = this.elementRef.nativeElement.querySelector('[fullscreen-launch]');
    if (btnLaunch) {
      btnLaunch.removeEventListener('click', this.handleFullscreen);
    }
  }

  private launchNormalFullscreen(targetElement: HTMLElement) {
    targetElement.classList.add('fullscreen');
    if (this.zIndex) {
      targetElement.setAttribute('style', `z-index: ${this.zIndex}`);
    }
  }

  private exitNormalFullscreen(targetElement: HTMLElement | any) {
    targetElement.classList.remove('fullscreen');
    targetElement.style.zIndex = null;
  }

  private async launchImmersiveFullScreen(docElement: any) {
    let fullscreenLaunch;
    if (docElement.requestFullscreen) {
      fullscreenLaunch = docElement.requestFullscreen();
    } else if (docElement.mozRequestFullScreen) {
      fullscreenLaunch = docElement.mozRequestFullScreen();
    } else if (docElement.webkitRequestFullScreen) {
      fullscreenLaunch = Promise.resolve(docElement.webkitRequestFullScreen());
    } else if (docElement.msRequestFullscreen) {
      fullscreenLaunch = Promise.resolve(docElement.msRequestFullscreen());
    }
    return await fullscreenLaunch.then(() => !!this.doc.fullscreenElement);
  }

  private async exitImmersiveFullScreen(doc: any) {
    let fullscreenExit;
    if (doc.exitFullscreen) {
      fullscreenExit = doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      fullscreenExit = doc.mozCancelFullScreen();
    } else if (doc.webkitCancelFullScreen) {
      fullscreenExit = Promise.resolve(doc.webkitCancelFullScreen());
    } else if (doc.msExitFullscreen) {
      fullscreenExit = Promise.resolve(doc.msExitFullscreen());
    }
    return await fullscreenExit.then(() => !!this.doc.fullscreenElement);
  }

  private canChange(isFullscreen: boolean, trigger: string): Promise<boolean> {
    let changeResult = Promise.resolve(true);

    if (this.beforeChange) {
      const result: any = this.beforeChange(isFullscreen, trigger);
      if (typeof result !== 'undefined') {
        if (result.then) {
          changeResult = result.then((res: boolean | undefined) => res ?? true);
        } else if (result.subscribe) {
          changeResult = (result as Observable<boolean>).toPromise().then(value => value !== undefined ? value : false);
        } else {
          changeResult = Promise.resolve(result !== undefined ? result : true);
        }
      }
    }

    return changeResult;
  }

  private beforeChangeCheck(fullscreen: boolean, trigger: string, func: Function) {
    this.canChange(fullscreen, trigger).then((permission: boolean) => permission && func());
  }

  private onFullScreenChange = (event) => {
    if (this.currentTarget) {
      const targetElement: HTMLElement = this.currentTarget;
      if (this.doc.fullscreenElement || this.doc.msFullscreenElement || this.doc.webkitFullscreenElement) {
        this.addFullScreenStyle();
        this.launchNormalFullscreen(targetElement);
      } else {
        this.removeFullScreenStyle();
        this.currentTarget = null;
        this.exitNormalFullscreen(targetElement);
      }
      // F11退出全屏时，需要将全屏状态传出去
      const isFullscreen = !!(this.doc.fullscreenElement || this.doc.msFullscreenElement || this.doc.webkitFullscreenElement);
      this.fullscreenLaunch.emit({ isFullscreen });
      this.isFullscreen = isFullscreen;
    }
  };

  public handleFullscreen = () => {
    const targetElement = this.elementRef.nativeElement.querySelector('[fullscreen-target]');
    const fullscreen =
      this.mode === 'normal'
        ? targetElement.classList.contains('fullscreen')
        : !!(this.doc.fullscreenElement || this.doc.msFullscreenElement || this.doc.webkitFullscreenElement);
    this.beforeChangeCheck(fullscreen, 'click', async () => {
      this.isFullscreen =
        this.mode === 'normal'
          ? this.normalFullscreenCallback(fullscreen, targetElement)
          : await this.immersiveFullScreenCallback(fullscreen, targetElement);
      this.fullscreenLaunch.emit({ isFullscreen: this.isFullscreen });
    });
  };

  normalFullscreenCallback(fullscreen: boolean, targetElement: HTMLElement) {
    if (fullscreen) {
      this.removeFullScreenStyle();
      this.exitNormalFullscreen(targetElement);
      return false;
    } else {
      this.addFullScreenStyle();
      this.launchNormalFullscreen(targetElement);
      return true;
    }
  }

  async immersiveFullScreenCallback(fullscreen: boolean, targetElement: HTMLElement) {
    this.currentTarget = targetElement;
    return fullscreen ? await this.exitImmersiveFullScreen(this.doc) : await this.launchImmersiveFullScreen(this.doc.documentElement);
  }

  private handleKeyDown = (event) => {
    if (event.keyCode === ESC_KEYCODE && this.isFullscreen) {
      this.beforeChangeCheck(this.isFullscreen, 'esc', () => {
        const targetElement = this.elementRef.nativeElement.querySelector('[fullscreen-target]');
        if (this.mode === 'normal') {
          this.removeFullScreenStyle();
          this.exitNormalFullscreen(targetElement);
        } else if (this.doc.fullscreenElement) {
          this.exitImmersiveFullScreen(this.doc);
        }

        this.isFullscreen = false;
        this.fullscreenLaunch.emit({ isFullscreen: false });
      });
    }
  };

  private addFullScreenStyle() {
    if (this.container) {
      this.render.addClass(this.container, 'dx-container-fullscreen');
    } else {
      this.render.addClass(this.document.getElementsByTagName('html')[0], 'dx-fullscreen');
    }
  }

  private removeFullScreenStyle() {
    if (this.container) {
      this.render.removeClass(this.container, 'dx-container-fullscreen');
    } else {
      this.render.removeClass(this.document.getElementsByTagName('html')[0], 'dx-fullscreen');
    }
  }
}