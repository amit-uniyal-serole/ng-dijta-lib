import { ColorFormats } from '../enums/formats';


export function isDescendantOrSame(nodeParent: any, nodeTarget: any): boolean {
    return nodeParent == nodeTarget || Array.from(nodeParent.childNodes).some(c => isDescendantOrSame(c, nodeTarget))

}
export function getFormat(format: string): ColorFormats {
    if (format === 'cmyk') {
        return ColorFormats.CMYK;
    } else if (format === 'rgba') {
        return ColorFormats.RGBA;
    } else if (format === 'hsla') {
        return ColorFormats.HSLA;
    } else if (format === 'hex') {
        return ColorFormats.HEX;
    } else {
        return ColorFormats.CMYK;
    }

}