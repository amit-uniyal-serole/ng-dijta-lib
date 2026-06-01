import { MultiActionMenuList } from "../../components/dx-button/dx-button.model";
import { remove } from 'lodash';
import { Condition, ConditionClass, RuleResult } from "../../directive/condition-class/condition-class";
import { EvaluateConditions } from "../../directive/condition-class/evaluate-conditions.utils";
import { MultiActionButtonSettings } from "../../components/dx-table/interfaces/dx-table.interface";
export class ButtonActionTransform {
    static updateActionSettings(buttonActions: MultiActionButtonSettings, data?: any): MultiActionButtonSettings {
        if (buttonActions?.show === false || !this.getButtonConditionForShowHide(buttonActions?.classCondition, data) && buttonActions?.classCondition) {
            const firstMenu: MultiActionMenuList[] = buttonActions?.multiActionDropDown?.menuList.filter((menu: MultiActionMenuList) => {
                return menu.classCondition ? this.getButtonConditionForShowHide(menu.classCondition, data) : true;
            }) ?? [];
            const cloneMenu = remove(firstMenu, (_currentObject, index) => {
                return index !== 0
            });
            if (firstMenu && firstMenu.length > 0) {
                return buttonActions = {
                    show: firstMenu[0]?.show,
                    type: firstMenu[0]?.event,
                    title: firstMenu[0]?.label,
                    disabled: firstMenu[0]?.disable,
                    src: firstMenu[0]?.src,
                    icon: firstMenu[0]?.icon,
                    confirmationPopover: firstMenu[0]?.confirmationPopover,
                    multiActionDropDown: {
                        ...buttonActions?.multiActionDropDown,
                        menuList: cloneMenu ?? []
                    },
                    classCondition: firstMenu[0].classCondition
                }
            } else {
                return buttonActions = undefined!;
            };
        }
        if (buttonActions?.show) {
            const firstMenu: MultiActionMenuList[] = buttonActions?.multiActionDropDown?.menuList.filter((menu: MultiActionMenuList) => {
                return menu.classCondition ? this.getButtonConditionForShowHide(menu.classCondition, data) : true;
            }) ?? [];
            if (firstMenu.length <= 0) {
                return buttonActions = {
                    ...buttonActions,
                    multiActionDropDown: undefined
                }
            }
        }

        return buttonActions
    }

    static getButtonConditionForShowHide(src: ConditionClass | undefined, data: any): boolean | undefined {
        const showResultId = src?.result?.filter((result: RuleResult) => result.show).map((result: RuleResult) => result.ruleId) ?? [];
        const result = src?.rulesets?.filter((rule: Condition) => showResultId.some((showRule: string) => showRule === rule.ruleId));
        return result?.some((res:Condition) => {
            const finalResult = src?.result?.find(x => x.ruleId === res.ruleId)?.show;
            if (data) {
                return EvaluateConditions.evaluateConditions(data, res.rules) ? finalResult : undefined;
            } else {
                return finalResult;
            }
        });
    }
}