import {
  Component,
  OnDestroy,
  Input,
  OnInit,
  OnChanges,
  SimpleChange,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener,
  ViewChild,
  ElementRef,
  Optional,
  Inject,
} from "@angular/core";
import { DxLoaderService } from "./dx-loader.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {
  LOADERS,
  DEFAULTS,
  Size,
  DxLoader,
  PRIMARY_SPINNER,
} from "./dx-loader.enum";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { DxLoaderConfig, DX_SPINNER_CONFIG } from "./config";

@Component({
  selector: "dx-loader",
  templateUrl: "dx-loader.component.html",
  styleUrls: ["./dx-loader.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger("fadeIn", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate(300)]),
      transition(":leave", animate(200, style({ opacity: 0 }))),
    ]),
  ],
})
export class DxLoaderComponent implements OnDestroy, OnInit, OnChanges {
  /**
   * To set backdrop color
   * Only supports RGBA color format
   * @memberof DxLoaderComponent
   */
  @Input() bdColor: string;
  /**
   * To set spinner size
   *
   * @memberof DxLoaderComponent
   */
  @Input() size: Size;
  /**
   * To set spinner color(DEFAULTS.SPINNER_COLOR)
   *
   * @memberof DxLoaderComponent
   */
  @Input() color: string;
  /**
   * To set type of spinner
   *
   * @memberof DxLoaderComponent
   */
  @Input() type: string | undefined;
  /**
   * To toggle fullscreen mode
   *
   * @memberof DxLoaderComponent
   */
  @Input() fullScreen: boolean;
  /**
   * Spinner name
   *
   * @memberof DxLoaderComponent
   */
  @Input() name: string;
  /**
   * z-index value
   *
   * @memberof DxLoaderComponent
   */
  @Input() zIndex: number;
  /**
   * Custom template for spinner/loader
   *
   * @memberof DxLoaderComponent
   */
  @Input() template: string | undefined;
  /**
   * Show/Hide the spinner
   *
   * @type {boolean}
   * @memberof DxLoaderComponent
   */
  @Input() showSpinner: boolean;

  /**
   * To enable/disable animation
   *
   * @type {boolean}
   * @memberof DxLoaderComponent
   */
  @Input() disableAnimation: boolean = false;
  /**
   * Spinner Object
   *
   * @memberof DxLoaderComponent
   */
  spinner: DxLoader = new DxLoader();
  /**
   * Array for spinner's div
   *
   * @memberof DxLoaderComponent
   */
  divArray: Array<number>;
  /**
   * Counter for div
   *
   * @memberof DxLoaderComponent
   *
   */
  divCount: number;
  /**
   * Show spinner
   *
   * @memberof DxLoaderComponent
   **/
  @Input() show: boolean = false;
  /**
   * Unsubscribe from spinner's observable
   *
   * @memberof DxLoaderComponent
   **/
  ngUnsubscribe: Subject<void> = new Subject();
  /**
   * Element Reference
   *
   * @memberof DxLoaderComponent
   */
  @ViewChild("overlay") spinnerDOM: { nativeElement: any; } | undefined;

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.spinnerDOM && this.spinnerDOM.nativeElement) {
      if (
        this.fullScreen ||
        (!this.fullScreen && this.isSpinnerZone(event.target))
      ) {
        event.returnValue = false;
        event.preventDefault();
      }
    }
  }

  /**
   * Creates an instance of DxLoaderComponent.
   *
   * @memberof DxLoaderComponent
   */
  constructor(
    private dxLoaderService: DxLoaderService,
    private changeDetector: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional()
    @Inject(DX_SPINNER_CONFIG)
    private globalConfig: DxLoaderConfig
  ) {
    this.bdColor = DEFAULTS.BD_COLOR;
    this.zIndex = DEFAULTS.Z_INDEX;
    this.color = DEFAULTS.SPINNER_COLOR;
    this.size = "large";
    this.fullScreen = true;
    this.name = PRIMARY_SPINNER;
    this.template = undefined;
    this.showSpinner = false;

    this.divArray = [];
    this.divCount = 0;
    this.show = false;
  }

  initObservable() {
    this.dxLoaderService
      .getSpinner(this.name ?? 'ball-pulse-sync')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((spinner: DxLoader) => {
        this.setDefaultOptions();
        Object.assign(this.spinner, spinner);
        if (spinner.show) {
          this.onInputChange();
        }
        this.changeDetector.detectChanges();
      });
  }

  /**
   * Initialization method
   *
   * @memberof DxLoaderComponent
   */
  ngOnInit() {
    this.setDefaultOptions();
    this.initObservable();
  }

  /**
   * To check event triggers inside the Spinner Zone
   *
   * @param {*} element
   * @returns {boolean}
   * @memberof DxLoaderComponent
   */
  isSpinnerZone(element: any): boolean {
    if (element === this.elementRef.nativeElement.parentElement) {
      return true;
    }
    return element.parentNode && this.isSpinnerZone(element.parentNode);
  }

  /**
   * To set default ngx-spinner options
   *
   * @memberof DxLoaderComponent
   */
  setDefaultOptions = () => {
    const { type } = this.globalConfig ?? {};
    this.spinner = DxLoader.create({
      name: this.name,
      bdColor: this.bdColor,
      size: this.size,
      color: this.color,
      type: this.type ?? (type ?? 'ball-clip-rotate'),
      fullScreen: this.fullScreen,
      divArray: this.divArray,
      divCount: this.divCount,
      show: this.show,
      zIndex: this.zIndex,
      template: this.template,
      showSpinner: this.showSpinner,
    });
    if (this.show) {
      this.dxLoaderService.show(this.name)
    } else {
      this.dxLoaderService.hide(this.name)
    }
  };
  /**
   * On changes event for input variables
   *
   * @memberof DxLoaderComponent
   */
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (const propName in changes) {
      if (propName) {
        const changedProp = changes[propName];
        if (changedProp.isFirstChange()) {
          return;
        } else if (
          typeof changedProp.currentValue !== "undefined" &&
          changedProp.currentValue !== changedProp.previousValue
        ) {
          if (changedProp.currentValue !== "") {
            this.spinner[propName] = changedProp.currentValue;
            if (propName === "showSpinner") {
              if (changedProp.currentValue) {
                this.dxLoaderService.show(this.spinner.name, this.spinner);
              } else {
                this.dxLoaderService.hide(this.spinner.name);
              }
            }

            if (propName === "name") {
              this.initObservable();
            }
          }
        }
      }
    }
    if (changes['show']) {
      if (changes['show'].currentValue) {
        this.dxLoaderService.show(this.name);
        this.setDefaultOptions();
      } else {
        this.dxLoaderService.hide(this.name);
        this.setDefaultOptions();
      }
    }
  }
  /**
   * To get class for spinner
   *
   * @memberof DxLoaderComponent
   */
  getClass(type: string, size: Size): string {
    this.spinner.divCount = LOADERS[type];
    this.spinner.divArray = Array(this.spinner.divCount)
      .fill(0)
      .map((_, i) => i);
    let sizeClass = "";
    switch (size.toLowerCase()) {
      case "small":
        sizeClass = "la-sm";
        break;
      case "medium":
        sizeClass = "la-2x";
        break;
      case "large":
        sizeClass = "la-3x";
        break;
      default:
        break;
    }
    return "la-" + type + " " + sizeClass;
  }
  /**
   * Check if input variables have changed
   *
   * @memberof DxLoaderComponent
   */
  onInputChange() {
    this.spinner.class = this.getClass(this.spinner.type, this.spinner.size);
  }
  /**
   * Component destroy event
   *
   * @memberof DxLoaderComponent
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
