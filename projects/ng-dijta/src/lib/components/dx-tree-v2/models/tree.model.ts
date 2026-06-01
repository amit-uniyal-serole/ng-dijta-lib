import { Injectable, OnDestroy } from '@angular/core';
import { observable, computed, action, autorun } from 'mobx';
import { Subscription } from 'rxjs';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';
import { TreeVirtualScroll } from './tree-virtual-scroll.model';
import { ITreeModel, IDType, IDTypeDictionary } from '../defs/api';
import { TREE_EVENTS } from '../constants/events';
import { TreeEvent } from '../dx-tree-v2.component';

@Injectable()
export class TreeModel implements ITreeModel, OnDestroy {
  static focusedTree: any = null;

  options: TreeOptions | undefined | any = new TreeOptions();
  nodes!: any[];
  eventNames = Object.keys(TREE_EVENTS);
  virtualScroll!: TreeVirtualScroll;

  @observable roots!: TreeNode[];
  @observable expandedNodeIds: IDTypeDictionary = {};
  @observable selectedLeafNodeIds: IDTypeDictionary = {};
  @observable activeNodeIds: IDTypeDictionary = {};
  @observable hiddenNodeIds: IDTypeDictionary = {};
  @observable focusedNodeId: IDType | null = null;
  @observable virtualRoot!: TreeNode;

  private firstUpdate = true;
  private events: any;
  private subscriptions: Subscription[] = [];

  // events
  fireEvent(event: TreeEvent): void {
    event.treeModel = this;
    this.events[event?.eventName]?.emit(event);
    this.events?.event?.emit(event);
  }

  subscribe(eventName: any, fn: any): void {
    const subscription = this.events[eventName]?.subscribe(fn);
    this.subscriptions.push(subscription);
  }


  // getters
  getFocusedNode(): TreeNode {
    return this.focusedNode;
  }


  getActiveNode(): TreeNode {
    return this.activeNodes[0];
  }

  getActiveNodes(): TreeNode[] {
    return this.activeNodes;
  }

  getVisibleRoots(): any {
    return this.virtualRoot.visibleChildren;
  }

  getFirstRoot(skipHidden = false): any {
    const root = skipHidden ? this.getVisibleRoots() : this.roots;
    return root != null && root.length ? root[0] : null;
  }

  getLastRoot(skipHidden = false): any {
    const root = skipHidden ? this.getVisibleRoots() : this.roots;
    return root != null && root.length ? root[root.length - 1] : null;
  }

  get isFocused(): boolean {
    return TreeModel.focusedTree === this;
  }

  isNodeFocused(node: TreeNode): boolean {
    return this.focusedNode === node;
  }

  isEmptyTree(): boolean {
    return this.roots && this.roots.length === 0;
  }

  @computed get focusedNode(): any {
    return this.focusedNodeId ? this.getNodeById(this.focusedNodeId) : null;
  }

  @computed get expandedNodes(): any {
    const nodes = Object.keys(this.expandedNodeIds)
      .filter((id) => this.expandedNodeIds[id])
      .map((id) => this.getNodeById(id));

    return nodes.filter(Boolean);
  }

  @computed get activeNodes(): any {
    const nodes = Object.keys(this.activeNodeIds)
      .filter((id) => this.activeNodeIds[id])
      .map((id) => this.getNodeById(id));

    return nodes.filter(Boolean);
  }

  @computed get hiddenNodes(): any {
    const nodes = Object.keys(this.hiddenNodeIds)
      .filter((id) => this.hiddenNodeIds[id])
      .map((id) => this.getNodeById(id));

    return nodes.filter(Boolean);
  }

  @computed get selectedLeafNodes(): any {
    const nodes = Object.keys(this.selectedLeafNodeIds)
      .filter((id) => this.selectedLeafNodeIds[id])
      .map((id) => this.getNodeById(id));

    return nodes.filter(Boolean);
  }

