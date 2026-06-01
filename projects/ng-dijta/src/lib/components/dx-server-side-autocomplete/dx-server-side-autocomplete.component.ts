import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, ElementRef, HostBinding, Injector, Input, OnInit, Optional, Self, ViewChild, ViewEncapsulation, ViewRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, ValidationErrors, Validator, Validators } from '@angular/forms';
import { } from '@angular/material';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { cloneDeep, startCase } from 'lodash';
import { EMPTY, of, Subject } from 'rxjs';
import { catchError, debounceTime, filter, finalize, first, map, switchMap, tap } from 'rxjs/operators';
import { KeyValueModel, UI_COMPONENT_CONFIG, UIConfigWrapper } from '../../core';
import { DxLookupModalConfig, FormBuilderModuleDefinitionDto, LookupApiConfig, LookupModalComponent } from '../dx-lookup';
import { MultiLookupModalComponent } from '../dx-multi-lookup';
import { ServerSideAutoCompleteService } from './service/server-side-auto-complete.service';
@Component({
  selector: 'dx-server-side-autocomplete',
  templateUrl: './dx-server-side-autocomplete.component.html',
  styleUrls: ['./dx-server-side-autocomplete.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: DxServerSideAutocompleteComponent }],
  encapsulation: ViewEncapsulation.None
})
export class DxServerSideAutocompleteComponent implements ControlValueAccessor, OnInit, Validator, OnInit {

  @ViewChild('inputTrigger', { read: MatAutocompleteTrigger }) inputTrigger!: MatAutocompleteTrigger;
  @ViewChild('serverSideSearchInput') serverSideSearchInput!: ElementRef;
  itemControl = new FormControl();
  stateChanges = new Subject<void>();
  private _placeholder!: string;
  static nextId = 0;
  @HostBinding() id = `input-ac-${DxServerSideAutocompleteComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') describedBy = '';
  _required!: boolean;
  selectedRecords: any = [];
  moduleDefinitionLoader$: boolean = false;
  recordIdentifier: string | undefined;
  recordIdentifierId: string | undefined;
  recordIdentifierSubtitle: string | undefined;
  paginationRequest: any;
  dropdownTransform: any;
  allFetchedData: KeyValueModel[] = [];
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }
  @Input() set value(value: any) {
    if (value) {
      this.selectedItems = value;
      this.criteria = value?.queryCriteria ? value: undefined;
    }
    this.stateChanges.next();
  }
  get value() {
    return this.selectedItems;
  }
  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private changeCallback!: Function;
  private touchedCallback!: Function;
  focused = false;
  isAllSelected = false;
  options: KeyValueModel[] = [];
  selectedItems: KeyValueModel[] = new Array<KeyValueModel>();
  filteredItems!: KeyValueModel[];
  // @Input() apiConfig: DxServerSideAutoCompleteConfig | undefined;
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() hideLookup: boolean = false;
  @Input() row: number = 2;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() labelPosition: 'left' | 'top' = 'top';
  @Input() emptyOption: boolean = false;
  @Input() disableAutoCompleteSearch: boolean = false
  @Input() noneBorder: boolean = false;
  @Input() tabIndex!: number;
  @Input() standardDropdown: boolean = false;
  // To get required 
  @Input()
  get required(): boolean {
    return this._required ?? false;
  }
  // To set required 
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  };
  ctrRequired: boolean | undefined;
  // To set outer label error view
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  //@Input() multiSelect: boolean = false;
  //  Lookup Table Input's
  @Input() lookupModalConfig: DxLookupModalConfig | undefined;
  control: FormControl = new FormControl();
  criteria: string | undefined;
  constructor(
    public injector: Injector,
    @Optional() @Self() public ngControl: NgControl,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>,
    private cd: ChangeDetectorRef,
    private ServerSideAutoCompleteService: ServerSideAutoCompleteService,
    private readonly dialog: MatDialog
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  writeValue(value: any) {
    if (value) {
      this.selectedItems = Array.isArray(value) ? value : [value];
      this.criteria = value?.queryCriteria ? value: undefined;
      if (!this.recordIdentifier) {
        this.getSelectedRecords()
      }
    } else {
      this.selectedItems = [];
    }
  }
  registerOnChange(fn: Function) {
    this.changeCallback = fn;
  }
  registerOnTouched(fn: Function) {
    this.touchedCallback = fn;
  }

  lastFilter = '';
  isAutoCompleteOpen: boolean = false;
  loading: boolean = false;
  ngOnInit() {
    if (this.lookupModalConfig) {
      let lookupApiConfig = this.lookupModalConfig?.lookupApiConfig;
      this.paginationRequest = lookupApiConfig?.body?.paginationRequest ?? lookupApiConfig?.paginationRequest;
      this.recordIdentifier = this.lookupModalConfig?.recordIdentifier;
      this.recordIdentifierId = this.lookupModalConfig?.recordIdentifierId ?? 'pkId';
      this.recordIdentifierSubtitle = this.lookupModalConfig?.recordIdentifierSubtitle ?? undefined;
      if (this.lookupModalConfig?.lookupApiConfig && (this.lookupModalConfig?.isGenericService || this.recordIdentifier)) {
        this.filter(lookupApiConfig);
      } else {
        this.getModuleDefinition(lookupApiConfig!)
      }
      this.searchInputLabel();
    }
    window.addEventListener('scroll', this.scrollEvent, true);
  }
  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
        this.control.markAsUntouched();
        this.ctrRequired = this.control.hasValidator(Validators.required);
        this.detectChangesSafely();
      });
    }
  }

  scrollEvent = (): void => {
    if (this.inputTrigger?.panelOpen) {
      this.inputTrigger?.updatePosition();
    }
  };

  clicker() {
    this.inputTrigger.openPanel();
  }

  private searchInputLabel(): void {
    if (this.recordIdentifier && this.lookupModalConfig && this.lookupModalConfig.lookUpHeaderSettings) {
      this.lookupModalConfig.lookUpHeaderSettings.searchInputLabel = `Search ${startCase(this.recordIdentifier)}`;
    }
  }
  filter(lookupApiConfig: LookupApiConfig<any> | undefined): void {
    this.itemControl.valueChanges.pipe(
      tap(data => {
        if (data?.trim() === '') {
          if (!this.paginationRequest) {
            this.filteredItems = this.filterLocalData('');
          } else {
            this.filteredItems = [];
          }
        }
      }),
      tap(() => this.loading = true),
      debounceTime(2000),
      map(value => typeof value === 'string' ? value : this.lastFilter),
      switchMap((filter: any) => {
        if (!this.paginationRequest) {
          this.loading = false;
          return of(this.filterLocalData(filter));
        }
          return this.loadRecoard(lookupApiConfig!, filter)
      })
    ).subscribe((data: any) => {
      this.filteredItems = data;
    })
  }

  private filterLocalData(searchTerm: string): KeyValueModel[] {
    const term = searchTerm?.trim()?.toLowerCase();
    const selectedKeys = this.selectedItems?.map(item => item?.keyTt?.toString()) || [];
    let results = term
      ? this.allFetchedData.filter(item =>
        (item.valueTt && item.valueTt.toString().toLowerCase().includes(term))
      )
      : this.allFetchedData;
    if (selectedKeys.length > 0) {
      results = results.filter(item => !selectedKeys.includes(item?.keyTt?.toString()));
    }
    return results;
  }

  private loadRecoard(lookupApiConfig: LookupApiConfig<any>, filter: string | undefined) {
    // Fetch Record Identifier , Internal Key and all selected keys //
    const displayLabel = this.lookupModalConfig?.idName === 'CUSTOM_MODULE'
      ? this.recordIdentifier : this.lookupModalConfig?.idName?.['name'];
    const actualValue = this.lookupModalConfig?.idName === 'CUSTOM_MODULE'
      ? this.recordIdentifierId : this.lookupModalConfig?.idName?.['id'];
    const subtitle = this.lookupModalConfig?.idName === 'CUSTOM_MODULE'
      ? this.recordIdentifierSubtitle : this.lookupModalConfig?.idName?.['subtitle'];
        const keys = this.selectedItems?.length > 0 ? this.selectedItems?.map(item => item?.keyTt?.toString()) :[];
    // prepare search
    if (filter) {
          if(this.standardDropdown && this.lookupModalConfig?.lookupApiConfig?.searchBasedOn) {
        lookupApiConfig = {
          ...lookupApiConfig,
          params: {
            [this.lookupModalConfig?.lookupApiConfig?.searchBasedOn]: filter
          }
        }
      } else {
        this.paginationRequest.search =
          filter && this.selectedItems?.length > 0
            ? `${displayLabel}:${this.lookupModalConfig?.lookupApiConfig?.searchBasedOperator ?? 'lk'}:${filter},${actualValue}:nin:${JSON.stringify(keys)}`
            : filter ? `${displayLabel}:${this.lookupModalConfig?.lookupApiConfig?.searchBasedOperator ?? 'lk'}:${filter}` : '';
      }
    } else {
        if(this.standardDropdown && this.lookupModalConfig?.lookupApiConfig?.searchBasedOn) { 
        lookupApiConfig = {
          ...lookupApiConfig,
          params: {
            [this.lookupModalConfig?.lookupApiConfig?.searchBasedOn]: filter
          }
        }
      } else if (this.paginationRequest){
        this.paginationRequest.search = this.selectedItems?.length > 0 ? `${actualValue}:nin:${JSON.stringify(keys)}` : '';
      }

    }
    if (lookupApiConfig?.staticSearch) {
      this.paginationRequest.search = `${lookupApiConfig?.staticSearch},${this.paginationRequest.search}`
    }
    lookupApiConfig = {
      ...lookupApiConfig!,
      paginationRequest: lookupApiConfig?.paginationRequest ? this.paginationRequest : undefined,
      body: {
        ...lookupApiConfig?.body,
        paginationRequest: lookupApiConfig?.body?.paginationRequest ? this.paginationRequest : undefined
      }
    };
    return this.ServerSideAutoCompleteService?.request(lookupApiConfig!)
      .pipe(
        map((data: any) => {
          const moduleResponse = this.lookupModalConfig?.dropdownContentTransform
            ? this.lookupModalConfig?.dropdownContentTransform(data)
            : data?.response?.content
            ?? data?.content
            ?? data;
          const mappedData = moduleResponse?.map(item => {
            return {
              keyTt: item?.[actualValue!],
              valueTt: item?.[displayLabel!],
              subtitle: subtitle ? item?.[subtitle!] : undefined
            }
          });
          if (!this.paginationRequest) {
            this.allFetchedData = mappedData || [];
          }
          return mappedData;
        }),
        first(),
        catchError(() => EMPTY),
        finalize(() => this.loading = false)
      )
  }

  optionClicked(event: Event, item: KeyValueModel) {
    if (item) {
      event.stopPropagation();
      this.toggleSelection(item);
    } else {
      this.selectedItems = this.lookupModalConfig?.tableSettings?.multiSelect ? [] : undefined!;
      this.changeCallback(this.selectedItems)
    }

  }
  toggleSelection(item: KeyValueModel) {
    if (this.lookupModalConfig?.tableSettings?.multiSelect) {
      const index = this.selectedItems?.findIndex(seletectItem => seletectItem?.keyTt === item?.keyTt);
      if (index === -1) {
        this.selectedItems?.push(item);
      } else {
        this.selectedItems = this.selectedItems?.filter(value => value?.keyTt !== item?.keyTt);
      }
      this.getSelectedRecords();
      this.changeCallback(this.selectedItems);
    } else {
      this.selectedItems = [item];
      this.changeCallback(...this.selectedItems);
    }

  }

  private getSelectedRecords(): void {
    if (this.lookupModalConfig?.tableSettings?.multiSelect) {
      this.selectedRecords = this.selectedItems?.map(data => {
        return {
          data: {
            [this.lookupModalConfig?.idName?.['id'] ?? this.recordIdentifierId]: data?.keyTt,
            [this.recordIdentifier ?? this.lookupModalConfig?.idName?.['name']]: data?.valueTt
          }
        }
      })
    }
  }

  matAutoCompleteOpened(): void {
    if (this.serverSideSearchInput) {
      setTimeout(() => {
        this.serverSideSearchInput.nativeElement?.focus();
      }, 100)
    }
    this.filteredItems = [];
    if(!(this.control?.value && this.filteredItems?.length > 0)) {
      this.loading = true
      this.loadRecoard(this.lookupModalConfig?.lookupApiConfig!, undefined).subscribe((data: any) => {
        if (!this.paginationRequest) {
          this.filteredItems = this.filterLocalData('');
        } else {
          this.filteredItems = data;
        }
      })
    }

    this.isAutoCompleteOpen = !this.isAutoCompleteOpen;
  }
  matAutoCompleteClosed(): void {
    if (this.serverSideSearchInput) {
      this.serverSideSearchInput.nativeElement.value = '';
    }
    this.isAutoCompleteOpen = !this.isAutoCompleteOpen;
  }

  remove(event: KeyValueModel): void {
    this.selectedItems = this.selectedItems?.filter((item: KeyValueModel) => item?.keyTt !== event?.keyTt);
    this.changeCallback(this.selectedItems);
  }


  openLookup(event: any): void {
    this.inputTrigger?.closePanel();
    event?.stopPropagation();
    if (this.lookupModalConfig?.tableSettings?.multiSelect) {
      this.multiSelectionLookup();
    } else {
      this.singleSelectionLookup()
    }
  }


  private multiSelectionLookup(): void {
    const dialogRef: MatDialogRef<MultiLookupModalComponent<any>> =
      this.dialog.open(MultiLookupModalComponent, {
        width: '80%',
        panelClass: ['lookout-modal-box'],
      });
    const KEY: string | undefined = this.lookupModalConfig?.idName === 'CUSTOM_MODULE' ? this.recordIdentifierId : this.lookupModalConfig?.idName?.id;
    const SUBTITLE: string | undefined = this.lookupModalConfig?.idName === 'CUSTOM_MODULE' ? this.recordIdentifierId : this.lookupModalConfig?.idName?.subtitle;
    dialogRef.componentInstance.isGenericService = this.lookupModalConfig?.isGenericService!;
    dialogRef.componentInstance.columns = this.lookupModalConfig?.columns ?? []
    dialogRef.componentInstance.lookUpHeaderSettings = this.lookupModalConfig?.lookUpHeaderSettings!;
    dialogRef.componentInstance.additionalFilter = this.lookupModalConfig?.additionalFilter ?? [];
    dialogRef.componentInstance.bluckAction = false;
    dialogRef.componentInstance.lookupApiConfig = cloneDeep({
      ...this.lookupModalConfig?.lookupApiConfig!,
      paginationRequest: this.lookupModalConfig?.lookupApiConfig?.paginationRequest
        ? {
          ...this.lookupModalConfig?.lookupApiConfig?.paginationRequest,
          search: ''
        } : undefined,
      body: {
        ...this.lookupModalConfig?.lookupApiConfig?.body,
        paginationRequest: this.lookupModalConfig?.lookupApiConfig?.body?.paginationRequest
          ? {
            ...this.paginationRequest,
            search: ''
          }
          : undefined
      }
    })!;
    dialogRef.componentInstance.setting = this.lookupModalConfig?.tableSettings!;
    dialogRef.componentInstance.listTransform = this.lookupModalConfig?.listTransform;
    dialogRef.componentInstance.config = this.lookupModalConfig?.config;
    dialogRef.componentInstance.actions = {
      enable: true
    };
    const ids: any | any[] = (this.selectedItems ?? [])?.map((val: any) => isNaN(val?.keyTt) ? val?.keyTt : Number(val?.keyTt));
    dialogRef.componentInstance.multiRowSelection = {
      key: KEY!,
      value: ids && ids?.length > 0 ? ids : []
    };
    dialogRef.componentInstance.multiRecordSelectionListPkIds = [
      {
        data: this.selectedRecords?.length > 0 ? this.selectedRecords : [],
        isPageUnknown: true
      }
    ];
    dialogRef.componentInstance.criteria = this.criteria;
    dialogRef.componentInstance.selectedItems = (this.selectedItems ?? [])?.map((val: any) => {
      return {
        key: this.lookupModalConfig?.idName['subtitle'],
        value: val?.subtitle,
        pkId: val?.keyTt
      }
    });

    dialogRef.componentInstance.enableTwoStepConfirmation = false;
    dialogRef.componentInstance.recordIdentifier = this.lookupModalConfig?.recordIdentifier;
    dialogRef.componentInstance.selectedRecords = this.selectedRecords;
    dialogRef.componentInstance.submitButtonTitle = this.lookupModalConfig?.submitButtonTitle!;
    dialogRef.afterClosed().pipe(filter(item => !!item), first()).subscribe((result: any) => {
      if (result) {
        this.selectedRecords = result?.selectedRecords;
        const DISPLAY_VALUE: string | undefined = this.lookupModalConfig?.idName === 'CUSTOM_MODULE' ? result?.recordIdentifier : this.lookupModalConfig?.idName?.name;
        this.criteria = result?.criteria?.queryCriteria ? result?.criteria: undefined;
        this.selectedItems = (result?.selectedRecords ?? [])?.map?.((item: any) => {
          return {
            keyTt: item?.data?.[KEY!],
            valueTt: item?.data?.[DISPLAY_VALUE!],
            subtitle: item?.data?.[SUBTITLE!],
            data: item?.data
          }
        });
        this.changeCallback(result?.criteria?.queryCriteria ? result?.criteria : this.selectedItems);
      }
    });

  }

  private singleSelectionLookup(): void {
    const dialogRef: MatDialogRef<LookupModalComponent<any>> =
      this.dialog.open(LookupModalComponent, {
        width: '80%',
        panelClass: ['lookout-modal-box'],
      });
    dialogRef.componentInstance.isGenericService = this.lookupModalConfig?.isGenericService!;
    dialogRef.componentInstance.columns = this.lookupModalConfig?.columns ?? []
    dialogRef.componentInstance.lookUpHeaderSettings = this.lookupModalConfig?.lookUpHeaderSettings!;
    dialogRef.componentInstance.lookupApiConfig = cloneDeep({
      ...this.lookupModalConfig?.lookupApiConfig!,
      paginationRequest: this.lookupModalConfig?.lookupApiConfig?.paginationRequest
        ? {
          ...this.lookupModalConfig?.lookupApiConfig?.paginationRequest,
          search: ''
        } : undefined,
      body: {
        ...this.lookupModalConfig?.lookupApiConfig?.body,
        paginationRequest: this.lookupModalConfig?.lookupApiConfig?.body?.paginationRequest
          ? {
            ...this.paginationRequest,
            search: ''
          }
          : undefined
      }
    })!;
    dialogRef.componentInstance.tableSettings = this.lookupModalConfig?.tableSettings!;
    dialogRef.componentInstance.listTransform = this.lookupModalConfig?.listTransform;
    dialogRef.componentInstance.config = this.lookupModalConfig?.config;
    dialogRef.componentInstance.additionalFilter = this.lookupModalConfig?.additionalFilter ?? [];
    dialogRef.componentInstance.recordIdentifier = this.lookupModalConfig?.recordIdentifier;
    /**
     * single record selection need to be tested proper         
     */
    dialogRef.componentInstance.singleRowSelection = {
      key: this.lookupModalConfig?.idName['id'] ?? this.recordIdentifierId,
      value: this.selectedItems?.length > 0 ? this.selectedItems[0]?.keyTt ?? undefined: undefined
    };
    dialogRef.componentInstance.selectedItems = this.selectedItems?.map((val: any) => {
      return {
        key: this.lookupModalConfig?.idName['subtitle'],
        value: val?.subtitle,
        pkId: val?.keyTt
      }
    });
    dialogRef.componentInstance.submitButtonTitle = this.lookupModalConfig?.submitButtonTitle!;
    dialogRef.afterClosed().pipe(filter(item => !!item), first()).subscribe((result: any) => {
      if (result) {
        const id: string | undefined = this.lookupModalConfig?.idName === 'CUSTOM_MODULE' ? this.recordIdentifierId : this.lookupModalConfig?.idName?.id;
        const name: string | undefined = this.lookupModalConfig?.idName === 'CUSTOM_MODULE' ? result?.recordIdentifier : this.lookupModalConfig?.idName?.name;
        const subtitle: string | undefined = this.lookupModalConfig?.idName === 'CUSTOM_MODULE' ? result?.recordIdentifier : this.lookupModalConfig?.idName?.subtitle;
        const key: string | number = result?.data?.[id!];
        const value: string | number = result?.data?.[name!];
        const subtitle1: string | number = result?.data?.[subtitle!];

        this.selectedItems = [{
          keyTt: key,
          valueTt: value as any,
          subtitle: subtitle1 as string,
          data: result?.data
        }]
        this.changeCallback(...this.selectedItems);
      }
    });

  }

  private getModuleDefinition(lookupApiConfig: LookupApiConfig<any>): void {
    if (lookupApiConfig?.body?.module) {
      const moduleDefinition: LookupApiConfig<any> = {
        method: 'GET',
        api: `${lookupApiConfig?.rootUrl}/v1/module/settings?module=${lookupApiConfig?.body?.module}`,
      }
      this.moduleDefinitionLoader$ = true;
      this.detectChangesSafely();
      this.ServerSideAutoCompleteService.request(moduleDefinition)
        .pipe(filter((data: FormBuilderModuleDefinitionDto) => !!data), first()).subscribe(
          {
            next: (moduleDefinition: FormBuilderModuleDefinitionDto) => {
              if (moduleDefinition) {
                const recordIdentifier: string | undefined = this.finalRecordIdentifier(moduleDefinition?.recordIdentifier);
                this.recordIdentifier = recordIdentifier;
                this.searchInputLabel();
              }
              this.filter(lookupApiConfig);
              this.getSelectedRecords();
              this.moduleDefinitionLoader$ = false;
              this.detectChangesSafely();
            },
            error: (err) => {
              this.moduleDefinitionLoader$ = false;
              this.detectChangesSafely();
            },
            complete: () => {
              this.moduleDefinitionLoader$ = false;
              this.detectChangesSafely();
            },
          }
        )

    } else {
      this.filter(lookupApiConfig)
    }
  }
  private finalRecordIdentifier(src: string | undefined): string | undefined {
    const namePopedFieldName: string[] | undefined = src?.split(" ");
    namePopedFieldName?.pop();
    return src?.split(' ').join('')
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const isRequired = control.hasValidator(Validators.required);
    if (this.ctrRequired !== isRequired) {
      Promise.resolve().then(() => {
        this.ctrRequired = isRequired;
        this.detectChangesSafely();
      });
    }
    return null;
  }


  ngOnDestroy() {
    this.fm.stopMonitoring(this.elRef.nativeElement);
    this.stateChanges.complete();
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  private detectChangesSafely(): void {
    const viewRef = this.cd as ViewRef;
    if (!viewRef.destroyed) {
      this.cd.detectChanges();
    }
  }


}
