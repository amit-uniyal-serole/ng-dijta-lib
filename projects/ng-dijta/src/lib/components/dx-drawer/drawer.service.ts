import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DxSafeAny } from '../../core/outlet/type/any';


import { DxDrawerOptions, DxDrawerOptionsOfComponent } from './drawer-options';
import { DxDrawerRef } from './drawer-ref';
import { DxDrawerComponent } from './drawer.component';
import { DxDrawerServiceModule } from './drawer.service.module';

export class DrawerBuilderForService<T, R> {
    private drawerRef: DxDrawerComponent<T, R> | null;
    private overlayRef: OverlayRef;
    private unsubscribe$ = new Subject<void>();

    constructor(private overlay: Overlay, private options: DxDrawerOptions) {
        /** pick {@link NzDrawerOptions.nzOnCancel} and omit this option */
        const { nzOnCancel, ...componentOption } = this.options;
        this.overlayRef = this.overlay.create();
        this.drawerRef = this.overlayRef.attach(new ComponentPortal(DxDrawerComponent)).instance;
        this.updateOptions(componentOption);
        // Prevent repeatedly open drawer when tap focus element.
        this.drawerRef.savePreviouslyFocusedElement();
        this.drawerRef.dxOnViewInit.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.drawerRef!.open();
        });
        this.drawerRef.dxOnClose.subscribe(() => {
            if (nzOnCancel) {
                nzOnCancel().then(canClose => {
                    if (canClose !== false) {
                        this.drawerRef!.close();
                    }
                });
            } else {
                this.drawerRef!.close();
            }
        });

        this.drawerRef.afterClose.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
            this.overlayRef.dispose();
            this.drawerRef = null;
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
        });
    }

    getInstance(): DxDrawerRef<T, R> {
        return this.drawerRef!;
    }

    updateOptions(options: DxDrawerOptionsOfComponent): void {
        Object.assign(this.drawerRef!, options);
    }
}

@Injectable({ providedIn: DxDrawerServiceModule })
export class DxDrawerService {
    constructor(private overlay: Overlay) { }

    create<T = DxSafeAny, D = undefined, R = DxSafeAny>(
        options: DxDrawerOptions<T, D extends undefined ? {} : D>
    ): DxDrawerRef<T, R> {
        return new DrawerBuilderForService<T, R>(this.overlay, options).getInstance();
    }
}
