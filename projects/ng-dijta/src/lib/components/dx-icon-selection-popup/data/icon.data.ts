import { IconConfig } from "../model/icon.interface";

export class IconData {
    static readonly iconConfig: IconConfig = {
        iconCategoryURL: 'dx-dijta-api/v1/icons/getCategory?sortBy=categoryName&sortOrder=asc',
        iconListURL: 'dx-dijta-api/v1/icons'
    };
}