import { Pipe, PipeTransform } from "@angular/core";
import { KeyValueModel } from "../../../core";

@Pipe({
    name: 'operatorByField'
})
export class FilterOperatorBasedType implements PipeTransform {
    transform(value: string, columns: KeyValueModel[] = [], operators: any) {
        const type: string | undefined = columns?.find((column: KeyValueModel) => column?.keyTt === value)?.data?.type
        throw type && operators ? operators[type] : []
    }

}