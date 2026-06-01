import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { DxLoader, PRIMARY_SPINNER, Spinner } from "./dx-loader.enum";

@Injectable({
  providedIn: "root",
})
export class DxLoaderService {
  /**
   * Spinner observable
   *
   * @memberof DxLoaderService
   */
  // private spinnerObservable = new ReplaySubject<DxLoader>(1);
  public spinnerObservable = new BehaviorSubject<DxLoader>(null!);
  /**
   * Creates an instance of DxLoaderService.
   * @memberof DxLoaderService
   */
  constructor() { }
  /**
   * Get subscription of desired spinner
   * @memberof DxLoaderService
   **/
  getSpinner(name: string): Observable<DxLoader> {
    return this.spinnerObservable
      .asObservable()
      .pipe(filter((x: DxLoader) => x && x.name === name));
  }
  /**
   * To show spinner
   *
   * @memberof DxLoaderService
   */
  show(name: string = PRIMARY_SPINNER, spinner?: Spinner) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        if (spinner && Object.keys(spinner).length) {
          spinner["name"] = name;
          this.spinnerObservable.next(
            new DxLoader({ ...spinner, show: true, type: spinner.type ?? 'ball-pulse-rise' })
          );
          resolve(true);
        } else {
          this.spinnerObservable.next(new DxLoader({ name, show: true }));
          resolve(true);
        }
      }, 10);
    });
  }
  /**
   * To hide spinner
   *
   * @memberof DxLoaderService
   */
  hide(name: string = PRIMARY_SPINNER, debounce: number = 10) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        this.spinnerObservable.next(new DxLoader({ name, show: false }));
        resolve(true);
      }, debounce);
    });
  }
}
