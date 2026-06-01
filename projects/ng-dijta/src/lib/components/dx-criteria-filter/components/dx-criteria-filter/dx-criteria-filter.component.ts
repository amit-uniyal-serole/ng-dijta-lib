import { Component, OnInit, Input, OnChanges, SimpleChanges, forwardRef, HostListener, ChangeDetectorRef, Injector, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, Validator, Validators } from '@angular/forms';
import { KeyValueModel } from '../../../../core';
import { sortBy } from 'lodash';
import { DxLookupModalConfig } from '../../../dx-lookup';
@Component({
  selector: 'dx-criteria-filter',
  templateUrl: './dx-criteria-filter.component.html',
  styleUrls: ['./dx-criteria-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxCriteriaFilterComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DxCriteriaFilterComponent implements OnInit, OnChanges, ControlValueAccessor {
  onChange: Function = () => { };
  onTouched: Function = () => { };
  control: FormControl = new FormControl();

  criteriaForm!: FormGroup;
  operationTypes = ["= ''", "!=''", "${EMPTY}", "${NOTEMPTY}", "is not empty", "is empty"];
  @Input() operatorsToHideValueField = ["${HASCHANGED}"];
  @Input() columns: KeyValueModel[] = [];
  @Input() operators = {
    string: [
      { valueTt: 'Equals to', keyTt: '==' },
      { valueTt: 'Not equals to', keyTt: '!=' },
      { valueTt: 'Contains', keyTt: 'contains' },
      { valueTt: 'Like', keyTt: 'like' },
    ],
    integer: [
      { valueTt: 'Equals to', keyTt: '==' },
      { valueTt: 'Not equals to', keyTt: '!=' },
      { valueTt: 'Greater than', keyTt: '>' },
      { valueTt: 'Greater than or equals to', keyTt: '>=' },
      { valueTt: 'Less than', keyTt: '<' },
      { valueTt: 'Less than or equals to', keyTt: '<=' },
    ],
    decimal: [
      { valueTt: 'Equals to', keyTt: '==' },
      { valueTt: 'Not equals to', keyTt: '!=' },
      { valueTt: 'Greater than', keyTt: '>' },
      { valueTt: 'Greater than or equals to', keyTt: '>=' },
      { valueTt: 'Less than', keyTt: '<' },
      { valueTt: 'Less than or equals to', keyTt: '<=' },
    ],
    float: [
      { valueTt: 'Equals to', keyTt: '==' },
      { valueTt: 'Not equals to', keyTt: '!=' },
      { valueTt: 'Greater than', keyTt: '>' },
      { valueTt: 'Greater than or equals to', keyTt: '>=' },
      { valueTt: 'Less than', keyTt: '<' },
      { valueTt: 'Less than or equals to', keyTt: '<=' },
    ],
    long: [
      { valueTt: 'Equals to', keyTt: '==' },
      { valueTt: 'Not equals to', keyTt: '!=' },
      { valueTt: 'Greater than', keyTt: '>' },
      { valueTt: 'Greater than or equals to', keyTt: '>=' },
      { valueTt: 'Less than', keyTt: '<' },
      { valueTt: 'Less than or equals to', keyTt: '<=' },
    ],
    time: [
      { valueTt: 'Equals to', keyTt: '==' },
      { valueTt: 'Not equals to', keyTt: '!=' },
      { valueTt: 'Greater than', keyTt: '>' },
      { valueTt: 'Greater than or equals to', keyTt: '>=' },
      { valueTt: 'Less than', keyTt: '<' },
      { valueTt: 'Less than or equals to', keyTt: '<=' },
    ],
    date: [
      { valueTt: 'Equals to', keyTt: '==' },
      { valueTt: 'Not equals to', keyTt: '!=' },
      { valueTt: 'Greater than', keyTt: '>' },
      { valueTt: 'Greater than or equals to', keyTt: '>=' },
      { valueTt: 'Less than', keyTt: '<' },
      { valueTt: 'Less than or equals to', keyTt: '<=' },
      { valueTt: 'Between', keyTt: 'BETWEEN' },
      { valueTt: 'Not Between', keyTt: 'NOTBETWEEN' },
    ],
    dateTime: [
      { valueTt: 'Equals to', keyTt: '==' },
      { valueTt: 'Not equals to', keyTt: '!=' },
      { valueTt: 'Greater than', keyTt: '>' },
      { valueTt: 'Greater than or equals to', keyTt: '>=' },
      { valueTt: 'Less than', keyTt: '<' },
      { valueTt: 'Less than or equals to', keyTt: '<=' },
      { valueTt: 'Between', keyTt: 'BETWEEN' },
      { valueTt: 'Not Between', keyTt: 'NOTBETWEEN' },
    ],
    category: [
      { valueTt: 'Equals to', keyTt: '==' },
      { valueTt: 'Not equals to', keyTt: '!=' },
      { valueTt: 'In', keyTt: 'in' },
      { valueTt: 'Not in', keyTt: 'not in' },
    ],
    boolean: [
      { valueTt: 'Is', keyTt: 'is' },
    ],
    currency: [
      { valueTt: 'Equals to', keyTt: '==' },
      { valueTt: 'Not equals to', keyTt: '!=' },
      { valueTt: 'Greater than', keyTt: '>' },
      { valueTt: 'Greater than or equals to', keyTt: '>=' },
      { valueTt: 'Less than', keyTt: '<' },
      { valueTt: 'Less than or equals to', keyTt: '<=' },
    ],
  };

  booleanValueOptions: KeyValueModel[] = [
    {
      keyTt: 'selected',
      valueTt: 'Selected'
    },
    {
      keyTt: 'notSelected',
      valueTt: 'Not Selected'
    },
  ];
  @Input() readonlyCriteria: boolean = false;
  @Input() rootUrl: string | undefined;
  @Input() enablePattern: boolean = false;
  @Input() maxConditions: number = 0;
  @Input() singleSelection: boolean = false;
  userModalConfig: DxLookupModalConfig | undefined;

  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
  }

  constructor(private formBuidler: FormBuilder, public injector: Injector,
    private readonly cd: ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
        this.control?.markAsUntouched();

        this.cd.detectChanges();
      });
    }
  }


  ngOnInit(): void {
    this.criteriaFormControls();
    this.userModal(this.rootUrl!);
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges?.columns?.previousValue !== simpleChanges?.columns?.currentValue) {
      this.columns = simpleChanges?.columns?.currentValue;
      this.columns = [
        ...this.columns,
        {
          keyTt: 'None',
          valueTt: 'None',
        }
      ];
    }
    if (simpleChanges?.operators?.previousValue !== simpleChanges?.operators?.currentValue) {
      this.operators = simpleChanges?.operators?.currentValue
    }

    if (simpleChanges?.rootUrl?.previousValue !== simpleChanges?.rootUrl?.currentValue) {
      this.rootUrl = simpleChanges?.rootUrl?.currentValue;
      this.userModal(this.rootUrl!);
    }

  }


  private criteriaFormControls(): void {
    this.criteriaForm = this.formBuidler.group({
      expression: [""],
      rules: this.formBuidler?.array([this.addCriteria]),
    })
  }


  get addCriteria(): FormGroup {
    return this.formBuidler.group({
      field: ["None"],
      operator: "",
      value: [undefined],
      logicalOperator: true,
      data: undefined
    });
  }


  get getCiterias(): FormArray {
    return (this.criteriaForm.get("rules") as FormArray)
  }

  checkCriteria() {
    let rules = this.criteriaForm?.controls['rules'] as FormArray;
    if (rules?.length > 1) {
      return true;
    } else {
      return false;
    }
  }

  addciteria(): void {
    this.getCiterias.push(this.addCriteria);
    const defaultExPresssion = this.criteriaForm?.value?.expression && this.criteriaForm?.value?.expression !== ""
      ? this.criteriaForm?.value?.expression : "1";
    const expression: string | undefined = '(' + defaultExPresssion?.concat(`and${this.getCiterias?.length})`);
    this.criteriaForm?.controls?.expression.setValue(expression)
  }

  removeCriteria(index: number): void {
    let fieldControl = (this.getCiterias.controls[index] as FormGroup)?.['controls'];
    if (fieldControl['field'].value !== 'None') {
      fieldControl['field']?.setValue('None');
      fieldControl['value']?.setValue(undefined);
      fieldControl['operator']?.setValue(undefined);
    }
  }

  removeAllCriteria(): void {
    this.getCiterias.clear();
    this.getCiterias.push(this.addCriteria);
    this.criteriaForm?.controls?.expression.setValue('')
  }

  getFieldType(field: string): string | undefined {
    return this.columns?.find((column: KeyValueModel) => column?.keyTt === field)?.data?.type;
  }
  getPicklistOptions(field: string): KeyValueModel[] | undefined {
    return sortBy(this.columns?.find((column: KeyValueModel) => column?.keyTt === field)?.data?.options, item => item.valueTt?.toLowerCase());
  }

  getOperators(value: string) {
    const type: string | undefined = this.getFieldType(value)
    return type ? this.operators[type] : []
  }

  onColumnChange(value, index: number): void {
    const valueControl = (this.getCiterias.controls[index] as FormGroup)?.['controls']?.value;
    if (value && value !== 'None') {
      (this.getCiterias.controls[index] as FormGroup)?.['controls'].operator.patchValue('');
      (this.getCiterias.controls[index] as FormGroup)?.['controls'].value.patchValue('');
      (this.getCiterias.controls[index] as FormGroup)?.['controls'].operator.updateValueAndValidity();
      (this.getCiterias.controls[index] as FormGroup)?.['controls'].value.updateValueAndValidity();
      valueControl?.setValue(undefined);
      valueControl?.updateValueAndValidity()
    }

  }


  deleteciteria(index: number): void {
    const logicalOp: string = this.getCiterias.controls[index].value.logicalOperator ? 'and' : 'or';
    let expression = this.criteriaForm?.controls?.expression?.value.slice(1).split(`${logicalOp}${this.getCiterias.controls?.length})`).join("");
    this.criteriaForm?.controls?.expression.setValue(expression.length > 1 ? expression : "");
    this.getCiterias?.removeAt(index);
  }

  inputChange(event: string): void {
    this.onChange(this.criteriaForm.value);
  }
  inputChangeEnd(event: string): void {
    this.onChange(this.criteriaForm.value);
  }
  writeValue(value: any): void {
    if (value) {      
      value = {
        ...value,
        rules: value?.rules?.map(rule => {
          return {
            ...rule,
            value: this.tranformDataBasedOnFieldType(rule) ?? rule?.value
          }
        })
      }
      this.addFormControls(value?.rules);
      setTimeout(() => {
        this.criteriaForm.patchValue(value);
      }, 1000);
    }
  }

  private tranformDataBasedOnFieldType(rule: any): any {
    if (rule?.value) {
      const type = this.columns?.find(column => column?.keyTt === rule?.field)?.data?.type;
      if (type === 'Picklist') {
        return rule?.value ? Array.isArray(rule?.value) ? rule?.value : rule?.value?.split(',') : [];
      } else {
        return rule?.value;
      }
    }
  }

  addFormControls(rules: any): void {
    Array(rules?.length - 1).fill("")?.forEach((val: any) => {
      this.getCiterias.push(this.addCriteria);
    });
  }
  registerOnChange(fn: (value: any) => void) {
    this.criteriaForm.valueChanges.subscribe(fn);
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
  onChangeLogicalOperator(index: number, logicalOp: boolean): void {
    const expression: string = this.criteriaForm?.controls?.expression.value;
    const updatedExpression: string = expression.replace(`${!logicalOp ? 'and' : 'or'}${index + 2}`, `${logicalOp ? 'and' : 'or'}${index + 2}`);
    this.criteriaForm?.controls?.expression.setValue(updatedExpression);
  }

  clearValue(index: number) {
    const valueControl = (this.getCiterias.controls[index] as FormGroup)?.['controls']?.value;
    valueControl.setValue(undefined);
  }

  private userModal(rootUrl: string): void {
    this.userModalConfig = {
      idName: {
        id: 'userId',
        name: 'fullName'
      },
      lookupApiConfig: {
        method: 'GET',
        api: `${rootUrl}/v1/settings/users`,
        searchBasedOn: 'fullName',
        paginationRequest: {
          sortOrder: 'desc',
          sortBy: 'pkId',
          pageNo: 0,
          pageSize: 10,
        }
      },
      tableSettings: {
        leftActions: [
          {
            icon: 'refresh',
            label: 'Refresh',
            type: 'refresh',
          },
        ],
        pageSize: 10,
        pagination: true,
        paginationFirstLastButtons: true,
        singleRowSelect: true,
      },
      columns: [
        {
          field: 'fullName',
          columnDef: 'fullName',
          title: 'Full Name',
          type: 'text',
        },
        {
          field: 'userName',
          columnDef: 'userName',
          title: 'User Name',
          type: 'text',
        },
        {
          field: 'email',
          columnDef: 'email',
          title: 'Email',
          type: 'text',
        },
      ],
      isGenericService: true,
      lookUpHeaderSettings: {
        title: 'Select User',
        searchInputLabel: 'Search Full Name'
      }
    }
  }
}
