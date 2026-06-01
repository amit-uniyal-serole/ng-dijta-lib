import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[dTabTitle]',
})
export class NgxTabTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}