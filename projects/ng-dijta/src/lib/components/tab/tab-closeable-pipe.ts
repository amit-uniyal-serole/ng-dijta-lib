import { Pipe, PipeTransform } from '@angular/core';
import { NgxTabComponent } from './tab.component';

@Pipe({
  name: 'dTabCloseablePipe',
})
export class NgxTabCloseablePipe implements PipeTransform {
  transform(tab: NgxTabComponent, closeable: boolean, closeableIds: any[]): boolean {
    if (closeable) {
      tab.closeable = !tab.disabled && closeable && (closeableIds.length === 0 || closeableIds.includes(tab.id));
    }
    return closeable ? tab.closeable : false;
  }
}