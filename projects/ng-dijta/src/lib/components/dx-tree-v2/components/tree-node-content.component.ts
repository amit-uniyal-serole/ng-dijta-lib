import { Component, Input, ViewEncapsulation, TemplateRef, OnInit } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
export interface customIconClr { color: string }
@Component({
  selector: 'tree-node-content',
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="tree-node-content-wrapper">
  <ng-container *treeMobxAutorun="{ dontDetach: true }">
  <ng-container >
      <span
        *ngIf="node.hasChildren && !node.hideExpansionIcon"
        [class.toggle-children-wrapper-expanded]="node.isExpanded"
        [class.toggle-children-wrapper-collapsed]="node.isCollapsed"
        class="toggle-children-wrapper"
        (click)="node.mouseAction('expanderClick', $event)"
      >
      <span class="material-icons">
     {{node?.isExpanded?'indeterminate_check_box':'add_box'}} 
      </span>
      </span>
      <span *ngIf="!node.hasChildren && node.hideExpansionIcon" class="toggle-children-placeholder">
      </span>
      </ng-container>
      
    </ng-container>
    <span class="content-label-wrapper">
    <span class="material-icons toggle-children-wrapper" *ngIf="node?.icon" [ngStyle]="iconColor(node?.iconColor)" >
     {{node?.icon}}
    </span>
  <span *ngIf="!template" class="tree-content-label">{{ node.displayField }}</span>
  </span>
  <ng-container
    [ngTemplateOutlet]="template"
    [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index }">
  </ng-container>
  </div>`,
})
export class TreeNodeContent {
  @Input() node!: TreeNode;
  @Input() index!: number;
  @Input() template!: TemplateRef<any>;
  iconColor(iconClr: string): customIconClr {
    let customColor: customIconClr = {
      color: iconClr
    }
    return customColor;
  }
}
