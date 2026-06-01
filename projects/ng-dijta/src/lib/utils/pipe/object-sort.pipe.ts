import { Pipe, PipeTransform } from '@angular/core';
import { SortOrder } from '../arrays/array.interface';
import { ArrayUtil } from '../arrays/array.util';

@Pipe({
    name: 'objectSort'
})
export class ObjectSortPipe implements PipeTransform {

    transform<T>(data: Array<T>, field?: keyof T | Array<keyof T>, sortOrder?: SortOrder | Array<SortOrder>): Array<T> {
        return ArrayUtil.orderBy(data, field, sortOrder);
    }
}
