export type RuleOperator = 'is' | "isn't" | '=' | "!=" | ">" | ">=" | "<" | "<=" | "between" | "not_between" | "starts with" | "contains" | "dosen't contains" | "ends with" | "is empty" | "is not empty"
export interface ConditionClass {
    name?: string
    rulesets?: Condition[],
    result?: RuleResult[];
}

export interface Condition {
    ruleId: string;
    rules: Rules[]
}

export interface Rules {
    condition?: string;
    field?: string;
    operator?: RuleOperator;
    value?: string | number | boolean | any[];
    rules?: Rules[]
}
export interface RuleResult {
    ruleId: string;
    class?: string[];
    show?: boolean;
}