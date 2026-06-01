import { ChangeDetectorRef, Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgDxCardCondition, NgDxCardRules, NgDxCardShowHideCondition } from '../../interface/custom-validator';
import { NgDxCardEvaluateConditions } from '../../utils/evaluate-conditions.utils';

@Directive({
    selector: '[dxIf]'
})
export class NgDxHideOnChangeDirective {
    data!: any;
    condition: NgDxCardShowHideCondition | undefined;
    field: string | undefined;
    type: string | undefined;
    currentValue = false;
    config: any;
    @Input('dxIf') set myDir(text: any) {
        this.data = text;
        this.validateConditions();
    }

    @Input('dxIfCondition') set dxCondition(type: NgDxCardShowHideCondition | undefined) {
        this.condition = type;
        this.validateConditions();
    }
    @Input('dxIfField') set dxField(type: string) {
        this.field = type;
        this.validateConditions();
    }
    @Input('dxIfType') set dxType(type: string) {
        this.type = type;
        this.validateConditions();
    }

    @Input('dxIfConfig') set dxConfig(config: any) {
        this.config = config;        

        this.validateConditions();
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private cd: ChangeDetectorRef
    ) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
    }

    private validateConditions(): void {
        if (!!this.data && !!this.config) {
            
            const fieldCondition: NgDxCardRules[][] | undefined = NgDxCardEvaluateConditions.getAllConditions(this.config?.condition, this.config?.type, this.config?.field);
            
            if (fieldCondition && fieldCondition.length !== 0) {
                const result = fieldCondition.some((condition: NgDxCardRules[]) => NgDxCardEvaluateConditions.evaluateConditions(this.data, condition));                
                
                const expression = fieldCondition.map((condition: NgDxCardRules[]) => NgDxCardEvaluateConditions.convertToExpression(condition));

                if (!result) {
                    this.currentValue = false;
                    this.viewContainerRef.clear();
                } else {

                    if (this.currentValue !== result) {
                        this.viewContainerRef.clear();
                        this.currentValue = result;
                        this.viewContainerRef.createEmbeddedView(this.templateRef);
                        this.cd.detectChanges();
                    }
                }
            }
        }
    }

}
