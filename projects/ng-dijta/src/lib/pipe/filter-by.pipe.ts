import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filterBy',
    standalone: true,
})
export class FilterBy<T> implements PipeTransform {

    transform(list: T[], key: string, value: string | number, isEqual: boolean = true): T[] {

        if (!!key && !!value) {
            return (list ?? []).filter((item: T) => {
                if (!isEqual) {
                    return item[key] !== value
                }
                return item[key] === value
            });
        }
        return list;
    }

}