
import { Pipe, PipeTransform } from '@angular/core';
import { DxLookupModalConfig } from '../../dx-lookup';

@Pipe({
  name: 'lookupConfig',
})
export class LookupConfigPipe implements PipeTransform {

  transform(operator: string, config: DxLookupModalConfig | undefined): DxLookupModalConfig | undefined {
    console.log(config, operator);
    if (!config) {
      return config;
    }

    const newConfig = { ...config };
    // Deep copy tableSettings to avoid mutating the original object
    if (newConfig.tableSettings) {
        newConfig.tableSettings = { ...newConfig.tableSettings };
    } else {
        newConfig.tableSettings = {};
    }

    // Check for equality operators
    const isMultiSelect = operator === 'contains' || operator ===  "doesn't contain";

    if (isMultiSelect) {
      newConfig.tableSettings.singleRowSelect = false;
      newConfig.tableSettings.multiSelect = true;
    } else {
      newConfig.tableSettings.singleRowSelect = true;
      newConfig.tableSettings.multiSelect = false;
    }
    console.log(newConfig);
    
    return newConfig;
  }

}
