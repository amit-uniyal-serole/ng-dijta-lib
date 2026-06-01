export class StringUtil {
  static toNumberString(data: number): (string | undefined){
    if (!data) {
      return undefined;
    }
    return data.toString();
  }
}
