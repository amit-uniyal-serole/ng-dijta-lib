import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { TabHeaderComponent } from '../tab-header/tab-header.component';

@Component({
  selector: 'dx-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {

  @ViewChild(TemplateRef) public contentTemplate!: TemplateRef<any>;
  @ContentChild(TabHeaderComponent) public itemHeader!: TabHeaderComponent;
  @Input() title: string = '';
  @Input() disabled: boolean = false;
  @Input() isActive: boolean = false;
  constructor() { }

}
