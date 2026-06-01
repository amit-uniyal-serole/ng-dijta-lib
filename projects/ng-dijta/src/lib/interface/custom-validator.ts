export type NgDxCardRuleOperator = 'is' | "isn't" | '=' | "!=" | ">" | ">=" | "<" | "<=" | "between" | "not_between" | "starts_with" | "contains" | "doesn't contain" | "ends_with" | "is empty" | "is not empty" | "greater_equal" | "greater_than" | "less_than" | "less_equal"
export interface NgDxCardShowHideCondition {
    name?: string
    rulesets?: NgDxCardCondition[]
}

export interface NgDxCardCondition {
    rules: NgDxCardRules[]
    actions: NgDxCardAction[]
}

export interface NgDxCardRules {
    condition?: string;
    field?: string;
    operator?: NgDxCardRuleOperator;
    value?: string | number | boolean | any[];
    rules?: NgDxCardRules[]
}
export interface NgDxCardAction {
    type: string[];
    fields: NgDxCardField[]
}

export interface NgDxCardField {
    fieldName: string,
    message?: string
}
