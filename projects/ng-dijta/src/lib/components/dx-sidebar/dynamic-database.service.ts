import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class DynamicDatabase {
    private url = new BehaviorSubject<string>('compact');
    currentUrl = this.url.asObservable();

    private parentUrl = new BehaviorSubject<string>('compact');
    currentParentUrl = this.parentUrl.asObservable();

    private labelInd = new BehaviorSubject<number>(0);
    labelIndex = this.labelInd.asObservable();

    private childLabel = new BehaviorSubject<string>('');
    childLabelData = this.childLabel.asObservable();

    setUrl(url: string) {
        this.url.next(url)
    }

    setParentUrl(url: string) {
        this.parentUrl.next(url)
    }

    setLabelIndex(ind: number){
        this.labelInd.next(ind)
    }

    setChildLabel(val: string){
        this.childLabel.next(val)
    }
    
}