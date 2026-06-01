import {
  Directive,
  ViewContainerRef,
  TemplateRef,
  OnInit,
  OnDestroy,
  Input,
  EmbeddedViewRef
} from '@angular/core';
import { autorun } from 'mobx';

@Directive({ selector: '[treeMobxAutorun]' })
export class TreeMobxAutorunDirective implements OnInit, OnDestroy {
  protected templateBindings = {};
  protected dispose: any;
  protected view!: EmbeddedViewRef<any>;
  @Input() treeMobxAutorun!: any;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.view = this.viewContainer?.createEmbeddedView(this.templateRef);

    if (this.dispose) {
      this.dispose();
    }

    if (this.shouldDetach()) {
      this.view.detach();
    }
    this.autoDetect(this.view);
  }

  shouldDetach(): any {
    return this.treeMobxAutorun && this.treeMobxAutorun.detach;
  }

  autoDetect(view: EmbeddedViewRef<any>): void {
    this.dispose = autorun(() => view.detectChanges());
  }

  ngOnDestroy(): void {
    if (this.dispose) {
      this.dispose();
    }
  }
}
