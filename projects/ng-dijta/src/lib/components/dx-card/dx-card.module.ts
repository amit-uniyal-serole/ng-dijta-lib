import { ClipboardModule } from "@angular/cdk/clipboard";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { TranslocoModule } from "@ngneat/transloco";
import { CoreUiModule } from "../../core/UI/core-ui.module";
import { DxDirectiveModule } from "../../directive";
import { DxButtonModule } from "../dx-button";
import { DxCheckboxModule } from "../dx-checkbox";
import { DxCurrencyModule } from "../dx-currency";
import { DxDatepickerModule } from "../dx-datepicker";
import { FilePickerModule } from "../dx-image-upload/core/file-picker.module";
import { DxPopoverModule } from "../dx-popover";
import { DxTagInputModule } from "../dx-tag-input/dx-tag-input.module";
import { DxToggleModule } from "../dx-toggle";
import { DxToolTipModule } from "../dx-tooltip/dx-tooltip.module";
import { ImagePreviewModule } from "../image-preview";
import { DxCardAccordianContentComponent } from './core/dx-card-accordian-content/dx-card-accordian-content.component';
import { DxCardAccordianComponent } from './core/dx-card-accordian/dx-card-accordian.component';
import { DxCardActionComponent } from './core/dx-card-action/dx-card-action.component';
import { DxCardCheckboxComponent } from './core/dx-card-checkbox/dx-card-checkbox.component';
import { DxCardCurrencyComponent } from './core/dx-card-currency/dx-card-currency.component';
import { DxCardDateComponent } from './core/dx-card-date/dx-card-date.component';
import { DxCardDateTimeComponent } from "./core/dx-card-date/dx-card-datetime.component";
import { DxCardDescriptionComponent } from './core/dx-card-description/dx-card-description.component';
import { DxCardEmailComponent } from './core/dx-card-email/dx-card-email.component';
import { DxCardImageComponent } from './core/dx-card-image/dx-card-image.component';
import { DxCardListingComponent } from './core/dx-card-listing/dx-card-listing.component';
import { DxCardProfileComponent } from './core/dx-card-profile/dx-card-profile.component';
import { DxCardTextWrapperComponent } from './core/dx-card-text-wrapper/dx-card-text-wrapper.component';
import { DxCardTextComponent } from './core/dx-card-text/dx-card-text.component';
import { DxCardUrlComponent } from './core/dx-card-url/dx-card-url.component';
import { DxCardWrapperComponent } from './core/dx-card-wrapper/dx-card-wrapper.component';
import { DxDropdownDetailsComponent } from './core/dx-dropdown/dx-dropdown.component';
import { DxCardComponent } from "./dx-card.component";
import { BasicLaunchTileComponent } from "./tile/basic-launch-tile.component";
import { DxTileFooterComponent } from "./tile/core/tile-footer.component";
import { DxTileHeaderComponent } from "./tile/core/tile-header.component";
import { BasicLinkTileComponent } from "./tile/link-tile.component";
import { NewMonitoringTileComponent } from "./tile/monitoring-tile.component";
import { DxCardContentComponent } from './variant/dx-card-content/dx-card-content.component';
import { DxCardListViewComponent } from './variant/dx-card-list-view/dx-card-list-view.component';
import { DxDetailsCardComponent } from './variant/dx-details-card/dx-details-card.component';
import { DxFormCardComponent } from './variant/dx-form-card/dx-form-card.component';
import { DxCardAdditionalContentComponent } from './core/dx-card-additional-content/dx-card-additional-content.component'
import { AbilityModule } from "@casl/angular";

@NgModule({
    declarations: [
        DxCardComponent,
        DxCardProfileComponent,
        DxCardDescriptionComponent,
        DxCardListingComponent,
        DxCardActionComponent,
        DxCardWrapperComponent,
        DxCardListViewComponent,

        BasicLaunchTileComponent,
        DxTileHeaderComponent,
        DxTileFooterComponent,
        BasicLinkTileComponent,
        NewMonitoringTileComponent,
        DxDetailsCardComponent,
        DxCardTextWrapperComponent,
        DxCardDateComponent,
        DxCardCurrencyComponent,
        DxCardTextComponent,
        DxCardAccordianComponent,
        DxCardAccordianContentComponent,
        DxCardUrlComponent,
        DxCardEmailComponent,
        DxFormCardComponent,
        DxCardCheckboxComponent,
        DxCardContentComponent,
        DxDropdownDetailsComponent,
        DxCardDateTimeComponent,
        DxCardImageComponent,
        DxCardAdditionalContentComponent,
    ],
    imports: [
        CommonModule,
        CoreUiModule,
        DxButtonModule,
        MatTooltipModule,
        ClipboardModule,
        DxCurrencyModule,
        DxDatepickerModule,
        DxCheckboxModule,
        DxToggleModule,
        FormsModule,
        DxToolTipModule,
        DxPopoverModule,
        DxTagInputModule,
        DxDirectiveModule,
        RouterModule,
        FilePickerModule,
        ImagePreviewModule,
        TranslocoModule,
        AbilityModule
    ],
    exports: [
        DxCardComponent,
        DxCardProfileComponent,
        DxCardDescriptionComponent,
        DxCardListingComponent,
        DxCardActionComponent,
        DxCardWrapperComponent,
        DxCardListViewComponent,
        DxDetailsCardComponent,
        DxCardAccordianComponent,
        DxCardAccordianContentComponent,

        BasicLaunchTileComponent,
        BasicLinkTileComponent,
        NewMonitoringTileComponent,
        DxFormCardComponent,
        DxCardCheckboxComponent,
        DxTagInputModule,
        DxCardContentComponent,
        DxDropdownDetailsComponent,
        DxCardDateTimeComponent,
        DxCardAdditionalContentComponent
    ]
})
export class DxCardModule { }
