import { Rules, ConditionClass } from "./condition-class";

export class EvaluateConditions {
    static evaluateConditions(data: any, conditions: Rules[]): boolean {
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
                            result = result && typeof (condition.value) !== 'object' ? (value === condition.value) :
                                (condition.value as any[])?.some((options: string) => options === value);
                            break;
                        // isn't , != works same                            
                        case "isn't":
                            result = result && typeof (condition.value) !== 'object' ? (value !== condition.value) :
                                !(condition.value as any[])?.some((options: string) => options === value);
                            break;
                        case '=':
                            result = result && typeof (condition.value) !== 'object' ? (value === condition.value) :
                                (condition.value as any[])?.some((options: string) => options === value);
                            break;
                        case "!=":
                            result = result && typeof (condition.value) !== 'object' ? (value !== condition.value) :
                                !(condition.value as any[])?.some((options: string) => options === value);
                            break;
                        case '>':
                            result = result && (value > condition.value!);
                            break;
                        case '>=':
                            result = result && (value >= condition.value!);
                            break;
                        case '<':
                            result = result && (value < condition.value!);
                            break;
                        case '<=':
                            result = result && (value <= condition.value!);
                            break;
                        case 'between':
                            result = result && value > condition.value! && value < condition.value!;
                            break;
                        case 'not_between':
                            result = result && !(value > condition.value! && value < condition.value!);
                            break;
                        case 'starts with':
                            result = result && value && value.toString().toLowerCase().startsWith(condition.value?.toString().toLowerCase());
                            break;
                        case 'contains':
                            result = result && value && value.toString().toLowerCase().includes(condition.value?.toString().toLowerCase());
                            break;
                        case "dosen't contains":
                            result = result && value && !(value.toString().toLowerCase().includes(condition.value?.toString().toLowerCase()));
                            break;
                        case 'ends with':
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

    static getAllConditions(condition: ConditionClass | undefined): Rules[][] | undefined {
        if (condition) {
            return condition.rulesets?.map(rule => rule.rules);
        }
        return undefined
    }
}
