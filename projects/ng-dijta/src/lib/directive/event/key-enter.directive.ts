import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[dxEnterKey]'
})
export class EnterKeyDirective {

  @Output() enterKeyPressed: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('keydown.enter', ['$event']) 
  onEnterPress(event: KeyboardEvent) {
    event.preventDefault(); // Prevent the default action if necessary
    this.enterKeyPressed.emit(); // Emit the event
  }
}
