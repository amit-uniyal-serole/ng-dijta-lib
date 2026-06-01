import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Conditions } from '.';
import { KeyValueModel } from '../../core';
import { Columns, FilterButtons, FilterData, OnClickAddNewButton } from './model';

@Component({
  selector: 'dx-advance-filter',
  templateUrl: './dx-advance-filter.component.html',
  styleUrls: ['./dx-advance-filter.component.scss'],
})
export class DxAdvanceFilterComponent implements OnInit {
  @Input() title!: string;
  @Input() filterButtons!: FilterButtons
  @Input() filterData!: FilterData;
  @Output() onClickAction: EventEmitter<string> = new EventEmitter<string>()
  filterConditions!: Conditions[];
  filterForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterConditions = this.filterData?.columns[0]?.conditions;
    this.filterForm = this.fb?.group({
      groups: this.fb?.array([this.groups]),
    });
  }
  get groups(): FormGroup {
    return this.fb.group({
      id: new Date().getTime(),
      groupBy: '',
      sections: this.fb.array([this.sections]),
    });
  }

  get sections(): FormGroup {
    return this.fb.group({
      id: new Date().getTime(),
      column: '',
      condition: '',
      criteria: '',
      groupSectionBy: '',
    });
  }

  addGroups(event: OnClickAddNewButton): void {
    (this.filterForm?.get('groups') as FormArray)?.push(this.groups);
    const group: FormArray = this.filterForm?.get('groups') as FormArray;
    const updateGroup: FormGroup = group?.controls[
      group?.controls?.length - 2
    ] as FormGroup;
    updateGroup?.controls?.groupBy?.setValue(event?.actionType);
  }
  modifyGrouping(event: OnClickAddNewButton, groupIndex: number): void {
    const group: FormArray = this.filterForm?.get('groups') as FormArray;
    const updateGroup: FormGroup = group?.controls[
      groupIndex
    ] as FormGroup;
    updateGroup?.controls?.groupBy?.setValue(event?.actionType);
  }
  addSection(event: OnClickAddNewButton, group: FormGroup, sectionIndex: number): void {
    if (event?.isAddNew) {
      (group?.get('sections') as FormArray)?.push(this.sections);
    }
    const sectionGroup: FormArray = group
      ?.get('sections') as FormArray
    const updatedSections = sectionGroup?.controls[sectionIndex] as FormGroup
    updatedSections.controls?.groupSectionBy?.setValue(
      event?.actionType
    );

  }
  deleteGroup(index: number): void {
    (this.filterForm?.get('groups') as FormArray)?.removeAt(index);
  }

  deleteSection(group: FormGroup, sectionIndex: number, groupIndex: number): void {
    if (sectionIndex === 0 && (group?.get('sections') as FormArray)?.controls?.length === 1) {
      (this.filterForm?.get('groups') as FormArray)?.removeAt(groupIndex);
    } else {
      (group?.get('sections') as FormArray)?.removeAt(sectionIndex);
    }
  }

  get filterGroup(): FormArray {
    return this.filterForm?.get('groups') as FormArray;
  }
  getConditions(group: FormGroup, sectionIndex: number): Conditions[] {

    const val: string = (group?.get('sections') as FormArray)?.controls[sectionIndex]?.value?.column;
    if (val) {
      return this.filterData?.columns?.reduce((_pv: Conditions[], _cv: Columns) => {
        if (_cv.keyTt === val) {
          _pv = _cv?.conditions;
        }
        return _pv;
      }, []);
    } else {
      return this.filterData?.columns[0]?.conditions;
    }
  }
  onClickFilterAction(clickEvent?: string): void {
    this.onClickAction?.emit(clickEvent ?? this.filterForm?.value)
  }
}
