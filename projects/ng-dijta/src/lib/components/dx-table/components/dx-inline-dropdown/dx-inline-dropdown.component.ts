import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InlineDropDownServiceSetting } from '../../interfaces/dx-table.interface';
import { InlineDropdownDataService } from './inline-dropdown-data.service';

@Component({
  selector: 'dx-inline-dropdown',
  templateUrl: './dx-inline-dropdown.component.html',
  styleUrls: ['./dx-inline-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxInlineDropdownComponent),
      multi: true,
    },
  ],
})
export class DxInlineDropdownComponent implements OnInit {
  @Input() settings!: InlineDropDownServiceSetting;
  @Output() onUpdate: EventEmitter<void> = new EventEmitter<void>();
  @Input() data: any;
  @Input() settingsField: any;
  @Input() isEditable:boolean=false;
  tempServiceUrl: string | undefined;
  isMenuOpen: boolean = false;
  error!: string;
  errorState!: string;
  list: any[] = [];
  isBusy: boolean = false;
  onChange: Function = () => {};
  onTouch: Function = () => {};
  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly inlineDropdownDataService: InlineDropdownDataService
  ) {}
  ngOnInit(): void {}
  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  // Step 4: Define what should happen in this component, if something changes outside
  input!: string;
  writeValue(input: string) {
    this.input = input;
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.cd?.detectChanges();
    if (this.isMenuOpen) {
      this.tempServiceUrl = '';
      this.list=[]
      this.dataUrlTrigger();
    }
  }
  dataUrlTrigger(): void {
    if (this.settings && this.settings?.url && this.settings?.method) {
      this.isBusy = true;

      this.tempServiceUrl = this.settings?.id
        ? this.settings.url + this.settings?.id
        : this.settings.url;
      this.inlineDropdownDataService
        .getTableContextMenuData({
          data: this.settings?.data,
          url: this.tempServiceUrl,
          method: this.settings?.method,
        })
        .subscribe(
          (response: any) => {
            this.list =
              this.settings?.dataTransform(response, this.data)?.length > 0
                ? this.settings?.dataTransform(response, this.data)
                : [];
            if (
              this.data[this.settingsField]['extraOption']?.options &&
              this.data[this.settingsField]['extraOption']?.position === 'first'
            ) {
              this.list?.unshift(
                ...this.data[this.settingsField]?.extraOption?.options
              );
            } else if (this.data[this.settingsField]['extraOption']?.options) {
              this.list?.push(
                ...this.data[this.settingsField]['extraOption']?.options
              );
            }
            if (this.list?.length === 0) {
              this.error = 'No Records';
            }
            this.isBusy = false;
          },
          (error: HttpErrorResponse) => {
            this.error = error?.message;
            this.isBusy = false;
          },
          () => {
            this.isBusy = false;
          }
        );
    }else{
      if(this.data[this.settingsField]['extraOption']?.options){
        this.list?.push(...this.data[this.settingsField]?.['extraOption']?.options)
      }
      
    }
  }
  onClickMenuItem(item: any) {
    this.writeValue(item?.valueTt);
    const key = this.data[this.settingsField]['key'];
    const assignTo = this.data[this.settingsField]['assignTo'];
    if (key && assignTo) {
      assignTo?.map((assignToElement) => {
        this.data[assignToElement] = {
          ...this.data[assignToElement],
          id: item?.data?.[key],
        };
      });
    }
    this.onUpdate.emit();
  }
  change(): void {
    this.onUpdate.emit();
  }
}
