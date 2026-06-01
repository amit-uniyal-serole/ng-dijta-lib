import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { TreeModel, TreeNode } from './angular-tree-component.module';

import { ITreeNode, ITreeOptions } from './defs/api';
export interface TreeEvent {
  eventName?: any,
  node?: TreeNode,
  treeModel?: TreeModel,
  isExpanded?: boolean,
  to?: any,
  from?: any
}


@Component({
  selector: 'dx-tree-v2',
  templateUrl: './dx-tree-v2.component.html',
  styleUrls: ['./dx-tree-v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DxTreeV2Component {
  @Input() nodes!: ITreeNode;
  @Input() options!: ITreeOptions;
  @Input() showLine: boolean = false
  @Output() onToggleExpanded: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onActivate: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onDeactivate: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onNodeActivate: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onNodeDeactivate: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onSelect: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onDeselect: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onFocus: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onBlur: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onUpdateData: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onInitialized: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onMoveNode: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onCopyNode: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onLoadNodeChildren: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onChangeFilter: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onEvent: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();
  @Output() onStateChange: EventEmitter<TreeEvent> = new EventEmitter<TreeEvent>();

  fireEvent(event: TreeEvent): void {
    const eventName: string = event && event.eventName;
    if (eventName && typeof eventName === 'string') {
      const emitEventName: string = 'on' + (eventName.charAt(0).toUpperCase() + eventName.slice(1));
      if (<TreeEvent>this[emitEventName]) this[emitEventName].emit(event);
    }
  }

}
