import { NgDxCardRules } from "./custom-validator"

export interface NgDxCardErrorRuleValidator {
    conditions?: NgDxCardRuleCondition[]
}

export interface NgDxCardRuleCondition {
    sub_conditions?: NgDxCardSubCondition[]
    primary_condition?: NgDxCardPrimaryCondition
    id?: string
}

export interface NgDxCardSubCondition {
    alert?: string
    subid?: string
    rules?: NgDxCardRules[]
}


export interface NgDxCardPrimaryCondition {
    field?: string
    operator?: string
    value?: string
}
