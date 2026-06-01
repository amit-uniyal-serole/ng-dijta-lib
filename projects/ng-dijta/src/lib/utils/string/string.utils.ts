
export class StringUtil {
    static isString(val: unknown): boolean {
        return typeof val === 'string';
    }

    static isBlank(val: string): boolean {
        return !val
            || (StringUtil.isString(val)
                && val.trim().length === 0);
    }

    static getIfBlank(val: string, defaultValue: string): string {
        return StringUtil.isBlank(val)
            ? defaultValue
            : val;
    }

    static toString(val: string | number): string {
        switch (typeof val) {
            case 'string':
                return val;
            default:
                return String(val);
        }
    }
}