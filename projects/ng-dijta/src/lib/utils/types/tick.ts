
import { coerceBooleanProperty, coerceCssPixelValue } from '@angular/cdk/coercion';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { DxSafeAny } from '../../core/outlet/type/any';
export function toBoolean(value: boolean | string): boolean {
    return coerceBooleanProperty(value);
}
export function inNextTick(): Observable<void> {
    const timer = new Subject<void>();
    Promise.resolve().then(() => timer.next());
    return timer.pipe(take(1));
}


export function toCssPixel(value: number | string): string {
    return coerceCssPixelValue(value);
}

function propDecoratorFactory<T, D>(
    name: string,
    fallback: (v: T) => D
): (target: DxSafeAny, propName: string) => void {
    function propDecorator(
        target: DxSafeAny,
        propName: string,
        originalDescriptor?: TypedPropertyDescriptor<DxSafeAny>
    ): DxSafeAny {
        const privatePropName = `$$__zorroPropDecorator__${propName}`;

        if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
            console.warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
        }

        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true
        });

        return {
            get(): string {
                return originalDescriptor && originalDescriptor.get
                    ? originalDescriptor.get.bind(this)()
                    : this[privatePropName];
            },
            set(value: T): void {
                if (originalDescriptor && originalDescriptor.set) {
                    originalDescriptor.set.bind(this)(fallback(value));
                }
                this[privatePropName] = fallback(value);
            }
        };
    }

    return propDecorator;
}

export function InputBoolean(): DxSafeAny {
    return propDecoratorFactory('InputBoolean', toBoolean);
}