import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export interface DatePickerModel<D> {
  start: string;
  data: MatDatepickerInputEvent<D>;
}
