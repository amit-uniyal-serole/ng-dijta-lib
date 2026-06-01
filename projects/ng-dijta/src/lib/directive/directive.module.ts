import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PreventDoubleClickDirective } from './button/prevent-double-click.directive';
import { ChangeChipColorDirective } from './color/mat-chip-color.directive';
import { DxConditionDirective } from './condition-class/conditional-class.directive';
import { DatePickerFormatDirective } from './date/date-picker-format.directive';
import { DateTimePickerFormatDirective } from './date/datetime-picker-format.directive';
import { EnterKeyDirective } from './event/key-enter.directive';
import { NgDxHideOnChangeDirective } from './hide-show/ngdx-show-if.directive';
import { InfiniteScrollDirective } from './infinite/dx-infinite-scroll.directive';
import { NoLeadingTrailingSpaceDirective } from './input/no-leading-trailing-space.directive';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { MentionModule } from './mentions/dx-mention.module';
import { DxSafePipe } from './safe/safe.pipe';
import { ScrollHeightDirective } from './scrollbar-height/scroll-height.directive';
import { MaxNumberLengthDirective } from './validation/maxNumberlength.directive';
import { NumericOnlyDirective } from './validation/numericOnly.directive';
import { BulkAbilityDirective } from './bulk-ability/bulk-ablility.directive';
import { TrimInputDirective } from './trim-input/trim-input.directive';
import { DxLabelDirective } from './label/label.directive';
@NgModule({
    declarations: [
        DatePickerFormatDirective,
        PreventDoubleClickDirective,
        DxConditionDirective,
        ChangeChipColorDirective,
        DateTimePickerFormatDirective,
        InfiniteScrollDirective,
        MaxNumberLengthDirective,
        NumericOnlyDirective,
        ScrollHeightDirective,
        NgDxHideOnChangeDirective,
        EnterKeyDirective,
        DxSafePipe,
        NoLeadingTrailingSpaceDirective,
        BulkAbilityDirective,
        TrimInputDirective,        
    ],
    imports: [FormsModule, MentionModule, LazyLoadModule, CommonModule,DxLabelDirective],
    exports: [
        DatePickerFormatDirective,
        PreventDoubleClickDirective,
        DxConditionDirective,
        ChangeChipColorDirective,
        DateTimePickerFormatDirective,
        InfiniteScrollDirective,
        MentionModule,
        MaxNumberLengthDirective,
        NumericOnlyDirective,
        ScrollHeightDirective,
        LazyLoadModule,
        NgDxHideOnChangeDirective,
        EnterKeyDirective,
        DxSafePipe,
        BulkAbilityDirective,
        NoLeadingTrailingSpaceDirective,
        TrimInputDirective,
        DxLabelDirective
    ],
})
export class DxDirectiveModule { }
