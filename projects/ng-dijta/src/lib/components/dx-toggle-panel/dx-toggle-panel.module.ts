import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxTogglePanelComponent } from './dx-toggle-panel.component';

@NgModule({
  declarations: [
    DxTogglePanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[DxTogglePanelComponent]
})
export class DxTogglePanelModule { }
