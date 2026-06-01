import { Component, signal } from "@angular/core";

@Component({
    selector: 'app-expansion',
    templateUrl: './expansion.html',
  })
  export class Expansion {
    readonly panelOpenState = signal(false)
  }