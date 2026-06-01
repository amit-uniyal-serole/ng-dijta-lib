import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export interface InputDatePickerModel<D> {
  name: string;
  data: MatDatepickerInputEvent<D>;
}
