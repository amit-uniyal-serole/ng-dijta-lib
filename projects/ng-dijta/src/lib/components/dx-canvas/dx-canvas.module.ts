import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslocoModule } from '@ngneat/transloco';
import { CoreUiModule } from '../../core/UI/core-ui.module';
import { DxAutocompleteSelectModule } from '../dx-autocomplete-select/dx-autocomplete-select.module';
import { FlexTableModule } from '../dx-table/dx-table.module';
import { DxCanvasFieldWrapperComponent } from './components/dx-canvas-field-wrapper/dx-canvas-field-wrapper.component';
import { DxCanvasLabelValueWrapperComponent } from './components/dx-canvas-label-value-wrapper/dx-canvas-label-value-wrapper.component';
import { DxCanvasLayoutWrapperComponent } from './components/dx-canvas-layout-wrapper/dx-canvas-layout-wrapper.component';
import { DxCanvasOneComponent } from './components/dx-canvas-one/dx-canvas-one.component';
import { DxCanvasThreeComponent } from './components/dx-canvas-three/dx-canvas-three.component';
import { DxCanvasTwoComponent } from './components/dx-canvas-two/dx-canvas-two.component';
import { DxCanvasComponent } from './components/dx-canvas.component';

@NgModule({
  declarations: [
    DxCanvasComponent,
    DxCanvasFieldWrapperComponent,
    DxCanvasLabelValueWrapperComponent,
    DxCanvasOneComponent,
    DxCanvasTwoComponent,
    DxCanvasThreeComponent,
    DxCanvasLayoutWrapperComponent,
  ],
  imports: [
    CommonModule,
    FlexTableModule,
    CoreUiModule,
    FormsModule,
    DxAutocompleteSelectModule,
    MatSlideToggleModule,
    TranslocoModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    DxCanvasComponent,
    DxCanvasFieldWrapperComponent,
    DxCanvasLabelValueWrapperComponent,
    DxCanvasOneComponent,
    DxCanvasTwoComponent,
    DxCanvasThreeComponent,
    DxCanvasLayoutWrapperComponent,
  ],
})
export class DxCanvasModule { }
