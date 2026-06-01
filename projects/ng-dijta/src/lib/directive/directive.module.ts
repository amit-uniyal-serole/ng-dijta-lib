import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PreventDoubleClickDirective } from './button/prevent-double-click.directive';
import { ChangeChipColorDirective } from './color/mat-chip-color.directive';
import { DxConditionDirective } from './condition-class/conditional-class.directive';
import { DatePickerFormatDirective } from './date/date-picker-format.directive';
import { DateTimePickerFormatDirective } from './date/datetime-picker-format.directive';
import { InfiniteScrollDirective } from './infinite/dx-infinite-scroll.directive';
import { MentionModule } from './mentions/dx-mention.module';
import { ScrollHeightDirective } from './scrollbar-height/scroll-height.directive';
import { MaxNumberLengthDirective } from './validation/maxNumberlength.directive';
import { NumericOnlyDirective } from './validation/numericOnly.directive';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { NgDxHideOnChangeDirective } from './hide-show/ngdx-show-if.directive';
import { EnterKeyDirective } from './event/key-enter.directive';
import { DxSafePipe } from './safe/safe.pipe';
import { BulkAblilityDirective } from './bulk-ability/bulk-ablility.directive';
import { TrimInputDirective } from './trim-input/trim-input.directive';
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
        BulkAblilityDirective,
        TrimInputDirective
    ],
    imports: [FormsModule, MentionModule, LazyLoadModule],
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
        BulkAblilityDirective,
        TrimInputDirective
    ],
})
export class DxDirectiveModule { }
