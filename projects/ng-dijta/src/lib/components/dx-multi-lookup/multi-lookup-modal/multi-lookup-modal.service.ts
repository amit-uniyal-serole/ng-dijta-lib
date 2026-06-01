import { Injectable } from '@angular/core';
import lodash from 'lodash';
import { AdditionalFilter } from '../../dx-lookup';
import { DxTableData, SelectedCheckboxConfig } from '../../dx-table';
import { MultiLookupRecordSelectedIds } from './interface/dx-mulit-lookup-interface';

@Injectable({
  providedIn: 'root'
})
export class MultiLookupModalHelperService {
  /**
   * Returns only the raw data required to populate the unassigned list in edit mode.
   */
  mapUnassignedList(event: DxTableData<any>[]): any[] {
    return event?.map((data: DxTableData<any>) => data?.data) ?? [];
  }

  /**
   * Filters out ids that are no longer part of the current selection as the page changes.
   */
  calculateRemainingIds(
    event: DxTableData<any>[],
    selection?: SelectedCheckboxConfig<any>
  ): number[] | undefined {
    if (!selection?.value || !selection?.key) {
      return selection?.value;
    }
    const key: keyof any = selection.key;
    return selection.value.filter(
      (id: number) => !event?.some((row: DxTableData<any>) => id === row?.data?.[key])
    );
  }

  /**
   * Builds an object that captures what is selected on the current page.
   */
  buildPageSelection(
    event: DxTableData<any>[],
    key: string | undefined,
    pageNo: number | undefined
  ): MultiLookupRecordSelectedIds {
    return {
      page: pageNo,
      ids: event
        ?.map((data: DxTableData<any>) => (key ? data?.data?.[key] : undefined))
        ?.filter((id: number | undefined): id is number => id !== undefined),
      data: event
    };
  }

  /**
   * Inserts or updates the in-memory selection list for a specific page.
   */
  upsertPageSelection(
    selections: MultiLookupRecordSelectedIds[],
    pageSelection: MultiLookupRecordSelectedIds
  ): MultiLookupRecordSelectedIds[] {
    const updatedSelections: MultiLookupRecordSelectedIds[] = [...(selections ?? [])];
    const index: number = updatedSelections.findIndex(
      (item: MultiLookupRecordSelectedIds) => item?.page === pageSelection?.page
    );
    if (index !== -1) {
      updatedSelections[index] = {
        ...updatedSelections[index],
        ids: pageSelection?.ids,
        data: pageSelection?.data
      };
      return updatedSelections;
    }
    return [...updatedSelections, pageSelection];
  }

  /**
   * Produces a single flattened list of ids from page-wise selections.
   */
  collectSelectionIds(selections: MultiLookupRecordSelectedIds[]): number[] {
    return selections
      ?.map((data: MultiLookupRecordSelectedIds) => data?.ids ?? [])
      ?.flat() ?? [];
  }

  /**
   * Merges remaining ids with the current page ids and deduplicates the final value.
   */
  mergeSelectionValues(
    remainingIds: number[] | undefined,
    ids: number[]
  ): number[] {
    return lodash
      .uniq([...(remainingIds ?? []), ...ids])
      ?.filter((value: number | undefined | null): value is number => !!value);
  }

  /**
   * Reduces the per-page selections into single array of table records.
   */
  mergeSelectedRecords(selections: MultiLookupRecordSelectedIds[]): DxTableData<any>[] {
    return selections
      ?.map((data: MultiLookupRecordSelectedIds) => data?.data ?? [])
      ?.flat() ?? [];
  }

  /**
   * Ensures the selected records mirror the ids stored inside the selection config.
   */
  dedupeSelectedRecords(
    records: DxTableData<any>[],
    selection?: SelectedCheckboxConfig<any>
  ): DxTableData<any>[] {
    const key: keyof any | undefined = selection?.key;
    if (!selection?.value || !key) {
      return records;
    }
    const uniqKey: string = `data.${key as string}`;
    return lodash
      .uniqBy(records, uniqKey)
      ?.filter((record: DxTableData<any>) =>
        !!selection.value?.some((val: number) => val === record?.data?.[key])
      );
  }

  /**
   * Serializes the advanced filter UI state into API readable search string.
   */
  buildAdvancedSearchQuery(filters: AdditionalFilter[]): string {
    return (filters ?? [])
      .filter((item: AdditionalFilter) => {
        if (Array.isArray(item.value)) {
          return item.value.length > 0;
        }
        return item.value !== '' && item.value != null;
      }).map((item: AdditionalFilter) => {
        return `${item.field}:${this.determineOperator(item.type,item.operator)}:${this.formatFilterValue(item)}`
      }).join(",");
  }

  /**
   * Converts filter chip selections into payload required by bulk action service.
   */
  parseFiltersForCriteria(filterString: AdditionalFilter[]): {
    fieldIndex: number;
    fieldName: string | undefined;
    comparator: string;
    value: string;
  }[] {
    return filterString
      .filter((fil: AdditionalFilter) => {
        if (Array.isArray(fil.value)) {
          return fil.value.length !== 0;
        }
        return !!fil.value && fil.value !== "";
      })
      .map((fil: AdditionalFilter, index: number) => {
        return {
          fieldIndex: index + 1,
          fieldName: fil.field,
          comparator: Array.isArray(fil.value) ? "contains" : "=",
          value: Array.isArray(fil.value) ? fil.value.join(";") : String(fil.value)
        };
      });
  }

  /**
   * Converts filter value to server expected string representation.
   */
  private formatFilterValue(val: AdditionalFilter): string {
    if (Array.isArray(val.value)) {
      const vals: string = (val.value ?? []).map((item: string) => `"${item}"`).join(',');
      return val.value?.length > 0 ? `[${vals}]` : '';
    }
    return String(val.value ?? '');
  }

  /**
   * Determines the operator type based on the filter control type.
   */
  private determineOperator(type: string,operator?:string): string {
    const eqOperatorTypes: string[] = ['Decimal', 'LongInteger', 'URL', 'Number', 'Longitude', 'Latitude', 'Currency', 'Email', 'Date', 'DateTime', 'User', 'Lookup', 'Checkbox', 'Percentage', 'IP', 'Latitude', 'Longitude', 'ContactNumber'];
    const startsWithOperatorTypes: string[] = ['Text', 'TextArea', 'TEXT'];
    if(!!operator){
      return operator;
    }
    if (startsWithOperatorTypes.some((valueType: string) => valueType === type)) {
      return 'wc';
    }
    if (type === 'Picklist' || type === 'MultiPicklist' || type === 'Tag' || type === 'CHIP') {
      return 'in';
    }
    if (type === 'SELECT') {
      return 'eq';
    }
    if (eqOperatorTypes.some((valueType: string) => valueType === type)) {
      return 'eq';
    }
    return 'eq';
  }
}
