import { CdkTreeNodeOutlet } from '@angular/cdk/tree';
import { Directive, forwardRef } from '@angular/core';

@Directive({
  selector: '[dxTreeNodeOutlet]',
  providers: [
    {
      provide: CdkTreeNodeOutlet,
      useExisting: forwardRef(() => DxTreeNodeOutletDirective)
    }
  ]
})
export class DxTreeNodeOutletDirective extends CdkTreeNodeOutlet {}