import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Injector,
  Input,
  LOCALE_ID,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
  ViewEncapsulation,
  forwardRef
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Observable, } from 'rxjs';
import { KeyValueModel } from '../../core/UI/model/keyValue';

import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { cloneDeep } from 'lodash';
import { filter, first } from 'rxjs/operators';
import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG,
} from '../../core/UI/service/input/ui-component.config';
import { DxFilter } from '../dx-table/interfaces/dx-table.interface';
import { LookupModalComponent } from "./lookup-modal/lookup-modal.component";
import { DxLookupModalConfig } from "./lookup-modal/model/dx-lookup-interface";
@Component({
  selector: 'dx-lookup',
  templateUrl: './dx-lookup.component.html',
  styleUrls: ['./dx-lookup.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxLookupComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxLookupComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxLookupComponent implements ControlValueAccessor, Validator, OnChanges {
  lookupFg: FormGroup = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    name: new FormControl<string | undefined>(undefined),
    data: new FormControl<any>(undefined)
  })
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() actionEmitted: EventEmitter<DxFilter> = new EventEmitter<DxFilter>();
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() outline: "floating" | "none-floating" | "outer-label" =
    "none-floating";
  @Input() readonly: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  @Input() tabIndex:number | undefined;
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;

  static nextId = 0;
  @HostBinding()
  id = `dx-input-lookup-${DxLookupComponent.nextId++}`;



  // To get required 
  @Input()
  get required(): boolean {
    return this._required ?? false;
  }
  // To set required 
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  protected _required: boolean | undefined;

  ctrRequired: boolean | undefined;

  autocomplete: boolean = true;
  filteredOptions!: Observable<KeyValueModel[]>;
  searchCtrl: FormControl = new FormControl();
  @Input() labelPosition: 'left' | 'top' = 'top';
  control: FormControl = new FormControl();
  @HostListener("focusout", ["$event.target"]) onFocusout() {
    this.onTouched();
  }

  onChange: Function = () => { };
  onTouched: Function = () => { };

  //  Lookup Table Input's
  @Input() lookupModalConfig: DxLookupModalConfig | undefined
  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Inject(LOCALE_ID) public locale: string,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef,
    private readonly dialog: MatDialog,
  ) {
    this.outline = config?.value?.outline ?? "none-floating";
  }

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
        this.control.markAsUntouched();
        this.ctrRequired = this.control.hasValidator(Validators.required);
        this.cd.detectChanges();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.lookupModalConfig?.previousValue !== changes?.lookupModalConfig?.currentValue) {
      this.lookupModalConfig = changes?.lookupModalConfig?.currentValue;
    }
  }

  inputChange(event: string): void {
    this.onChange(this.lookupFg?.value);
  }

  writeValue(value: any): void {
    if (value) {
      this.lookupFg.patchValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.lookupFg.valueChanges.subscribe(fn);
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onBlur(value: FocusEvent): void {
    this.blur.emit(value);
    if (this.onTouched) {
      this.onTouched(value);
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.ctrRequired) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges();
    }
    if (!control.hasValidator(Validators.required)) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges();
    }
    return null;
  }

  openLookup(): void {
    const dialogRef: MatDialogRef<LookupModalComponent<any>> =
      this.dialog.open(LookupModalComponent, {
        width: '80%',
        panelClass: ['dialog-modal-box', 'overflow-lookup'],
      });
    dialogRef.componentInstance.actionEmitted.subscribe((eventData: DxFilter) => {
      this.actionEmitted.emit(eventData)
    })
    dialogRef.componentInstance.isGenericService = this.lookupModalConfig?.isGenericService!;
    dialogRef.componentInstance.columns = this.lookupModalConfig?.columns ?? []
    dialogRef.componentInstance.lookUpHeaderSettings = this.lookupModalConfig?.lookUpHeaderSettings!;
    dialogRef.componentInstance.lookupApiConfig = cloneDeep(this.lookupModalConfig?.lookupApiConfig)!;
    dialogRef.componentInstance.tableSettings = this.lookupModalConfig?.tableSettings!;
    dialogRef.componentInstance.listTransform = this.lookupModalConfig?.listTransform;
    dialogRef.componentInstance.config = this.lookupModalConfig?.config;
    dialogRef.componentInstance.additionalFilter = this.lookupModalConfig?.additionalFilter ?? [];
    /**
     * single record selection need to be tested proper         
     */
    dialogRef.componentInstance.singleRowSelection = {
      key: this.lookupModalConfig?.idName['id'] ?? 'pkId',
      value: this.lookupFg?.value?.id ?? undefined
    }
    dialogRef.componentInstance.disableUpdatingSingleSelectionId = !!this.lookupFg?.value?.id;
    dialogRef.afterClosed().pipe(filter(item => !!item), first()).subscribe((result: any) => {
      if (result) {
        const id: string | undefined = this.lookupModalConfig?.idName === 'CUSTOM_MODULE' ? 'pkId' : this.lookupModalConfig?.idName?.id;
        const name: string | undefined = this.lookupModalConfig?.idName === 'CUSTOM_MODULE' ? result?.recordIdentifier : this.lookupModalConfig?.idName?.name;
        const key: string | number = result?.data?.[id!];
        const value: string | number = result?.data?.[name!];

        this.lookupFg.patchValue({
          id: key ?? undefined,
          name: value ?? undefined,
          data: result?.data
        });

        this.writeValue(this.lookupFg?.value);
      }
    });
  }

}
