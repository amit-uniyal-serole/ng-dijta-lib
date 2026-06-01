import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Injector, Input, LOCALE_ID, OnChanges, OnInit, Optional, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { KeyValueModel, UI_COMPONENT_CONFIG, UIConfigWrapper } from '../../core';
import { DxLookupModalConfig } from '../dx-lookup';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MultiLookupModalComponent } from './multi-lookup-modal/multi-lookup-modal.component';
import { filter, first } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'dx-multi-lookup',
  templateUrl: './dx-multi-lookup.component.html',
  styleUrls: ['./dx-multi-lookup.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxMultiLookupComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxMultiLookupComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxMultiLookupComponent implements ControlValueAccessor, Validator, OnChanges {
  lookupFg: FormGroup = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    name: new FormControl<string | undefined>(undefined),
    data: new FormControl<any>(undefined)
  })
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() outline: "floating" | "none-floating" | "outer-label" =
    "none-floating";
  @Input() readonly: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() tabIndex:number | undefined;
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  enableTwoStepConfirmation: boolean = false;
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;
  selectedRecords: any;

  static nextId = 0;
  @HostBinding()
  id = `dx-input-multilookup-${DxMultiLookupComponent.nextId++}`;

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
    const dialogRef: MatDialogRef<MultiLookupModalComponent<any>> =
      this.dialog.open(MultiLookupModalComponent, {
        width: '80%',
        panelClass: ['lookout-modal-box'],
      });
    const KEY: string | undefined = this.lookupModalConfig?.idName === 'CUSTOM_MODULE' ? 'pkId' : this.lookupModalConfig?.idName?.id;
    dialogRef.componentInstance.isGenericService = this.lookupModalConfig?.isGenericService!;
    dialogRef.componentInstance.columns = this.lookupModalConfig?.columns ?? []
    dialogRef.componentInstance.lookUpHeaderSettings = this.lookupModalConfig?.lookUpHeaderSettings!;
    dialogRef.componentInstance.additionalFilter = this.lookupModalConfig?.additionalFilter ?? [];
    dialogRef.componentInstance.lookupApiConfig = cloneDeep(this.lookupModalConfig?.lookupApiConfig)!;
    dialogRef.componentInstance.setting = this.lookupModalConfig?.tableSettings!;
    dialogRef.componentInstance.listTransform = this.lookupModalConfig?.listTransform;
    dialogRef.componentInstance.config = this.lookupModalConfig?.config;
    dialogRef.componentInstance.actions = {
      enable: true
    };
    const ids: any | any[] = this.lookupFg?.value?.id?.split(',')?.map(val => Number(val));
    dialogRef.componentInstance.multiRowSelection = {
      key: KEY!,
      value: ids && ids?.length > 0 ? ids : []
    };
    if (this.enableTwoStepConfirmation) {
      const idSearch = ids?.length
        ? `${KEY}:in:${JSON.stringify(ids?.map((val: number) => val.toString()))}` : '';
      if (this.lookupModalConfig?.lookupApiConfig?.body?.paginationRequest) {
        dialogRef.componentInstance.lookupApiConfig.body.paginationRequest.search = idSearch
      } else if (
        this.lookupModalConfig?.lookupApiConfig?.paginationRequest
        && dialogRef.componentInstance.lookupApiConfig.paginationRequest
      ) {
        dialogRef.componentInstance.lookupApiConfig.paginationRequest.search = idSearch
      }
    }
    dialogRef.componentInstance.multiRecordSelectionListPkIds = [
      {
        data: this.selectedRecords?.length > 0 ? this.selectedRecords : [],
        isPageUnknown: true
      }
    ];
    dialogRef.componentInstance.enableTwoStepConfirmation = this.enableTwoStepConfirmation;
    dialogRef.componentInstance.selectedRecords = this.selectedRecords;
    dialogRef.afterClosed().pipe(filter(item => !!item), first()).subscribe((result: any) => {
      if (result) {
        this.selectedRecords = result?.selectedRecords;


        const DISPLAY_VALUE: string | undefined = this.lookupModalConfig?.idName === 'CUSTOM_MODULE' ? result?.recordIdentifier : this.lookupModalConfig?.idName?.name;

        const values: string | undefined = result?.selectedRecords?.map?.((item: any) => item?.data?.[DISPLAY_VALUE!])?.join(",");
        const pkIds: string | undefined = result?.selectedRecords?.map?.((item: any) => item?.data?.[KEY!])?.join(",");
        let name: any = this.lookupFg?.value?.name;
        let id: any = this.lookupFg?.value?.id;
        if (result?.type === 'UNASSIGN') {

          const unassignedListValues = result?.unassignedList
            ?.map((val: any) => val?.[DISPLAY_VALUE!]);
          const unassignedListIds = result?.unassignedList
            ?.map((val: any) => val?.[KEY!]?.toString());

          name = (name as string)
            ?.split(",")
            ?.filter((val: any) => !unassignedListValues?.includes(val))?.join();
          id = (id as string)?.split(",")
            ?.filter((id: any) => !unassignedListIds?.includes(id))?.join();

        } else if (result?.type === 'ADD_MORE') {
          name = (name as any)?.split(",")?.concat(values?.split(",")!)?.join();
          id = (id as any)?.split(",")?.concat(pkIds?.split(","))?.join();
        } else {
          name = values;
          id = pkIds;
        };
        this.lookupFg.patchValue({
          id: id ?? undefined,
          name: name ?? undefined,
          data: result?.data
        });

        this.writeValue(this.lookupFg?.value);
      }
    });
  }
}