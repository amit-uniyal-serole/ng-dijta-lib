import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ButtonClasses, ButtonLoaderType, ConfirmationPopover, CustomLabelColor, MultiActionDropDown } from './dx-button.model';
import { DxConfirmComponent } from '../dx-confirm/dx-confirm.component';
import { ConditionClass } from '../../directive';
import { DxPermission } from '../../core/UI/model/ui-permission';
@Component({
  selector: 'dx-button',
  templateUrl: './dx-button.component.html',
  styleUrls: ['./dx-button.component.scss']
})
export class DxButtonComponent<T> implements AfterViewInit {
  @Input() title!: string;
  @Input() data!: T;
  @Input() condition!: ConditionClass;
  @Input() permission!: DxPermission;
  @Input() disabled!: boolean;
  @Input() show: boolean = true;
  @Input() src!: string;
  @Input() class: ButtonClasses = 'dxBtn';
  @Input() customClass!: string[];
  @Input() multiActionDropDown!: MultiActionDropDown;
  @Input() icon!: string;
  @Input() size: 'default' | 'small' | 'big' = 'default';
  @Input() confirmationPopover!: ConfirmationPopover;
  @Input() isLoading: boolean = false;
  @Input() loaderType: ButtonLoaderType = 'semi-circle';
  @Input() isReverseElement: boolean = false;
  static nextId = 0;
  @HostBinding()
  @Input() id = `dx-button-${DxButtonComponent.nextId++}`;
  @Output() onActionSelect: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClickMenuAction: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('dropDownToggle') dropDownToggle!: ElementRef;
  @ViewChild('multiActonMenu') multiActonMenu!: ElementRef;
  @ViewChild('dropDownIcon') dropDownIcon!: ElementRef;
  @ViewChild('dropDownLabel') dropDownLabel!: ElementRef;
  @ViewChild('subaction', { static: false }) list!: ElementRef;
  isListEmpty: boolean = true;
  isMultiActionDropdownOpen: boolean = true;
  constructor(private renderer: Renderer2, public dialog: MatDialog, private cd: ChangeDetectorRef) {
    this.renderer?.listen('window', 'click', (e) => {
      if (e?.target !== this.dropDownToggle?.nativeElement && e?.target !== this.multiActonMenu?.nativeElement && e?.target !== this.dropDownIcon?.nativeElement && e?.target !== this.dropDownLabel?.nativeElement) {
        this.isMultiActionDropdownOpen = true
      }
    });
  }

  click(): void {
    this.onActionSelect?.emit();
  }

  multiActionMenuClick(event: string, popupConfig: ConfirmationPopover): void {
    if (popupConfig?.isShow) {
      const dialogRef = this.dialog.open(DxConfirmComponent, {
        panelClass: ['lookout-modal-box'],
        data: popupConfig,
        id: 'confirm-dialog'
      });
      dialogRef.afterClosed().subscribe(isConfirmed => {
        if (isConfirmed) {
          this.onClickMenuAction?.emit(event);
        }
        this.isMultiActionDropdownOpen = false;
      });
    } else {
      this.toggleMultiActonMenu();
      this.onClickMenuAction?.emit(event);
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {

      if (this.list) {
        this.isListEmpty = this.list.nativeElement.children.length === 0;
        this.cd.detectChanges();
      }
    }, 100);

  }
  toggleMultiActonMenu(): void {
    this.isMultiActionDropdownOpen = !this.isMultiActionDropdownOpen;
  }
  fillLabelColor(color: string): CustomLabelColor {
    const customColor: CustomLabelColor = {
      color: color
    }
    return customColor
  }

}