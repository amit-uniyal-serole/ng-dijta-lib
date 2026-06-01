import { Component, Input, OnInit } from '@angular/core';
import { NavigationMenu } from '../../../../core/animation/animation-consts';
import { TOOLTIP_POSTION } from '../../model/dx-navigation-menu.model';

@Component({
  selector: 'dx-menu-accordian',
  templateUrl: './dx-menu-accordian.component.html',  
  animations:NavigationMenu.EXPAND_COLLAPSE
})
export class DxMenuAccordianComponent implements OnInit {
  @Input() title!: string;
  @Input()showContent: boolean = false;
  @Input() showTooltip!:boolean;
  @Input() tooltipPosition!:TOOLTIP_POSTION;
  @Input() hideArrows:boolean=false;
  constructor() {}

  ngOnInit(): void {}
  toggleContent(): void {
    this.showContent = !this.showContent;
  }

}
