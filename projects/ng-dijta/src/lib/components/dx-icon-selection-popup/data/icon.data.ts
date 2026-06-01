import { IconConfig } from "../model/icon.interface";

export class IconData {
    static readonly iconConfig: IconConfig = {
        iconCategoryURL: 'api/dx-dijta-api/v1/icons/getCategory?sortBy=categoryName&sortOrder=asc',
        iconListURL: 'api/dx-dijta-api/v1/icons'
    };
}