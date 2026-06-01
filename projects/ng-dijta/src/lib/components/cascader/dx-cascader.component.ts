import {
    ChangeDetectorRef,
    Component,
    forwardRef,
    HostListener,
    Inject,
    Injector,
    Input,
    LOCALE_ID,
    OnChanges,
    Optional,
    SimpleChanges,
    ViewEncapsulation,
    OnDestroy,
    ChangeDetectionStrategy,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NgControl,
    NG_VALUE_ACCESSOR,
    Validators,
    AbstractControl,
    NG_VALIDATORS,
    ValidationErrors,
    Validator
} from '@angular/forms';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    UI_COMPONENT_CONFIG,
    UIConfigWrapper,
} from '../../core/UI/service/input/ui-component.config';
import { KeyValueModel } from '../../core/UI/model/keyValue';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { CascaderItem } from './cascader.type';


@Component({
    selector: 'dx-cascader-input',
    template: `
        <div class="dx-field-wrapper" [class.none-label]="noneLabel" [ngClass]="outline"
  [class.display-view]="viewOnly" [class.dx-disable]="disabled" [class.left-align-label]="labelPosition === 'left'"
  floatLabel="never" [class.required]="required || ctrRequired" [class]="outerLabelErrorType">
  <mat-label class="dx-outer-label-wrapper">
    <span class="dx-outer-label">
      <ng-content select="[dxLabel]"></ng-content>
    </span>
  </mat-label>
  <mat-form-field appearance="outline">
    <mat-label class="dx-input-label">
      <ng-content select="dx-label"></ng-content>
    </mat-label>
    <input matInput [formControl]="control" style="display: none;">
      <d-cascader 
        [options]="options" 
        [placeholder]="'please select'" 
        [required]="required || ctrRequired"  
        [disabled]="disabled"  
        [formControl]="control" 
        [trigger]="'click'" 
        [showPath]="false" 
        [canSelectParent]="true"
        [allowClear]="true" 
        [loadChildrenFn]="loadChildrenFn" 
        [multiple]="multi" (ngModelChange)="inputChange()"></d-cascader>
    <span matSuffix>
      <ng-content select="dx-suffix"></ng-content>
    </span>
    <mat-hint>
      <ng-content select="dx-hint"> </ng-content>
    </mat-hint>
    <mat-error>
      <ng-content select="dx-error"></ng-content>
    </mat-error>
  </mat-form-field>
</div>
    
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DxCascadeInputComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DxCascadeInputComponent),
            multi: true,
        },
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default
})
export class DxCascadeInputComponent
    implements ControlValueAccessor, OnChanges, Validator, OnDestroy {

    @Input() options: CascaderItem[] = [];
    @Input() multiSelect: boolean = false;
    @Input() noneLabel: boolean = false;
    @Input() disabled: boolean = false;
    @Input() viewOnly: boolean = false;
    @Input() readonly: boolean = false;
    @Input() multi: boolean = false;
    @Input() name: string | undefined;
    @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
    @Input() labelPosition: 'left' | 'top' = 'top';
    @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
    @Input() loadChildrenFn!: (value: CascaderItem) => Promise<CascaderItem[]> | Observable<CascaderItem[]>

    value: string = '';

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

    control: FormControl = new FormControl();

    subscriptions: Subscription | undefined;

    @HostListener('focusout', ['$event.target'])
    onFocusout() {
        this.onTouched();
    }

    constructor(
        public injector: Injector,
        private readonly cd: ChangeDetectorRef,
        @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
        @Optional() @Inject(LOCALE_ID) public locale: string,
        readonly sanitizer: DomSanitizer
    ) { }


    onChange: Function = () => { };
    onTouched: Function = () => { };

    inputChange(): void {
        this.onChange(this.control.value);
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
        if (changes?.disabled?.currentValue !== changes?.disabled?.previousValue) {
            if (changes.disabled.currentValue) {
                this.control?.disable();
                this.cd.detectChanges();
            } else {
                this.control?.enable();
                this.cd.detectChanges();
            }
        }
    }

    writeValue(value: string[]): void {
        this.onChange(value);
    }

    registerOnChange(fn: Function): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onTouched = fn;
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

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngOnDestroy(): void {
        this.subscriptions?.unsubscribe()
    }

}
