import { NgDxCardCondition, NgDxCardShowHideCondition, NgDxCardRules, NgDxCardAction, NgDxCardField } from "../interface/custom-validator";
import { NgDxCardRuleCondition, NgDxCardSubCondition } from "../interface/error-rule-validator";

export class NgDxCardEvaluateConditions {
    static evaluateConditions(data: any, conditions: NgDxCardRules[]): boolean {
        let result = true;
        if (data) {
            for (let i = 0; i < conditions.length; i++) {
                const condition = conditions[i];
                const condition1 = conditions[i + 1];
                if (condition.field) {

                    const value = data[condition?.field];
                    switch (condition.operator) {
                        // is , = works same
                        case 'is':
                            result = result && !Array.isArray(condition.value) ? (value === condition.value) :
                                (condition.value as any[])?.some((options: string) => options === value);
                            break;
                        // isn't , != works same                            
                        case "isn't":
                            result = result && !Array.isArray(condition.value) ? (value !== condition.value) :
                                !(condition.value as any[])?.some((options: string) => options === value);
                            break;
                        case '=':                            
                            result = result && !Array.isArray(condition.value) ? (value === condition.value) :
                                (condition.value as any[])?.some((options: string) => options === value);
                            break;
                        case "!=":
                            result = result && !Array.isArray(condition.value) ? (value !== condition.value) :
                                !(condition.value as any[])?.some((options: string) => options !== value);
                            break;
                        case '>':
                        case 'greater_than':
                            
                            result = result && (value > condition.value!);
                            break;
                        case '>=':
                        case 'greater_equal':
                            result = result && (value >= condition.value!);
                            break;
                        case '<':
                        case 'less_than':
                            result = result && (value < condition.value!);
                            break;
                        case '<=':
                        case 'less_equal':
                            result = result && (value <= condition.value!);
                            break;
                        case 'between':
                            result = result && value > condition.value! && value < condition.value!;
                            break;
                        case 'not_between':
                            result = result && !(value > condition.value! && value < condition.value!);
                            break;
                        case 'starts_with':
                            result = result && value && value.toString().toLowerCase().startsWith(condition.value?.toString().toLowerCase());
                            break;
                        case 'contains':
                            result = result && value && value.toString().toLowerCase().includes(condition.value?.toString().toLowerCase());
                            break;
                        case "doesn't contain":
                            result = result && value && !(value.toString().toLowerCase().includes(condition.value?.toString().toLowerCase()));
                            break;
                        case 'ends_with':
                            result = result && value && value.toString().toLowerCase().endsWith(condition.value?.toString().toLowerCase());
                            break;
                        case 'is empty':
                            result = result && !value;
                            break;
                        case 'is not empty':
                            result = result && value;
                            break;
                        // add more operators as needed
                        default:
                            result = false;
                            break;
                    }
                } else if (condition.condition === 'and') {
                    result = result && this.evaluateConditions(data, condition.rules ?? []);
                } else if (condition.condition === 'or') {
                    result = result || this.evaluateConditions(data, condition.rules ?? []);
                } else {
                    result = false;
                }
                if (!result && condition1?.condition !== 'or') {
                    break;
                }
            }

        }

        return result;
    }

    static getAllConditions(condition: NgDxCardShowHideCondition | undefined, type: string | undefined, field: string | undefined): NgDxCardRules[][] | undefined {
        if (condition) {
            return condition.rulesets?.filter((z: NgDxCardCondition) => {
                return z?.actions?.some((x: NgDxCardAction) => {
                    return x?.type.some(d => d === type) && x?.fields?.some((y: NgDxCardField) => {
                        return y.fieldName === field
                    })
                })
            }).map((x) => x.rules)
        }
        return undefined
    }

    static getAllAction(condition: NgDxCardShowHideCondition | undefined, type: string | undefined, field: string | undefined): NgDxCardAction[][] | undefined {
        if (condition) {
            return condition.rulesets?.filter((z: NgDxCardCondition) => {
                return z?.actions?.some((x: NgDxCardAction) => {
                    return x?.type.some(d => d === type) && x?.fields?.some((y: NgDxCardField) => {
                        return y.fieldName === field
                    })
                })
            }).map((x) => x.actions)
        }
        return undefined
    }

    static getAllRuleConditions(condition: NgDxCardRuleCondition[] | undefined, field: string | undefined): NgDxCardSubCondition[][] | undefined {
        if (condition) {
            return condition?.filter((z: NgDxCardRuleCondition) => z.primary_condition?.field === field).map((x) => x.sub_conditions ?? [])
        }
        return undefined
    }


    static convertToExpression(conditions: NgDxCardRules[]): any {
        if (!Array.isArray(conditions)) {
            return '';
        }

        const result = conditions.map((condition) => {
            if ('field' in condition) {
                return `${condition.field} ${condition.operator} '${condition.value}'`;
            } else if ('rules' in condition) {
                const subExpression = this.convertToExpression(condition.rules ?? []);
                return `(${subExpression})`;
            }
            return '';
        });
        const i = conditions.find((condition) => condition.condition)?.condition ?? '';

        return result.join(` ${i?.toUpperCase()} `);
    }

}
