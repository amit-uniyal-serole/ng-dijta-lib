import { CdkTreeNodePadding } from '@angular/cdk/tree';
import { Directive, forwardRef, Input, numberAttribute } from '@angular/core';

@Directive({
  selector: '[dxTreeNodePadding]',
  providers: [
    {
      provide: CdkTreeNodePadding,
      useExisting: forwardRef(() => DxTreeNodePaddingDirective)
    }
  ]
})
export class DxTreeNodePaddingDirective<T> extends CdkTreeNodePadding<T> {
  override _indent = 24;

  @Input({ alias: 'dxTreeNodePadding', transform: numberAttribute })
  override get level(): number {
    return this._level;
  }
  override set level(value: number) {
    this._setLevelInput(value);
  }

  @Input('dxTreeNodePaddingIndent')
  override get indent(): number | string {
    return this._indent;
  }
  override set indent(indent: number | string) {
    this._setIndentInput(indent);
  }
}