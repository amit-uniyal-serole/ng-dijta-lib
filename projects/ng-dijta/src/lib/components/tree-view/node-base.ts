import { CdkTreeNode } from '@angular/cdk/tree';

export abstract class DxNodeBase<T> extends CdkTreeNode<T> {
  abstract setIndents(indents: boolean[]): void;
  abstract isLeaf: boolean;
}