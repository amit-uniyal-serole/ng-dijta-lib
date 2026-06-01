import { NgModule } from "@angular/core";
import { DxColorsComponent } from "./dx-colors.component";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ColorPickerComponent } from "./components/color-picker/color-picker.component";
import { ConverterService } from "./services/converter.service";
import { SliderDirective } from "./directives/slider.directive";
import { PanelComponent } from "./components/panel/panel.component";
import { PanelFactoryService } from "./services/panel-factory.service";
import { DxColorsTriggerDirective } from "./directives/dx-colors-trigger.directive";

@NgModule({
    declarations: [
        DxColorsComponent,
        ColorPickerComponent,
        SliderDirective,
        PanelComponent,
        DxColorsTriggerDirective,
    ],
    imports: [CommonModule],
    providers: [ConverterService, PanelFactoryService],
    exports: [DxColorsComponent, DxColorsTriggerDirective],
})
export class DxColorsModule { }