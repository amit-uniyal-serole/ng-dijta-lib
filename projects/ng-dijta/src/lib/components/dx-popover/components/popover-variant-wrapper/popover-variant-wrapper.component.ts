import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dx-popover-variant-wrapper',
  templateUrl: './popover-variant-wrapper.component.html',
  styleUrls: ['./popover-variant-wrapper.component.css']
})
export class PopoverVariantWrapperComponent{
  @Input() section!: 'HEADER' | 'CONTENT';
  @Input() popoverContent;
  @Input() popoverTitleConfig;
  @Input() popoverConfigName!:string;
  @Output() onPopoverAction: EventEmitter<any> = new EventEmitter<any>();
  

  public sendDetailData(event:any):void{
    this.onPopoverAction.emit(event)
  }
}