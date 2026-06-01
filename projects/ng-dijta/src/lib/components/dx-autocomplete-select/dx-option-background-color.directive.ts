import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[dxOptionBackgroundColor]'
})
export class DxOptionBackgroundColorDirective implements OnInit {
    @Input('dxOptionBackgroundColor') backgroundColor: string | undefined;

    constructor(private readonly el: ElementRef) { }

    ngOnInit() {
        this.el.nativeElement.style.setProperty("background-color", this.getLighterColor((this.backgroundColor ?? '#fff'), this.backgroundColor ? 40 : 0), "important");
        this.el.nativeElement.style.color = this.backgroundColor ? this.getContrastColor((this.backgroundColor)) : '#000';
    }

    private getContrastColor(color: string): string {
        // Convert color to RGB format
        const hex: string = color.replace("#", "");
        const r: number = parseInt(hex.substr(0, 2), 16);
        const g: number = parseInt(hex.substr(2, 2), 16);
        const b: number = parseInt(hex.substr(4, 2), 16);

        // Calculate perceived brightness
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        // Determine contrast color
        return brightness > 128 ? "#000000" : "#ffffff";
    }
    private getLighterColor(color: string, percentage: number): string {
        // Remove the "#" symbol from the color
        color = color.replace("#", "");

        // Convert the color to RGB format
        let r: number = parseInt(color.substr(0, 2), 16);
        let g: number = parseInt(color.substr(2, 2), 16);
        let b: number = parseInt(color.substr(4, 2), 16);

        // Calculate the lighter color
        let lighterR: number = Math.round(r + (255 - r) * (percentage / 100));
        let lighterG: number = Math.round(g + (255 - g) * (percentage / 100));
        let lighterB: number = Math.round(b + (255 - b) * (percentage / 100));

        // Convert the lighter color back to hexadecimal format
        let lighterColor: string = "#" +
            lighterR.toString(16).padStart(2, "0") +
            lighterG.toString(16).padStart(2, "0") +
            lighterB.toString(16).padStart(2, "0");

        return lighterColor;
    }
}
