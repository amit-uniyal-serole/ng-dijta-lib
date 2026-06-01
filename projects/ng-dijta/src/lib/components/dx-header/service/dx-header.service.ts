import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface AppConfig {
    title: string;
    icon?: string;
    shortName?: string;
    fullName?: string;
    svg?: string;
    position?: 'default' | 'custom';
}

@Injectable()
export class DxHeaderService {
    app: BehaviorSubject<AppConfig | null> = new BehaviorSubject<AppConfig | null>(null);
    appSub = this.app.asObservable();


    setAppConfig(app: AppConfig | null): void {
        this.app.next(app);
    }


}