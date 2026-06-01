import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { KeyValueModel } from '../../core/UI/model/keyValue';

@Directive({
  selector: '[dxStatusChip]',

})
export class DxStatusChipDirective implements OnChanges {
  @Input() status: string | undefined;
  @Input() statusList: KeyValueModel[] | undefined;
  @Input() color: string | undefined;
  @Input() link: boolean = false;
  constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    this._chipStyling();
  }

  private _chipStyling(): void {
    const statusInfo: KeyValueModel | undefined = this.statusList?.find(_item => _item?.keyTt === this.status);
    const color: string | undefined = statusInfo?.color ?? this.color;
    const status: string | undefined = statusInfo?.valueTt ?? this.status
    const link: boolean = this.link
    const dot: HTMLElement = this.renderer.createElement('span');
    if (color) {
      this.renderer.setStyle(this.el.nativeElement, 'color', color);
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.9');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', `${color}38`);
      this.renderer.setStyle(this.el.nativeElement, 'border-radius', '20px');
      this.renderer.setStyle(this.el.nativeElement, 'padding', '4px 10px');
      this.renderer.setStyle(this.el.nativeElement, 'display', 'inline-flex');
      this.renderer.setStyle(this.el.nativeElement, 'align-items', 'center');
      this.renderer.setStyle(this.el.nativeElement, 'gap', '7px');
      this.renderer.setStyle(dot, 'background-color', color);
      this.renderer.setStyle(dot, 'height', '10px');
      this.renderer.setStyle(dot, 'width', '10px');
      this.renderer.setStyle(dot, 'display', 'inline-block');
      this.renderer.setStyle(dot, 'border-radius', '50%');
    }

    if (status) {
      this.renderer.setStyle(this.el.nativeElement, 'fontWeight', 'bold');
      this.renderer.setStyle(this.el.nativeElement, 'font-size', '14px');
      this.renderer.setStyle(this.el.nativeElement, 'width', 'fit-content');
      this.el.nativeElement.innerHTML = null;
      this.el.nativeElement.insertAdjacentHTML('afterbegin', status);
      this.el.nativeElement.insertAdjacentElement('afterbegin', dot);
    }
    if (link) {
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
      this.renderer.setStyle(this.el.nativeElement, 'text-decoration-line', 'underline');
      this.renderer.setStyle(this.el.nativeElement, 'text-decoration-style', 'solid');
      this.renderer.setStyle(this.el.nativeElement, 'text-decoration-skip-ink', 'none');
      this.renderer.setStyle(this.el.nativeElement, 'text-decoration-thickness', '8.5%');
      this.renderer.setStyle(this.el.nativeElement, 'text-underline-offset', '20%');
      this.renderer.setStyle(this.el.nativeElement, 'text-underline-position', 'from-font');
    }

  }
}
