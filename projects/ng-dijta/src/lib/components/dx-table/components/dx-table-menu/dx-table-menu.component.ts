import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BulkActions, MenuAction } from '../../interfaces/dx-table.interface';
import { MatMenuTrigger } from '@angular/material/menu';
import { DxPopoverDirective } from '../../../dx-popover/popover';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopover } from '../../../dx-button/dx-button.model';
import { DxConfirmComponent } from '../../../dx-confirm/dx-confirm.component';
import { ConditionClass } from '../../../../directive/condition-class/condition-class';
import { ButtonActionTransform } from '../../../../utils/transform/button-actions.transform';
import { AnyAbility, PureAbility } from '@casl/ability';
@Component({
  selector: 'dx-table-menu',
  templateUrl: './dx-table-menu.component.html',
  styleUrls: ['./dx-table-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DxTableMenuComponent<T extends AnyAbility> implements OnChanges, AfterViewInit {
  @Input() isBusy!: boolean;
  @Input() data!: T;
  @Input() condition!: ConditionClass;
  @Input() menu!: BulkActions;
  @Output() onClickBulkMenuAction: EventEmitter<MenuAction> =
    new EventEmitter<MenuAction>();
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @ViewChild('DxPopoverDirective') dxPopoverDirective!: DxPopoverDirective;
  @ViewChild('list', { static: false }) list!: ElementRef;
  isListEmpty: boolean = true;
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    @Inject(PureAbility) ability: T
  ) {
    ability.on('update', () => {
      setTimeout(() => {
        this.isListEmpty = this.list?.nativeElement?.children?.length === 0;
        this.cd.detectChanges();
      }, 1000);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.menu?.previousValue != changes?.menu?.currentValue) {
      this.menu = changes?.menu?.currentValue;
    }
    if (
      (changes?.menu?.previousValue != changes?.menu?.currentValue)
      ||
      (changes?.data?.previousValue != changes?.data?.currentValue)) {
      if (this.menu) {
        this.menu.actions = this.menu?.actions?.filter((menu: MenuAction) => {
          return menu.classCondition ? ButtonActionTransform.getButtonConditionForShowHide(menu.classCondition, this.data) : true;
        }) ?? [];
      }
    }
  }
  bulkActionMenuClick(event: MenuAction, popupConfig: ConfirmationPopover) {
    if (popupConfig?.isShow) {
      const dialogRef = this.dialog.open(DxConfirmComponent, {
        panelClass: ['lookout-modal-box'],
        width: '30%',
        data: popupConfig,
        id: 'confirm-dialog'
      });
      dialogRef.afterClosed().subscribe(isConfirmed => {
        if (isConfirmed) {
          this.onClickBulkMenuAction.emit(event);
        }
      });
    } else {
      this.onClickBulkMenuAction.emit(event);
    }
  }
  ngAfterViewInit() {
    this.isListEmpty = this.list?.nativeElement?.children?.length === 0;
    this.cd.detectChanges();
  }
}
