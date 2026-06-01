import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatMenu } from "@angular/material/menu";

@Component({
    selector: "dx-menu-panel",
    template: `
    <mat-menu #menu>
        <ng-container *ngFor="let item of items">
            <button *ngIf="!item.children; else branch" mat-menu-item>{{item.name}}</button>
            <ng-template #branch>
            <button mat-menu-item [matMenuTriggerFor]="innerPanel.menu">{{item.name}}</button>
            <dx-menu-panel #innerPanel [items]="item.children"></dx-menu-panel>
            </ng-template>
        </ng-container>
    </mat-menu>
  `,
})
export class MenuPanelComponent implements OnInit {
    @ViewChild("menu", { static: true }) menu!: MatMenu;
    @Input() items!: { name: string, children: string[] }[];

    constructor() { }

    ngOnInit() { }
}
