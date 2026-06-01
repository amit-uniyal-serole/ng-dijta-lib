import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, mapTo } from 'rxjs/operators';
import { DxSafeAny } from '../outlet/type/any';


import { DxConfig, DxConfigKey, NZ_CONFIG } from './config';

const isDefined = function (value?: DxSafeAny): boolean {
    return value !== undefined;
};


@Injectable({
    providedIn: 'root'
})
export class DxConfigService {
    private configUpdated$ = new Subject<keyof DxConfig>();

    /** Global config holding property. */
    private readonly config: DxConfig;

    constructor(@Optional() @Inject(NZ_CONFIG) defaultConfig?: DxConfig) {
        this.config = defaultConfig || {};
    }

    getConfig(): DxConfig {
        return this.config;
    }

    getConfigForComponent<T extends DxConfigKey>(componentName: T): DxConfig[T] {
        return this.config[componentName];
    }

    getConfigChangeEventForComponent(componentName: DxConfigKey): Observable<void> {
        return this.configUpdated$.pipe(
            filter(n => n === componentName),
            mapTo(undefined)
        );
    }

    set<T extends DxConfigKey>(componentName: T, value: DxConfig[T]): void {
        this.config[componentName] = { ...this.config[componentName], ...value };
        this.configUpdated$.next(componentName);
    }
}

/* eslint-disable no-invalid-this */

/**
 * This decorator is used to decorate properties. If a property is decorated, it would try to load default value from
 * config.
 */
// eslint-disable-next-line
export function WithConfig<T>() {
    return function ConfigDecorator(
        target: DxSafeAny,
        propName: DxSafeAny,
        originalDescriptor?: TypedPropertyDescriptor<T>
    ): DxSafeAny {
        const privatePropName = `$$__zorroConfigDecorator__${propName}`;

        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true,
            enumerable: false
        });

        return {
            get(): T | undefined {
                const originalValue = originalDescriptor?.get ? originalDescriptor.get.bind(this)() : this[privatePropName];
                const assignedByUser = (this.propertyAssignCounter?.[propName] || 0) > 1;
                const configValue = this.DxConfigService?.getConfigForComponent(this._nzModuleName)?.[propName];
                if (assignedByUser && isDefined(originalValue)) {
                    return originalValue;
                } else {
                    return isDefined(configValue) ? configValue : originalValue;
                }
            },
            set(value?: T): void {
                // If the value is assigned, we consider the newly assigned value as 'assigned by user'.
                this.propertyAssignCounter = this.propertyAssignCounter || {};
                this.propertyAssignCounter[propName] = (this.propertyAssignCounter[propName] || 0) + 1;

                if (originalDescriptor?.set) {
                    originalDescriptor.set.bind(this)(value!);
                } else {
                    this[privatePropName] = value;
                }
            },
            configurable: true,
            enumerable: true
        };
    };
}