  // locating nodes
  getNodeByPath(path: any[], startNode: any = null): TreeNode | any {
    if (!path) return null;

    startNode = startNode || this.virtualRoot;
    if (path.length === 0) return startNode;

    if (!startNode.children) return null;

    const childId = path.shift();
    const childNode = startNode.children.find((c: any) => c.id === childId);

    if (!childNode) return null;

    return this.getNodeByPath(path, childNode);
  }

  getNodeById(id: IDType) {
    const idStr = id.toString();

    return this.getNodeBy((node: TreeNode) => node?.id?.toString() === idStr);
  }

  getNodeBy(predicate: any, startNode: any = null): any {
    startNode = startNode || this.virtualRoot;

    if (!startNode.children) return null;

    const found = startNode.children.find(predicate);

    if (found) { // found in children
      return found;
    } else { // look in children's children
      for (let child of startNode.children) {
        const foundInChildren = this.getNodeBy(predicate, child);
        if (foundInChildren) return foundInChildren;
      }
    }
  }

  isExpanded(node: TreeNode): boolean {
    return this.expandedNodeIds[node.id];
  }

  isHidden(node: TreeNode): boolean {
    return this.hiddenNodeIds[node.id];
  }

  isActive(node: TreeNode): boolean {
    return this.activeNodeIds[node.id];
  }

  isSelected(node: TreeNode): boolean {
    return this.selectedLeafNodeIds[node.id];
  }

  ngOnDestroy(): void {
    this.dispose();
    this.unsubscribeAll();
  }

  dispose(): void {
    // Dispose reactions of the replaced nodes
    if (this.virtualRoot) {
      this.virtualRoot.dispose();
    }
  }

