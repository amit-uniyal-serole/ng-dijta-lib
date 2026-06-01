import {
    Directive,
    EmbeddedViewRef,
    Input,
    OnChanges,
    SimpleChange,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { DxSafeAny } from './type/any';


@Directive({
    selector: '[dxStringTemplateOutlet]',
    exportAs: 'dxStringTemplateOutlet'
})
export class DxStringTemplateOutletDirective<_T = unknown> implements OnChanges {
    private embeddedViewRef: EmbeddedViewRef<DxSafeAny> | null = null;
    private context = new DxStringTemplateOutletContext();
    @Input() dxStringTemplateOutletContext: DxSafeAny | null = null;
    @Input() dxStringTemplateOutlet: DxSafeAny | TemplateRef<DxSafeAny> = null;

    static ngTemplateContextGuard<T>(
        _dir: DxStringTemplateOutletDirective<T>,
        _ctx: DxSafeAny
    ): _ctx is DxStringTemplateOutletContext {
        return true;
    }

    private recreateView(): void {
        this.viewContainer.clear();
        const isTemplateRef = this.dxStringTemplateOutlet instanceof TemplateRef;
        const templateRef = (isTemplateRef ? this.dxStringTemplateOutlet : this.templateRef) as DxSafeAny;
        this.embeddedViewRef = this.viewContainer.createEmbeddedView(
            templateRef,
            isTemplateRef ? this.dxStringTemplateOutletContext : this.context
        );
    }

    private updateContext(): void {
        const isTemplateRef = this.dxStringTemplateOutlet instanceof TemplateRef;
        const newCtx = isTemplateRef ? this.dxStringTemplateOutletContext : this.context;
        const oldCtx = this.embeddedViewRef!.context as DxSafeAny;
        if (newCtx) {
            for (const propName of Object.keys(newCtx)) {
                oldCtx[propName] = newCtx[propName];
            }
        }
    }

    constructor(private viewContainer: ViewContainerRef, private templateRef: TemplateRef<DxSafeAny>) { }

    ngOnChanges(changes: SimpleChanges): void {
        const { dxStringTemplateOutletContext, dxStringTemplateOutlet } = changes;
        const shouldRecreateView = (): boolean => {
            let shouldOutletRecreate = false;
            if (dxStringTemplateOutlet) {
                if (dxStringTemplateOutlet.firstChange) {
                    shouldOutletRecreate = true;
                } else {
                    const isPreviousOutletTemplate = dxStringTemplateOutlet.previousValue instanceof TemplateRef;
                    const isCurrentOutletTemplate = dxStringTemplateOutlet.currentValue instanceof TemplateRef;
                    shouldOutletRecreate = isPreviousOutletTemplate || isCurrentOutletTemplate;
                }
            }
            const hasContextShapeChanged = (ctxChange: SimpleChange): boolean => {
                const prevCtxKeys = Object.keys(ctxChange.previousValue || {});
                const currCtxKeys = Object.keys(ctxChange.currentValue || {});
                if (prevCtxKeys.length === currCtxKeys.length) {
                    for (const propName of currCtxKeys) {
                        if (prevCtxKeys.indexOf(propName) === -1) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return true;
                }
            };
            const shouldContextRecreate =
                dxStringTemplateOutletContext && hasContextShapeChanged(dxStringTemplateOutletContext);
            return shouldContextRecreate || shouldOutletRecreate;
        };

        if (dxStringTemplateOutlet) {
            this.context.$implicit = dxStringTemplateOutlet.currentValue;
        }

        const recreateView = shouldRecreateView();
        if (recreateView) {
            /** recreate view when context shape or outlet change **/
            this.recreateView();
        } else {
            /** update context **/
            this.updateContext();
        }
    }
}

export class DxStringTemplateOutletContext {
    public $implicit: DxSafeAny;
}