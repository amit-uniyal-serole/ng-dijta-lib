import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Condition, ConditionClass, Rules } from './condition-class';
import { EvaluateConditions } from './evaluate-conditions.utils';

@Directive({
    selector: '[dxConditionClass]'
})
export class DxConditionDirective {
    data!: any;
    condition: ConditionClass | undefined;
    currentValue = false;

    @Input('dxConditionClass') set myDir(text: any) {
        this.data = text;
        this.validateConditions();
    }

    @Input('condition') set dxCondition(type: ConditionClass | undefined) {
        this.condition = type;
        this.validateConditions();
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }


    private validateConditions(): void {
        if (this.data) {
            this.condition?.rulesets?.forEach((rule: Condition) => {
                const conditionResult = this.condition?.result?.find((result) => result.ruleId === rule.ruleId);
                if (EvaluateConditions.evaluateConditions(this.data, rule.rules)) {
                    if (conditionResult?.class) {
                        conditionResult?.class?.forEach((cls: string) => {
                            this.renderer.addClass(
                                this.elementRef.nativeElement,
                                cls
                            );
                        })
                    }
                    this.hideTheElement(!!conditionResult?.show);
                } else {
                    if (conditionResult?.class) {
                        conditionResult?.class?.forEach((cls: string) => {
                            this.renderer.removeClass(
                                this.elementRef.nativeElement,
                                cls
                            );
                        })
                    }
                    this.hideTheElement(!conditionResult?.show);
                }
            })
        }

    }

    private hideTheElement(show: boolean): void {
        if (show) {
            this.renderer.removeClass(
                this.elementRef.nativeElement,
                'd-none'
            );
        } else {
            this.renderer.addClass(
                this.elementRef.nativeElement,
                'd-none'
            );

        }
    }

}
