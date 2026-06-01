import * as lodash from 'lodash';
import { SortOrder } from './array.interface';

export class ArrayUtil {

    /**
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // sort by `user` in ascending order and by `age` in descending order
     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     *
     * // sort by `user` in ascending order and by `age` in descending order
     * _.orderBy(users, ['user', 'age'], [true, false]);
     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */
    static orderBy<T>(arr: Array<T>,
                      fields: keyof T | Array<keyof T> = [],
                      order: SortOrder | Array<SortOrder> = ['asc']): Array<T> {
        const tmpFields: Array<keyof T> = Array.isArray(fields)
            ? fields
            : [fields];
        const tmpOrders: Array<SortOrder> = Array.isArray(order)
            ? order
            : [order];

        return lodash.orderBy(arr, tmpFields, tmpOrders);
    }

    static groupBy<T, R>(array: Array<T>, keyExtractor: (item: T) => R): Map<R, Array<T>> {
        const map: Map<R, Array<T>> = new Map();
        if (Array.isArray(array)) {
            array.forEach((item: T) => {
                const key: R = keyExtractor(item);
                const collection: Array<T> = map.get(key) ?? [];
                if (!collection) {
                    map.set(key, [item]);
                } else {
                    collection.push(item);
                }
            });
        }

        return map;
    }
}
