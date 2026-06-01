import { Component, ContentChild, EventEmitter, HostListener, Input, OnChanges, Output, TemplateRef, ViewChild } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeOptions } from '../models/tree-options.model';
import { ITreeOptions } from '../defs/api';
import { TreeViewportComponent } from './tree-viewport.component';

@Component({
  selector: 'Tree, tree-root',
  providers: [TreeModel],
  styles: [],
  template: `
      <tree-viewport #viewport>
          <div
                  class="angular-tree-component"
                  [class.node-dragging]="treeDraggedElement.isDragging()"
                  [class.angular-tree-component-rtl]="treeModel.options.rtl">
              <tree-node-collection
                      *ngIf="treeModel.roots"
                      [nodes]="treeModel.roots"
                      [treeModel]="treeModel"
                      [templates]="{
            loadingTemplate: loadingTemplate,
            treeNodeTemplate: treeNodeTemplate,
            treeNodeWrapperTemplate: treeNodeWrapperTemplate,
            treeNodeFullTemplate: treeNodeFullTemplate
          }">
              </tree-node-collection>
              <tree-node-drop-slot
                      class="empty-tree-drop-slot"
                      *ngIf="treeModel.isEmptyTree()"
                      [dropIndex]="0"
                      [node]="treeModel.virtualRoot">
              </tree-node-drop-slot>
          </div>
      </tree-viewport>
  `
})
export class TreeComponent implements OnChanges {
  _nodes!: any[];
  _options!: TreeOptions;
  treeComponent!: any
  @ContentChild('loadingTemplate', { static: false }) loadingTemplate!: TemplateRef<any>;
  @ContentChild('treeNodeTemplate', { static: false }) treeNodeTemplate!: TemplateRef<any>;
  @ContentChild('treeNodeWrapperTemplate', { static: false }) treeNodeWrapperTemplate!: TemplateRef<any>;
  @ContentChild('treeNodeFullTemplate', { static: false }) treeNodeFullTemplate!: TemplateRef<any>;
  @ViewChild('viewport', { static: false }) viewportComponent!: TreeViewportComponent;

  // Will be handled in ngOnChanges
  @Input() set nodes(nodes: any[]) {
  };

  @Input() set options(options: ITreeOptions) {
  };

  @Input() set focused(value: boolean) {
    this.treeModel.setFocus(value);
  }

  @Input() set state(state: any) {
    this.treeModel.setState(state);
  }

  @Output() toggleExpanded!: boolean;
  @Output() activate: any;
  @Output() deactivate: any;
  @Output() nodeActivate: any;
  @Output() nodeDeactivate: any;
  @Output() select: any;
  @Output() deselect: any;
  @Output() focus: any;
  @Output() blur: any;
  @Output() updateData: any;
  @Output() initialized: any;
  @Output() moveNode: any;
  @Output() copyNode: any;
  @Output() loadNodeChildren: any;
  @Output() changeFilter: any;
  @Output() event: any;
  @Output() stateChange: any;

  constructor(
    public treeModel: TreeModel,
    public treeDraggedElement: TreeDraggedElement) {

    treeModel?.eventNames.forEach((name: any) => this[name] = new EventEmitter());
    treeModel?.subscribeToState((state: any) => this.stateChange?.emit(state));
  }

  @HostListener('body: keydown', ['$event'])
  onKeydown($event: any) {
    if (!this.treeModel.isFocused) return;
    if (document?.activeElement) {
      if (['input', 'textarea'].includes(document?.activeElement.tagName.toLowerCase())) return;
    }

    const focusedNode = this.treeModel.getFocusedNode();

    this.treeModel.performKeyAction(focusedNode, $event);
  }

  @HostListener('body: mousedown', ['$event'])
  onMousedown($event: any) {
    function isOutsideClick(startElement: Element, nodeName: string): any {
      return !startElement ? true : startElement.localName === nodeName ? false : isOutsideClick(startElement?.parentElement!, nodeName);
    }

    if (isOutsideClick($event.target, 'tree-root')) {
      this.treeModel.setFocus(false);
    }
  }

  ngOnChanges(changes: any) {
    if (changes.options || changes.nodes) {
      this.treeModel.setData({
        options: changes.options && changes.options.currentValue,
        nodes: changes.nodes && changes.nodes.currentValue,
        events: this.pick(this, this.treeModel.eventNames)
      });
    }
  }

  sizeChanged() {
    this.viewportComponent.setViewport();
  }

  private pick(object: any, keys: any) {
    return keys.reduce((obj: any, key: any) => {
      if (object && object.hasOwnProperty(key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  }
}
