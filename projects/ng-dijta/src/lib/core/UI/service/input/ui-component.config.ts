import { UiConfig } from './ui-component-config';
export { UiConfig } from './ui-component-config';

import { InjectionToken } from '@angular/core';

export class UIConfigWrapper {

    get value(): UiConfig {
        return this._value;
    }

    set value(val: UiConfig) {
        this._value = val;
    }
    private _value: UiConfig = {
        currency: {
            currencyCode: 'INR',
            display: 'code'
        },
        dateFormat: 'YYYY/MM/DD',
        timeFormat: 'HH:mm:ss',
        locale: 'en-US',
        country: 'IN'
    };


}

export const UI_COMPONENT_CONFIG = new InjectionToken<UIConfigWrapper>('ui-component.config');

