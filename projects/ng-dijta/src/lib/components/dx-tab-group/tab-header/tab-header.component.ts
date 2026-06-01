import { Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dx-tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabHeaderComponent {
  @ViewChild(TemplateRef) public headerTemplate!: TemplateRef<any>;
  @Input() title: string = '';
  @Input() icon: string | undefined = undefined;
  @Input() tabView: 'top_bottom' | 'line_border_flat_icon' = 'line_border_flat_icon';
  @Input() data:any;
 
}
