import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgDxMultiChip, StatusReasons } from '../../interfaces/dx-additional.interface';
import { DxTableColumn } from '../../interfaces/dx-table.interface';
import { NgDxAvatarSettings } from '../../../dx-avatar/model/avatar';
interface CustomChip {
  color?: string;
  ['background-color']?: string;
  opacity?: string
}
interface ExtraTotal {
  shortName?: string
}
@Component({
  selector: 'dx-table-multi-chip',
  templateUrl: './dx-table-multi-chip.component.html',
  styleUrls: ['./dx-table-multi-chip.component.scss']
})
export class DxTableMultiChipComponent<T> {
  @Input() column!: DxTableColumn<T>;
  @Input() reason?: StatusReasons<T> | undefined;
  @Output() onIconClick: EventEmitter<string> = new EventEmitter<string>();

  _allChips: NgDxMultiChip[] | undefined;
  displayedChips: NgDxMultiChip[] = [];
  extraChips: NgDxMultiChip[] = [];
  extraTotal: ExtraTotal = {};
  avatarSettings: NgDxAvatarSettings = {
    size: 27,
    textSizeRatio: 2.3
  }

  @Input()
  set data(list: NgDxMultiChip[] | undefined) {
    this._allChips = list;
    this.updateChips();
  }


  get multiChips(): NgDxMultiChip[] | undefined {
    return this._allChips;
  }

  updateChips(): void {
    if (this.multiChips && this.multiChips?.length > 0) {
      this.displayedChips = this.multiChips?.reduce((_previousValue: NgDxMultiChip[], _currentValue: NgDxMultiChip, i: number) => {
        if (this.column?.multiChipIconsLimit) {
          if (i < this.column?.multiChipIconsLimit) {
            _previousValue?.push(_currentValue)
          }
        } else {
          _previousValue?.push(_currentValue)
        }
        return _previousValue
      }, [])
      this.extraChips = this.multiChips?.reduce((_previousValue: NgDxMultiChip[], _currentValue: NgDxMultiChip, i: number) => {
        if (this.column?.multiChipIconsLimit) {
          if (i >= this.column?.multiChipIconsLimit) {
            _previousValue?.push(_currentValue)
          }
        }
        return _previousValue
      }, [])
      if (this.extraChips?.length > 0) {

        this.extraTotal = {
          ...this.extraTotal,
          shortName: `+ ${this.extraChips?.length}`
        }
      }
    }
  }

  showBackgroundColor(chip: NgDxMultiChip): CustomChip {
    const defaultChip: CustomChip = {
      color: chip?.color ? chip?.color : '#000000',
    };
    const customChip: CustomChip = {
      color: chip?.color ? chip?.color : '#000000',
      opacity: '0.9',
      'background-color': `${chip?.bgColor + '38'}`,

    };
    return chip?.bgColor ? customChip : defaultChip;
  }
  chipColor(chip: NgDxMultiChip): CustomChip {
    const customChip: CustomChip = {
      color: chip?.color ? chip?.color : '#64748b',
    };
    return customChip;
  }

  iconClick(type:string):void{
    this.onIconClick.emit(type)
  }
}
