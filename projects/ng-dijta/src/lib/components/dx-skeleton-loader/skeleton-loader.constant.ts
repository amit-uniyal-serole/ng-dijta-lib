export const skeletonLoaderClr = '#9ca8ae2e';
export interface SkeletonLoaderModel {
    width?: string;
    height?: string;
    'background-color'?: string;
    'margin-top'?: string;
    'border-radius'?: string;
    'margin-right'?: string;
    'margin-bottom'?: string;
    'margin'?: string;
}
export class Skeleton {
    width: string;
    height: string;
    'background-color': string;
    'margin-top': string;
    'border-radius': string;
    'margin-right': string;
    'margin-bottom': string;
    constructor(
        width: string,
        height: string,
        borderRadius?: string,
        bgClr?: string,
        marginTop?: string,
        marginRight?: string,
        marginBottom?: string
    ) {
        this.width = width ?? '100px';
        this.height = height ?? '30px';
        this['background-color'] = bgClr ?? skeletonLoaderClr;
        this['margin-top'] = marginTop ?? '0px';
        this['border-radius'] = borderRadius ?? '4px';
        this['margin-right'] = marginRight ?? '0px';
        this['margin-bottom'] = marginBottom ?? '0px';
    }

    static readonly Icon: SkeletonLoaderModel = {
        width: '30px',
        height: '30px',
        'background-color': skeletonLoaderClr,
        margin: '0px 7px'
    };
    static readonly IconText: SkeletonLoaderModel = {
        width: '25px',
        height: '25px',
        'background-color': skeletonLoaderClr,
        margin: '0px 3px'
    };
    static readonly Avatar: SkeletonLoaderModel = {
        width: '40px',
        height: '40px',
        'background-color': skeletonLoaderClr,
        margin: '0px 5px'
    };
    static readonly Text: SkeletonLoaderModel = {
        width: '100px',
        height: '25px',
        'background-color': skeletonLoaderClr,
        'margin-top': '7px',
        'margin-bottom': '0px',
    };

    static readonly SquareBox: SkeletonLoaderModel = {
        width: '30px',
        height: '30px',
        'background-color': skeletonLoaderClr,
        'margin-top': '7px',
        'margin-bottom': '0px',
    };

    static readonly verticalLine: SkeletonLoaderModel = {
        width: '15px',
        // height: '27px',
        'background-color': skeletonLoaderClr,
        'margin-top': '7px',
        'margin-bottom': '0px',
    };
    static readonly CheckBox: SkeletonLoaderModel = {
        width: '20px',
        height: '20px',
        'background-color': skeletonLoaderClr,
        'margin-top': '7px',
        'margin-bottom': '0px',
    };
    static readonly Button: SkeletonLoaderModel = {
        width: '70px',
        height: '40px',
        'background-color': skeletonLoaderClr,
        'margin-top': '7px',
        'margin-bottom': '0px',
    };

    static readonly label: SkeletonLoaderModel = {
        width: '120px',
        height: '20px',
        'background-color': skeletonLoaderClr,
        'margin-top': '7px',
    };
    static readonly value: SkeletonLoaderModel = {
        width: '100px',
        height: '20px',
        'background-color': skeletonLoaderClr,
    };
    static readonly line: SkeletonLoaderModel = {
        height: '22px',
        'background-color': skeletonLoaderClr,
        'margin-bottom': '0px',
    }
    static readonly chip: SkeletonLoaderModel = {
        width: '94px',
        height: '25px',
        'background-color': skeletonLoaderClr,
        'margin-top': '7px',
        'margin-bottom': '0px',
        'border-radius': '20px'
    }
    static readonly tableCheckBox: SkeletonLoaderModel = {
        width: '20px',
        height: '20px',
        'background-color': skeletonLoaderClr,
        'margin-bottom': '0px',
    };

}
