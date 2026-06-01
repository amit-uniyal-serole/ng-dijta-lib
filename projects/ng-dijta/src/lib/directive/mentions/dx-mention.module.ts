import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MentionDirective } from './dx-mention.directive';
import { MentionListComponent } from './dx-mention-list.component';

@NgModule({
    declarations: [
        MentionDirective,
        MentionListComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MentionDirective
    ]
})
export class MentionModule { }
