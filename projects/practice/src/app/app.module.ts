import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { provideRouter, RouterOutlet } from "@angular/router";
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
import { AuthorizationInterceptor } from "./auth-interceptor";
import { Criteria } from "./pages/criteria/criteria";
import { Calendar } from "./pages/calendar/calendar";


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
    ],
    imports: [
    RouterOutlet,
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
    DxCriteriaFilterModule,
    DxActivityCalendarModule,
    DxTimepickerModule,
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