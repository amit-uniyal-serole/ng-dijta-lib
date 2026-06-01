import { ChangeDetectorRef, Directive, Inject, Input, TemplateRef, ViewContainerRef, OnDestroy, OnInit } from '@angular/core';
import { AnyAbility, PureAbility } from '@casl/ability';
import { DxPermission } from '../../core/UI/model/ui-permission';

@Directive({
  selector: '[dxBulkAbility]'
})
export class BulkAbilityDirective<T extends AnyAbility> implements OnInit, OnDestroy {
  data?: { permission: DxPermission;[s: string]: any }[];
  currentValue = false;
  private abilitySubscription?: () => void; // Store unsubscribe function

  @Input('dxBulkAbility') set myDir(data: any) {
    this.data = data ?? [];
    this.validatePermissions();
  }

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly cd: ChangeDetectorRef,
    @Inject(PureAbility) readonly ability: T
  ) { }

  ngOnInit(): void {
    // Subscribe to ability updates ONCE when directive is initialized
    this.abilitySubscription = this.ability.on('update', () => {
      setTimeout(() => {
        this.validatePermissions();
      }, 1000);
    });

    // Initial validation on component load
    setTimeout(() => {
      this.validatePermissions();
    }, 1000);
  }

  validatePermissions(): void {
    const permissions = this.data?.length! > 0
      ? this.data?.some(item => item.permission
        ? this.ability.can(item.permission?.permission, item.permission?.apiName)
        : true
      )
      : true;
    if (permissions !== this.currentValue) {
      this.currentValue = permissions ?? false;
      this.viewContainerRef.clear();
      if (permissions) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
      this.cd.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.abilitySubscription) {
      this.abilitySubscription(); // Unsubscribe when directive is destroyed
    }
  }
}
