import { BehaviorSubject } from "rxjs";
import { TREE_MODEL, ItemNode } from "./tree.model";

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
export class TreeUtil<T> {
    TREE_DATA!: TREE_MODEL<T>[];
    dataChange: BehaviorSubject<ItemNode<T>[]> = new BehaviorSubject<ItemNode<T>[]>([]);

    get data(): ItemNode<T>[] { return this.dataChange?.value; }

    constructor(private readonly payload: TREE_MODEL<T>[]) {
        if (payload) {
            this.initialize(payload);
        }
    }

    initialize(payload: TREE_MODEL<T>[]): void {
        // Build the tree nodes from Json object. The result is a list of `ItemNode<T>` with nested
        //     file node as children.
        const data: ItemNode<T>[]
            = this.buildFileTree(payload, 0);
        // Notify the change.
        this.dataChange?.next(data);
    }

    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `ItemNode<T>`.
     */
    buildFileTree(arr: TREE_MODEL<T>[], level: number): ItemNode<T>[] {
        return arr?.reduce<ItemNode<T>[]>((accumulator: ItemNode<T>[], currentValue: TREE_MODEL<T>) => {
            const obj: TREE_MODEL<T> = currentValue;
            const node: ItemNode<T> = new ItemNode<T>();
            node.item = obj?.labelTt;
            node.data = obj
            if (obj?.children) {
                node.children = this.buildFileTree(obj?.children, level + 1);
            }
            return accumulator?.concat(node);
        }, []);
    }

    /** Add an item to to-do list */
    insertItem(parent: ItemNode<T>, name: string): ItemNode<T> {
        if (!parent?.children) {
            parent.children = [];
        }
        const newItem: ItemNode<T> = { item: name } as ItemNode<T>;
        parent?.children?.push(newItem);
        this.dataChange?.next(this.data);
        return newItem;
    }

    insertItemAbove(node: ItemNode<T>, name: string): ItemNode<T> {
        const parentNode: ItemNode<T> | null = this.getParentFromNodes(node);
        const newItem: ItemNode<T> = { item: name } as ItemNode<T>;
        if (parentNode) {
            parentNode?.children?.splice(parentNode?.children?.indexOf(node), 0, newItem);
        } else {
            this.data?.splice(this.data?.indexOf(node), 0, newItem);
        }
        this.dataChange?.next(this.data);
        return newItem;
    }

    insertItemBelow(node: ItemNode<T>, name: string): ItemNode<T> {
        const parentNode: ItemNode<T> | null = this.getParentFromNodes(node);
        const newItem: ItemNode<T> = { item: name } as ItemNode<T>;
        if (parentNode) {
            parentNode?.children?.splice(parentNode?.children?.indexOf(node) + 1, 0, newItem);
        } else {
            this.data?.splice(this.data?.indexOf(node) + 1, 0, newItem);
        }
        this.dataChange?.next(this.data);
        return newItem;
    }

    getParentFromNodes(node: ItemNode<T>): ItemNode<T> | null {
        for (let i = 0; i < this.data.length; ++i) {
            const currentRoot: ItemNode<T> = this.data[i];
            const parent: ItemNode<T> | null = this.getParent(currentRoot, node);
            if (parent) {
                return parent;
            }
        }
        return null;
    }

    getParent(currentRoot: ItemNode<T>, node: ItemNode<T>): ItemNode<T> | null {
        if (currentRoot?.children && currentRoot?.children.length > 0) {
            for (let i = 0; i < currentRoot?.children?.length; ++i) {
                const child: ItemNode<T> = currentRoot?.children[i];
                if (child === node) {
                    return currentRoot;
                } else if (child?.children && child?.children?.length > 0) {
                    const parent: ItemNode<T> | null = this.getParent(child, node);
                    if (parent) {
                        return parent;
                    }
                }
            }
        }
        return null;
    }

    updateItem(node: ItemNode<T>, name: string): void {
        node.item = name;
        this.dataChange?.next(this.data);
    }

    deleteItem(node: ItemNode<T>): void {
        this.deleteNode(this.data, node);
        this.dataChange?.next(this.data);
    }

    copyPasteItem(from: ItemNode<T>, to: ItemNode<T>): ItemNode<T> {
        const newItem: ItemNode<T> = this.insertItem(to, from?.item);
        if (from?.children) {
            from?.children?.forEach((child: ItemNode<T>) => {
                this.copyPasteItem(child, newItem);
            });
        }
        return newItem;
    }

    copyPasteItemAbove(from: ItemNode<T>, to: ItemNode<T>): ItemNode<T> {
        const newItem: ItemNode<T> = this.insertItemAbove(to, from?.item);
        if (from?.children) {
            from?.children?.forEach((child: ItemNode<T>) => {
                this.copyPasteItem(child, newItem);
            });
        }
        return newItem;
    }

    copyPasteItemBelow(from: ItemNode<T>, to: ItemNode<T>): ItemNode<T> {
        const newItem: ItemNode<T> = this.insertItemBelow(to, from?.item);
        if (from?.children) {
            from?.children?.forEach((child: ItemNode<T>) => {
                this.copyPasteItem(child, newItem);
            });
        }
        return newItem;
    }

    deleteNode(nodes: ItemNode<T>[], nodeToDelete: ItemNode<T>): void {
        const index: number = nodes?.indexOf(nodeToDelete, 0);
        if (index > -1) {
            nodes?.splice(index, 1);
        } else {
            nodes?.forEach((node: ItemNode<T>) => {
                if (node?.children && node?.children?.length > 0) {
                    this.deleteNode(node?.children, nodeToDelete);
                }
            });
        }
    }
}
