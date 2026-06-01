/**
 * Node for to-do item
 */
export class ItemNode<T> {
    children!: ItemNode<T>[];
    item!: string;
    data?: TREE_MODEL<T>;
}

/** Flat to-do item node with expandable and level information */
export class ItemFlatNode<T> {
    item!: string;
    level!: number;
    expandable!: boolean;
    data?: TREE_MODEL<T>
}

/**
 * The Json object for to-do list data.
 */
export interface TREE_MODEL<T> {
    keyTt: string,
    labelTt: string,
    source?: T;
    matIcon?: string;
    label?: string;
    isActive?: boolean;
    imgSrc?: string;
    isCompleted?: boolean;
    nodeClasses?: string[];
    children?: TREE_MODEL<T>[];
    isParentNode?:boolean;
}