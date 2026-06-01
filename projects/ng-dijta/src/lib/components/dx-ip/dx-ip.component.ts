import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, HostBinding, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { COPY_METHOD, NgxIpBase } from './dx-ip.base';

export const ADDRESS_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DxIpComponent),
  multi: true
};

export const ADDRESS_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => DxIpComponent),
  multi: true
};

@Component({
  selector: 'dx-ip',
  templateUrl: './dx-ip.component.html',
  styleUrls: ['./dx-ip.component.scss'],
  providers: [ADDRESS_CONTROL_VALUE_ACCESSOR, ADDRESS_CONTROL_VALIDATORS],
  animations: [
    trigger('copyAnim', [
      transition('void => *', [
        style({
          transform: 'translateY(-100%)'
        }),
        animate('0.25s')
      ]),
      transition('* => void', [
        animate('0.25s', style({
          transform: 'translateY(-100%)'
        }))
      ])
    ]),
    trigger('inputAnim', [
      state('hide', style({ opacity: 0 })),
      transition('* => hide', [
        animate('0.25s', style({
          transform: 'translateY(100%)'
        }))
      ]),
      transition('hide => *', [
        style({
          transform: 'translateY(100%)'
        }),
        animate('0.25s')
      ])
    ])
  ]
})
export class DxIpComponent extends NgxIpBase {

  public containerClass: string[] = [];
  public resolveCopyMethod: ((method: COPY_METHOD) => void) | undefined;
  public inputAnim: string | undefined;
  private _highlightInvalidBlocks: boolean = true;
  @Input() labelPosition: 'left' | 'top' = 'top';
  @Input() outline: "floating" | "none-floating" | "outer-label" =
    "none-floating";
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  @Input() tabIndex: number | undefined;
  ctrRequired: boolean | undefined;

  get highlightInvalidBlocks(): boolean {
    return this._highlightInvalidBlocks;
  }

  static nextId = 0;
  @HostBinding()
  id = `dx-input-ip-${DxIpComponent.nextId++}`;

  /**
   * When true add's the 'ngx-ip-error' class to the block when it's invalid.
   * @param value
   */
  @Input()
  set highlightInvalidBlocks(value: boolean) {
    if (this._highlightInvalidBlocks === value) {
      return;
    }

    this._highlightInvalidBlocks = value;
    this.markValidity();
  }

  get focused(): boolean {
    return this.containerClass.indexOf('ngx-ip-focused') > -1;
  }

  set focused(value: boolean) {
    const idx = this.containerClass.indexOf('ngx-ip-focused');
    if (value && idx === -1) {
      this.containerClass.push('ngx-ip-focused');
    } else if (!value && idx > -1) {
      this.containerClass.splice(idx, 1);
    }
  }

  get theme(): string {
    return this._theme;
  }

  /**
   * The CSS class representing the theme of this instance.
   * @param value
   */
  @Input()
  set theme(value: string) {
    if (this._theme === value) {
      return;
    }

    let idx = this.containerClass.indexOf(this._theme);
    if (idx > -1) {
      this.containerClass.splice(idx, 1);
    }

    this._theme = value;

    if (value) {
      this.containerClass.push(value);
    }
  }

  private _theme: string = '';

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  onCopyDecision(method: COPY_METHOD): void {
    const fn = this.resolveCopyMethod;
    this.resolveCopyMethod = this.inputAnim = undefined;
    if (fn) {
      fn(method);
    }
  }

  getUserCopyMethod(): Promise<COPY_METHOD> {
    this.inputAnim = 'hide';
    return new Promise(resolve => this.resolveCopyMethod = resolve);
  }

}
