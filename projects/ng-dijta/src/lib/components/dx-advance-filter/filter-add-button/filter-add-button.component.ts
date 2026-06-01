import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { KeyValueModel } from '../../../core';
import { OnClickAddNewButton } from '../model';

@Component({
  selector: 'dx-filter-add-button',
  templateUrl: './filter-add-button.component.html',
  styleUrls: ['./filter-add-button.component.scss'],
})
export class FilterAddButtonComponent {
  @Input() class!: string;
  @Input() btnType!: string | undefined;
  @Input() isMainBtn!: boolean
  @Output() onClickBtn: EventEmitter<OnClickAddNewButton> =
    new EventEmitter<OnClickAddNewButton>();
  isAdFiDropdownOpen: boolean = false;
  @ViewChild('adFiToggle') adFiToggle!: ElementRef;
  @ViewChild('adFiMenu') adFiMenu!: ElementRef;
  @ViewChild('plusIcon') plusIcon!: ElementRef;

  constructor(private renderer: Renderer2) {
    this.renderer?.listen('window', 'click', (e: Event) => {
      if (
        e?.target !== this.adFiToggle?.nativeElement &&
        e?.target !== this.adFiMenu?.nativeElement &&
        e?.target !== this.plusIcon?.nativeElement
      ) {
        this.isAdFiDropdownOpen = false;
      }
    });
  }
  onClickAction(type: string): void {
    const payload: OnClickAddNewButton = {
      actionType: type,
      isAddNew: this.isMainBtn ?? false
    };
    this.onClickBtn?.emit(payload);
    this.btnType = type;
  }
  toggleAdvanceFilterBtnMenu(): void {
    this.isAdFiDropdownOpen = !this.isAdFiDropdownOpen;
  }
}
