import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
    selector: '[changeChipColor]'
})
export class ChangeChipColorDirective implements OnChanges {
    @Input('changeChipColor') color!: string;
    @Input('isIcon') isIcon: boolean = false;
    @Input('dot') dot: boolean = false;
    @Input('same') same: boolean = false;
    @Input('onlyBorder') onlyBorder: boolean = false;
    @Input('sameColor') sameColor: boolean = false;
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges(): void {
        this.changeColor(this.color);
    }

    private changeColor(color: string) {
        if (color) {
            if (this.isIcon) {
                this.renderer.setStyle(this.el.nativeElement, 'background-color', this.getLighterColor(color, 0, 0.10));
                this.renderer.setStyle(this.el.nativeElement, 'color', color);
                this.renderer.setStyle(this.el.nativeElement, 'border-color', this.getDarkerColor(color, 20));
            } else if (this.onlyBorder) {
                this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff');
                this.renderer.setStyle(this.el.nativeElement, 'color', color);
                this.renderer.setStyle(this.el.nativeElement, 'border-color', color);
            } else if (this.dot) {
                this.renderer.setStyle(this.el.nativeElement, 'background-color', this.getDarkerColor(color, 10));
            } else if (this.same) {
                this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
                this.renderer.setStyle(this.el.nativeElement, 'color', this.getContrastColor(color));
                this.renderer.setStyle(this.el.nativeElement, 'border-color', this.getDarkerColor(color, 40));
            } else if (this.sameColor) {
                this.renderer.setStyle(this.el.nativeElement, 'background-color', this.getLighterColor(color, 0, 0.10));
                this.renderer.setStyle(this.el.nativeElement, 'color', color);
                this.renderer.setStyle(this.el.nativeElement, 'box-shadow', `${this.getLighterColor(color, 90)} 0px 2px 4px 0px inset`);
            } else {
                this.renderer.setStyle(this.el.nativeElement, 'background-color', this.getLighterColor(color, 0, 0.50));
                this.renderer.setStyle(this.el.nativeElement, 'color', this.getContrastColor(color));
                this.renderer.setStyle(this.el.nativeElement, 'border-color', this.getDarkerColor(color, 40));
            }
        } else {
            this.renderer.setStyle(this.el.nativeElement, 'background-color', 'inherit');
            this.renderer.setStyle(this.el.nativeElement, 'color', 'inherit');
            this.renderer.setStyle(this.el.nativeElement, 'border-color', 'inherit');
        }
    }

    getContrastColor(color: string): string {
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
    getDarkerColor(color: string, percentage: number): string {
        // Remove the "#" symbol from the color
        color = color.replace("#", "");

        // Convert the color to RGB format
        let r: number = parseInt(color.substr(0, 2), 16);
        let g: number = parseInt(color.substr(2, 2), 16);
        let b: number = parseInt(color.substr(4, 2), 16);

        // Calculate the darker color
        let darkerR: number = Math.round(r * (1 - percentage / 100));
        let darkerG: number = Math.round(g * (1 - percentage / 100));
        let darkerB: number = Math.round(b * (1 - percentage / 100));

        // Convert the darker color back to hexadecimal format
        let darkerColor: string = "#" +
            darkerR.toString(16).padStart(2, "0") +
            darkerG.toString(16).padStart(2, "0") +
            darkerB.toString(16).padStart(2, "0");

        return darkerColor;
    }
    getLighterColor(color: string, percentage: number, opacity: number = 1): string {
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

        // Clamp opacity between 0 and 1
        opacity = Math.min(Math.max(opacity, 0), 1);

        // Return the color in RGBA format
        let rgbaColor: string = `rgba(${lighterR}, ${lighterG}, ${lighterB}, ${opacity})`;
        return rgbaColor;
    }


}
