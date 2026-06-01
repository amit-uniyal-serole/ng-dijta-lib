import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { TabHeaderComponent } from '../tab-header/tab-header.component';

@Component({
  selector: 'dx-tab',
  template: `
    <ng-template>
      <ng-content select="dx-tab-content" t></ng-content>
    <ng-template>
  `
})
export class TabComponent {

  @ViewChild(TemplateRef) public contentTemplate!: TemplateRef<any>;
  @ContentChild(TabHeaderComponent) public itemHeader!: TabHeaderComponent;
  @Input() title: string = '';
  @Input() disabled: boolean = false;
  @Input() isActive: boolean = false;

}
