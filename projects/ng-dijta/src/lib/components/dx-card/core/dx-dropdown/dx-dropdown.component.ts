import { Component, Input, OnChanges } from '@angular/core';
import { KeyValueModel } from '../../../../core/UI/model/keyValue';
import { DxDetailsCardContent } from '../../model/dx-details-card.model';

@Component({
  selector: 'dx-details-dropdown',
  template: `
    <div class="dx-dropdown-wrapper">
        <span *ngIf="!displayDropdown || displayDropdown.length === 0">-</span>
        <ng-container *ngFor="let option of displayDropdown">
                <div [ngClass]="{'value-align':!option?.color}" class="dx-dropdown" >
                    <span class="dot" 
                        [changeChipColor]="option?.color  ?? '#dad9dc'" [dot]="true"></span>
                    {{option?.valueTt | transloco }}
                </div>
        </ng-container>
        <span class="show_more_dropdown" *ngIf="remainingDropdown.length > 0" dx-popover
            [dxPopoverContent]="contentTemplate">
            +{{remainingDropdown.length}}
        </span>

        <ng-template #contentTemplate>
            <div class="dx-dropdown-wrapper d-block">
                <ng-container *ngFor="let option of remainingDropdown">
                        <div [ngClass]="{'value-align':!option?.color}" class="dx-dropdown">
                            <span class="dot" 
                                [changeChipColor]="option?.color  ?? '#dad9dc'" [dot]="true"></span>
                            {{
                            option?.valueTt | transloco
                            }}
                        </div>
                </ng-container>
            </div>

        </ng-template>
    </div>
  `,
  styles: [
    `
      .dx-dropdown-wrapper {
        display: flex;
      }
        .dx-dropdown-wrapper .dx-dropdown {
          margin: 1px;
          display: flex;
          align-items: center;
        }
        .show_more_dropdown {
          display: flex !important;
          align-items: center;
          cursor: pointer;
          margin: 0px 2px;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid #847e7e;
          border-radius: 50%;
          padding: 0px 4px;
        }
        .show_more_dropdown:hover {
          color: blue;
        }
        .dot {
          height: 15px;
          width: 15px;
          border-radius: 50%;
          display: inline-block;
          margin: 2px 3px;
        }
    `,
  ],
})
export class DxDropdownDetailsComponent implements OnChanges {
  @Input() data: DxDetailsCardContent | undefined;
  dropdowns: KeyValueModel[] = [];
  displayDropdown: KeyValueModel[] = [];
  remainingDropdown: KeyValueModel[] = [];

  ngOnChanges(): void {
    this.dropdowns = this.data?.settings?.dropdown ?? [];
    this.displayDropdown = this.dropdowns.filter((_item, index) => index < 3);
    this.remainingDropdown = this.dropdowns.filter((_item, index) => index >= 3);
  }
}
