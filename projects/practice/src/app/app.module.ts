import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { provideRouter, RouterModule, RouterOutlet } from "@angular/router";
import { Ability, createMongoAbility, PureAbility } from "@casl/ability";
import { AbilityModule } from "@casl/angular";
import { DxAutocompleteSelectModule, DxButtonModule, DxCardModule, DxCheckboxModule, DxDrawerModule, DxDualListboxModule, DxHeaderModule, DxLayoutModule, DxNotificationModule, DxNumberModule, DxRadioButtonModule, DxTabGroupModule, DxToggleModule, FlexTableModule, LocalizedNumberFormatDirective, LocalizedNumberPipe, UI_COMPONENT_CONFIG, UIConfigWrapper, DxSelectModule, DxInputPhoneModule, DxChipAutocompleteModule, DxChipSelectModule, DxServerSideAutocompleteModule, DxTagInputModule, DxImageUploadModule, DxCoordinatesModule, DxDatepickerModule, DxDaterangeModule, DxDatetimePickerModule, DxInputUrlModule, DxTextareaModule, DxCriteriaFilterModule, ToastrModule, DxActivityCalendarComponent, DxActivityCalendarModule, DxTimepickerModule } from "projects/ng-dijta/src/public-api";
import { TranslocoRootModule } from "./transloco-root.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { routes } from "./app.routes";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { DxInputModule } from "../../../ng-dijta/src/lib/components/dx-input/dx-input.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideNgxMask } from 'ngx-mask';
import { DxCurrencyModule } from "../../../ng-dijta/src/lib/components/dx-currency/dx-currency.module";
import { Input } from "./pages/input/input";
import { Card } from "./pages/card/card";
import { Table } from "./pages/table/table";
import { Button } from "./pages/button/button";
import { Expansion } from "./pages/expansion/expansion";
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { AuthorizationInterceptor } from "./auth-interceptor";
import { Criteria } from "./pages/criteria/criteria";
import { Calendar } from "./pages/calendar/calendar";
import { DxColorPaletteModule } from "projects/ng-dijta/src/lib/foundation/dx-color-palette/dx-color-palette.module";
import { DxTypeScaleModule } from "projects/ng-dijta/src/lib/foundation/dx-type-scale/dx-type-scale.module";
import { DxSpacingModule } from "projects/ng-dijta/src/lib/foundation/dx-spacing/dx-spacing.module";
import { DxBorderRadiusModule } from "projects/ng-dijta/src/lib/foundation/dx-border-radius/dx-border-radius.module";
import { DxShadowModule } from "projects/ng-dijta/src/lib/foundation/dx-shadow/dx-shadow.module";
import { DxZIndexModule } from "projects/ng-dijta/src/lib/foundation/dx-z-index/dx-z-index.module";
import { DxIconModule } from "projects/ng-dijta/src/lib/foundation/dx-icon/dx-icon.module";
import { PreviewComponent } from "./pages/preview/preview.component";


@NgModule({
    declarations: [
        AppComponent,
        Input,
        Card,
        Table,
        Button,
        Expansion,
        Criteria,
        Calendar,
        PreviewComponent,
    ],
    imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatIconModule,
    TranslocoRootModule,
    DxLayoutModule,
    DxHeaderModule,
    AbilityModule,
    BrowserAnimationsModule,
    DxNotificationModule,
    FlexTableModule,
    MatDialogModule,
    DxInputModule,
    DxTabGroupModule,
    FormsModule,
    ReactiveFormsModule,
    DxDrawerModule,
    DxButtonModule,
    DxDualListboxModule,
    DxCardModule,
    DxCheckboxModule,
    DxAutocompleteSelectModule,
    DxToggleModule,
    DxRadioButtonModule,
    LocalizedNumberPipe,
    LocalizedNumberFormatDirective,
    DxCurrencyModule,
    DxToggleModule,
    DxNumberModule,
    DxSelectModule,
    DxInputPhoneModule,
    DxChipAutocompleteModule,
    DxChipSelectModule,
    DxServerSideAutocompleteModule,
    DxTagInputModule,
    DxImageUploadModule,
    DxCoordinatesModule,
    DxDatepickerModule,
    DxDaterangeModule,
    DxDatetimePickerModule,
    DxInputUrlModule,
    DxTextareaModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    ClipboardModule,
    DxCriteriaFilterModule,
    DxActivityCalendarModule,
    DxTimepickerModule,
    DxColorPaletteModule,
    DxTypeScaleModule,
    DxSpacingModule,
    DxBorderRadiusModule,
    DxShadowModule,
    DxZIndexModule,
    DxIconModule,
    ToastrModule.forRoot(),
    ],
    providers: [
        provideRouter(routes),
        provideAnimationsAsync(),
        provideNgxMask(),
       {
      provide: Ability,
      useValue: createMongoAbility(),
    },
        { provide: PureAbility, useExisting: Ability },
        
        {
            provide: UI_COMPONENT_CONFIG, useClass: UIConfigWrapper
        },
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorizationInterceptor,
            multi: true,
          }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }