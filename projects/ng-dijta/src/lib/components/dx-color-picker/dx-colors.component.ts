import { Component, Host, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DxColorsTriggerDirective } from './directives/dx-colors-trigger.directive';

@Component({
    selector: 'dx-colors',
    templateUrl: './dx-colors.component.html',
    styleUrls: ['./dx-colors.component.scss'],
})
export class DxColorsComponent implements OnInit, OnDestroy {
    private triggerDirectiveColorChangeSubscription: Subscription | null = null;

    constructor(
        private cdRef: ChangeDetectorRef,
        @Host() private triggerDirective: DxColorsTriggerDirective
    ) { }

    ngOnInit(): void {
        this.triggerDirectiveColorChangeSubscription =
            this.triggerDirective.change.subscribe((color) => {
                this.color = color;
                this.cdRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        if (this.triggerDirectiveColorChangeSubscription) {
            this.triggerDirectiveColorChangeSubscription.unsubscribe();
        }
    }

    //IO color
    color: string = this.triggerDirective.color;
}