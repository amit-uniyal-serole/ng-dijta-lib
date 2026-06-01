import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'dxtooltipList', standalone: true })
export class DxTooltipListPipe implements PipeTransform {

    transform(lines: string[]): string {
        let list: string = '';
        lines.forEach((line: string, i: number) => {
            list += `${i + 1}. ` + line + '\n';
        });
        return list;
    }
}