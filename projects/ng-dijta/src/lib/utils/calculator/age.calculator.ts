export class AgeUtil {
  static ageCalculator(date: Date): number {
    const todayDate: Date = new Date();
    const selectedDate: Date = new Date(date);
    let age: number = todayDate.getFullYear() - selectedDate.getFullYear();
    const m: number = todayDate.getMonth() - selectedDate.getMonth();
    if (m < 0 || (m === 0 && todayDate.getDate() < selectedDate.getDate())) {
      age--;
    }
    return age;
  }
}
