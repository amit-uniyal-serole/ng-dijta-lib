import { DOCUMENT } from '@angular/common';
import { ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { LoadingBackdropComponent } from './loading-backdrop.component';
import { LoadingComponent } from './loading.component';
import { ILoadingOptions } from './loading.types';
import { OverlayContainerRef } from '../../core/overlay-container';
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private renderer: Renderer2;
  document: Document;

  constructor(
    private overlayContainerRef: OverlayContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private doc: any
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.document = this.doc;
  }
  open({
    target = this.document.body,
    backdrop = true,
    message,
    loadingTemplateRef,
    positionType = 'relative',
    view,
    injector,
    zIndex,
    loadingStyle = 'default'
  }: ILoadingOptions = {}) {
    const finalComponentFactoryResolver = this.componentFactoryResolver;

    let positionTypeOld = '';
    positionTypeOld = '' || target['style']['position'];
    let backdropRef: ComponentRef<LoadingBackdropComponent> | any;
    if (backdrop) {
      backdropRef = this.overlayContainerRef.createComponent(
        finalComponentFactoryResolver.resolveComponentFactory(LoadingBackdropComponent),
        injector
      );
      Object.assign(backdropRef.instance, {
        backdrop: backdrop,
        zIndex: zIndex,
        target: target ? target : this.document.body,
      });
      const viewRef = backdropRef.hostView;
      (viewRef as EmbeddedViewRef<any>).rootNodes.forEach((node) => target.appendChild(node));
    }

    const loadingRef = this.overlayContainerRef.createComponent(
      finalComponentFactoryResolver.resolveComponentFactory(LoadingComponent),
      injector
    );

    Object.assign(loadingRef.instance, {
      message: message,
      zIndex: zIndex,
      loadingTemplateRef: loadingTemplateRef,
      top: view ? view.top : '50%',
      left: view ? view.left : '50%',
      isCustomPosition: !!view,
      target: target ? target : this.document.body,
      loadingStyle: loadingStyle
    });

    this.renderer.setStyle(target, 'position', positionType);

    const viewRef1 = loadingRef.hostView;
    (viewRef1 as EmbeddedViewRef<any>).rootNodes.forEach((node) => target.appendChild(node));

    loadingRef.instance.close = () => {
      if (loadingRef) {
        loadingRef.destroy();
      }
      if (backdropRef) {
        backdropRef.destroy();
        backdropRef = null;
      }
      this.renderer.setStyle(target, 'position', positionTypeOld);
    };

    return {
      loadingInstance: loadingRef.instance,
      backdropInstance: backdropRef ? backdropRef.instance : null,
    };
  }
}
