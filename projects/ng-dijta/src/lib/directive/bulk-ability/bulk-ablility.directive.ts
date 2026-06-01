import { ChangeDetectorRef, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Ability } from '@casl/ability';
import { DxPermission } from '../../core/UI/model/ui-permission';

@Directive({
  selector: '[dxBulkAblility]'
})
export class BulkAblilityDirective {
  data?: {
    permission: DxPermission;
    [s: string]: any
  }[];
  currentValue = false;
  @Input('dxBulkAblility') set myDir(data: any) {
    this.data = data ?? [];
    this.validatePermissions();
  }
  constructor(private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly cd: ChangeDetectorRef,
    private readonly ability: Ability) {
    this.viewContainerRef.createEmbeddedView(this.templateRef)
  }
  validatePermissions(): void {
    const permissions:boolean | undefined = this.data?.length! > 0 ? this.data?.some((item) =>
      item.permission ? this.ability.can(item.permission?.permission, item.permission?.apiName) : true
    ) : true;
    if (permissions) {
      this.viewContainerRef.clear();
      this.currentValue = true;
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.cd.detectChanges();
    } else {
      this.currentValue = false;
      this.viewContainerRef.clear();
    }
  }


}
