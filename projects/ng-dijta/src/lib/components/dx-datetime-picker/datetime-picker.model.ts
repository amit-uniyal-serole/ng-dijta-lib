import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export interface DatetimePickerModel<D> {
  name: string;
  data: MatDatepickerInputEvent<D>;
}
