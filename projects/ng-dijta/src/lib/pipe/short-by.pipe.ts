import { Pipe, PipeTransform } from "@angular/core";
import { sortBy } from 'lodash';

@Pipe({
    name: 'shortBy',
    standalone: true,
})
export class ShortBy<T> implements PipeTransform {

    transform(list: T[], by: string): T[] {
        if (!!by) {
            return sortBy(list, by);
        }
        return list;
    }

}