  unsubscribeAll(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription?.unsubscribe());
    this.subscriptions = [];
  }

  // actions
  @action setData({ nodes, options = null, events = null }: { nodes: any, options: any, events: any }): void {
    if (options) {
      this.options = new TreeOptions(options);
    }
    if (events) {
      this.events = events;
    }
    if (nodes) {
      this.nodes = nodes;
    }

    this.update();
  }

  @action update(): void {
    // Rebuild tree:
    let virtualRootConfig = {
      id: this.options.rootId,
      virtual: true,
      [this.options.childrenField]: this.nodes
    };

    this.dispose();

    this.virtualRoot = new TreeNode(virtualRootConfig, null, this, 0);

    this.roots = this.virtualRoot?.children;

    // Fire event:
    if (this.firstUpdate) {
      if (this.roots) {
        this.firstUpdate = false;
        this._calculateExpandedNodes();
      }
    } else {
      this.fireEvent({ eventName: TREE_EVENTS?.updateData });
    }
  }


  @action setFocusedNode(node: TreeNode | any): void {
    this.focusedNodeId = node ? node.id : null;
  }

  @action setFocus(value: boolean | null): void {

    TreeModel.focusedTree = value ? this : null;
  }

  @action doForAll(fn: any): void {
    this.roots.forEach((root: any) => root?.doForAll(fn));
  }

  @action focusNextNode(): void {
    let previousNode: TreeNode = this.getFocusedNode();
    let nextNode: TreeNode = previousNode ? previousNode?.findNextNode(true, true) : this.getFirstRoot(true);
    if (nextNode) nextNode?.focus();
  }

  @action focusPreviousNode(): void {
    let previousNode: TreeNode = this.getFocusedNode();
    let nextNode: TreeNode = previousNode ? previousNode?.findPreviousNode(true) : this.getLastRoot(true);
    if (nextNode) nextNode?.focus();
  }

  @action focusDrillDown(): void {
    let previousNode: TreeNode = this.getFocusedNode();
    if (previousNode && previousNode?.isCollapsed && previousNode?.hasChildren) {
      previousNode?.toggleExpanded();
    }
    else {
      let nextNode: TreeNode = previousNode ? previousNode?.getFirstChild(true) : this.getFirstRoot(true);
      if (nextNode) nextNode.focus();
    }
  }

  @action focusDrillUp(): void {
    let previousNode: TreeNode = this.getFocusedNode();
    if (!previousNode) return;
    if (previousNode.isExpanded) {
      previousNode.toggleExpanded();
    }
    else {
      let nextNode: TreeNode | null = previousNode.realParent;
      if (nextNode) nextNode?.focus();
    }
  }

  @action setActiveNode(node: TreeNode, value: IDType, multi = false): void {
    if (multi) {
      this._setActiveNodeMulti(node, value);
    }
    else {
      this._setActiveNodeSingle(node, value);
    }

    if (value) {
      node?.focus(this.options.scrollOnActivate);
      this.fireEvent({ eventName: TREE_EVENTS.activate, node });
      this.fireEvent({ eventName: TREE_EVENTS.nodeActivate, node }); // For IE11
    } else {
      this.fireEvent({ eventName: TREE_EVENTS.deactivate, node });
      this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node }); // For IE11
    }
  }

  @action setSelectedNode(node: TreeNode, value: IDType): void {
    this.selectedLeafNodeIds = Object.assign({}, this.selectedLeafNodeIds, { [node.id]: value });

    if (value) {
      node.focus();
      this.fireEvent({ eventName: TREE_EVENTS.select, node });
    } else {
      this.fireEvent({ eventName: TREE_EVENTS.deselect, node });
    }
  }

  @action setExpandedNode(node: TreeNode, value: boolean): void {
    this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, { [node.id]: value });
    this.fireEvent({ eventName: TREE_EVENTS.toggleExpanded, node, isExpanded: value });
  }

  @action expandAll(): void {
    this.roots?.forEach((root: TreeNode) => root?.expandAll());
  }

  @action collapseAll(): void {
    this.roots?.forEach((root: TreeNode) => root?.collapseAll());
  }

  @action setIsHidden(node: TreeNode, value: IDType): void {
    this.hiddenNodeIds = Object.assign({}, this.hiddenNodeIds, { [node.id]: value });
  }

  @action setHiddenNodeIds(nodeIds: any[]): void {
    this.hiddenNodeIds = nodeIds.reduce((hiddenNodeIds: any, id: any) => Object.assign(hiddenNodeIds, {
      [id]: true
    }), {});
  }

  performKeyAction(node: TreeNode, $event: any): boolean {
    const keyAction = this.options.actionMapping.keys[$event.keyCode];
    if (keyAction) {
      $event.preventDefault();
      keyAction(this, node, $event);
      return true;
    } else {
      return false;
    }
  }

  @action filterNodes(filter: any, autoShow = true): void {
    let filterFn: any;

    if (!filter) {
      return this.clearFilter();
    }

    // support function and string filter
    if (filter && typeof filter.valueOf() === 'string') {
      filterFn = (node: TreeNode) => node.displayField.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    }
    else if (filter && typeof filter === 'function') {
      filterFn = filter;
    }
    else {
      console.error('Don\'t know what to do with filter', filter);
      console.error('Should be either a string or function');
      return;
    }

    const ids = {};
    this.roots.forEach((node: TreeNode) => this._filterNode(ids, node, filterFn, autoShow));
    this.hiddenNodeIds = ids;
    this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
  }

  @action clearFilter(): void {
    this.hiddenNodeIds = {};
    this.fireEvent({ eventName: TREE_EVENTS.changeFilter });
  }

  @action moveNode(node: any, to: any): void {
    const fromIndex: any = node.getIndexInParent();
    const fromParent: TreeNode = node.parent;

    if (!this.canMoveNode(node, to, fromIndex)) return;

    const fromChildren: TreeNode[] = fromParent.getField('children');

    // If node doesn't have children - create children array
    if (!to.parent.getField('children')) {
      to.parent.setField('children', []);
    }
    const toChildren: any = to.parent.getField('children');

    const originalNode: TreeNode = fromChildren?.splice(fromIndex, 1)[0];

    // Compensate for index if already removed from parent:
    let toIndex: number = (fromParent === to.parent && to?.index > fromIndex) ? to.index - 1 : to.index;

    toChildren?.splice(toIndex, 0, originalNode);

    fromParent?.treeModel.update();
    if (to?.parent?.treeModel !== fromParent?.treeModel) {
      to?.parent?.treeModel?.update();
    }

    this.fireEvent({
      eventName: TREE_EVENTS.moveNode,
      node: originalNode,
      to: { parent: to.parent.data, index: toIndex },
      from: { parent: fromParent.data, index: fromIndex }
    });
  }

  @action copyNode(node: any, to: any): void {
    const fromIndex: any = node.getIndexInParent();

    if (!this.canMoveNode(node, to, fromIndex)) return;

    // If node doesn't have children - create children array
    if (!to.parent.getField('children')) {
      to.parent.setField('children', []);
    }
    const toChildren: any = to.parent.getField('children');

    const nodeCopy: TreeNode = this.options.getNodeClone(node);

    toChildren.splice(to.index, 0, nodeCopy);

    node.treeModel.update();
    if (to.parent.treeModel !== node.treeModel) {
      to.parent.treeModel.update();
    }

    this.fireEvent({ eventName: TREE_EVENTS.copyNode, node: nodeCopy, to: { parent: to.parent.data, index: to.index } });
  }

  getState(): any {
    return {
      expandedNodeIds: this.expandedNodeIds,
      selectedLeafNodeIds: this.selectedLeafNodeIds,
      activeNodeIds: this.activeNodeIds,
      hiddenNodeIds: this.hiddenNodeIds,
      focusedNodeId: this.focusedNodeId
    };
  }

  @action setState(state: any) {
    if (!state) return;

    Object.assign(this, {
      expandedNodeIds: state.expandedNodeIds || {},
      selectedLeafNodeIds: state.selectedLeafNodeIds || {},
      activeNodeIds: state.activeNodeIds || {},
      hiddenNodeIds: state.hiddenNodeIds || {},
      focusedNodeId: state.focusedNodeId
    });
  }

  subscribeToState(fn: any) {
    autorun(() => fn(this.getState()));
  }

  canMoveNode(node: any, to: any, fromIndex = undefined): boolean {
    const fromNodeIndex: number = fromIndex || node.getIndexInParent();

    // same node:
    if (node.parent === to?.parent && fromIndex === to?.index) {
      return false;
    }

    return !to?.parent?.isDescendantOf(node);
  }

  calculateExpandedNodes(): void {
    this._calculateExpandedNodes();
  }

  // private methods
  private _filterNode(ids: any, node: TreeNode, filterFn: any, autoShow: any): any {
    // if node passes function then it's visible
    let isVisible = filterFn(node);

    if (node.children) {
      // if one of node's children passes filter then this node is also visible
      node.children.forEach((child: any) => {
        if (this._filterNode(ids, child, filterFn, autoShow)) {
          isVisible = true;
        }
      });
    }

    // mark node as hidden
    if (!isVisible) {
      ids[node.id] = true;
    }
    // auto expand parents to make sure the filtered nodes are visible
    if (autoShow && isVisible) {
      node.ensureVisible();
    }
    return isVisible;
  }

  private _calculateExpandedNodes(startNode: any = null): void {
    startNode = startNode || this.virtualRoot;

    if (startNode.data[this.options.isExpandedField]) {
      this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, { [startNode.id]: true });
    }
    if (startNode.children) {
      startNode.children.forEach((child: any) => this._calculateExpandedNodes(child));
    }
  }

  private _setActiveNodeSingle(node: TreeNode, value: IDType) {
    // Deactivate all other nodes:
    this.activeNodes
      .filter((activeNode: TreeNode) => activeNode !== node)
      .forEach((activeNode: TreeNode) => {
        this.fireEvent({ eventName: TREE_EVENTS.deactivate, node: activeNode });
        this.fireEvent({ eventName: TREE_EVENTS.nodeDeactivate, node: activeNode }); // For IE11
      });

    if (value) {
      this.activeNodeIds = { [node.id]: true };
    }
    else {
      this.activeNodeIds = {};
    }
  }

  private _setActiveNodeMulti(node: TreeNode, value: IDType) {
    this.activeNodeIds = Object.assign({}, this.activeNodeIds, { [node.id]: value });
  }

}
