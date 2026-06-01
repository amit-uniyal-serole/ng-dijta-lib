import { Pipe, PipeTransform } from '@angular/core';
import { DxTabComponent } from './tab.component';

@Pipe({
  name: 'dTabCloseablePipe',
})
export class TabCloseablePipe implements PipeTransform {
  transform(tab: DxTabComponent, closeable: boolean, closeableIds: any[]): boolean {
    if (closeable) {
      tab.closeable = !tab.disabled && closeable && (closeableIds.length === 0 || closeableIds.includes(tab.id));
    }
    return closeable ? tab.closeable : false;
  }
}