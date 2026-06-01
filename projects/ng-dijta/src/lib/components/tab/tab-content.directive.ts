import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[dTabContent]',
})
export class NgxTabContentDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}