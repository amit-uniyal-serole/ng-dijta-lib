export class ErrorUtils {
    static getErrorMessage(error: string | any): string {
        const replaceMessage = error?.replaceAll('{', '').replaceAll('}', '').replaceAll('[', '').replaceAll(']', '').replaceAll('"', '').split(',');
        const defaultValue = replaceMessage.find(m => m.includes('defaultValue'))?.split(':');
        const message = replaceMessage.find(m => m.includes('message'))?.split(':');
        return (defaultValue ? defaultValue[1] : undefined) ?? (message ? message[1] : undefined);
    }
}