import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DxLoaderComponent } from "./dx-loader.component";
import { SafeHtmlPipe } from "./safe-html.pipe";
import { DxLoaderConfig, DX_SPINNER_CONFIG } from "./config";

@NgModule({
  imports: [CommonModule],
  declarations: [DxLoaderComponent, SafeHtmlPipe],
  exports: [DxLoaderComponent],
})
export class DxLoaderModule {
  static forRoot(
    config?: DxLoaderConfig
  ): ModuleWithProviders<DxLoaderModule> {
    return {
      ngModule: DxLoaderModule,
      providers: [{ provide: DX_SPINNER_CONFIG, useValue: config }],
    };
  }
}
