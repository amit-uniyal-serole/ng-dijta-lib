import { DxTableData } from "../../dx-table";
import { DxTableColumn } from "../../dx-table/interfaces/dx-table.interface";
import { DxConfigTableSettings, DxTableConfig } from "../model/dx-config-table";


export class ConfigTableTransform {
    static dataTransform(dataSource: any, tableConfig: DxConfigTableSettings<any>): any { // need to adjust type
        const columnAsAvatar: DxTableColumn<any> | undefined = tableConfig?.col?.find(column => column?.type === 'avatar');
        const multiChipColumn: DxTableColumn<any> | undefined = tableConfig?.col?.find(column => column?.type === 'multi_chip')
        return dataSource?.content?.map((item,) => {            
            let formattedData: DxTableData<any> = {
                /**
                 * @description add avatar based on columnAsAvatar
                 */
                ngDxAvatar: columnAsAvatar ? [{
                    avatarName: item[columnAsAvatar?.field] && item[columnAsAvatar?.field] != ''
                        ? item[columnAsAvatar?.field]
                        : '-',
                }] : undefined,
                /**
                 * @description data object formating
                 */
                data: {
                    ...item,                      
                },
                /**
                 * @description add multichip based column type multi_chip
                 */
                multiChip: multiChipColumn ? item[multiChipColumn?.field] : undefined
            }
            return formattedData
        })
    }
  
}