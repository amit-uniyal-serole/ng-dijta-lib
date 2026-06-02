import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface ShadowToken {
  name: string;
  token: string;
  cssValue: string;
  layers: number;
}

/**
 * Interactive elevation-scale explorer showing the 8-level `--dx-shadow-*`
 * token scale with live shadow applied to cards, inputs, images and chips,
 * plus a `.dx-shadow-*` utility-class reference.
 *
 * @example
 * ```html
 * <dx-shadow></dx-shadow>
 * ```
 */
@Component({
  selector: 'dx-shadow',
  templateUrl: './dx-shadow.component.html',
  styleUrls: ['./dx-shadow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxShadowComponent {
  selectedShadow = 'md';
  copiedClass: string | null = null;

  readonly tokens: ShadowToken[] = [
    { name: 'none', token: '--dx-shadow-none', cssValue: '0 0 #0000',                                                                layers: 1 },
    { name: '2xs',  token: '--dx-shadow-2xs',  cssValue: '0 1px 1px 0 rgba(17,24,39,.05)',                                           layers: 1 },
    { name: 'xs',   token: '--dx-shadow-xs',   cssValue: '0 1px 2.5px 0 rgba(17,24,39,.05)',                                         layers: 1 },
    { name: 'sm',   token: '--dx-shadow-sm',   cssValue: '0 1px 3px 0 rgba(17,24,39,.10),\n0 1px 2px 0 rgba(17,24,39,.10)',          layers: 2 },
    { name: 'md',   token: '--dx-shadow-md',   cssValue: '0 4px 6px 0 rgba(17,24,39,.10),\n0 2px 4px 0 rgba(17,24,39,.10)',          layers: 2 },
    { name: 'lg',   token: '--dx-shadow-lg',   cssValue: '0 10px 15px 0 rgba(17,24,39,.10),\n0 4px 6px 0 rgba(17,24,39,.10)',        layers: 2 },
    { name: 'xl',   token: '--dx-shadow-xl',   cssValue: '0 20px 25px 0 rgba(17,24,39,.10),\n0 8px 10px 0 rgba(17,24,39,.10)',       layers: 2 },
    { name: '2xl',  token: '--dx-shadow-2xl',  cssValue: '0 25px 50px 0 rgba(17,24,39,.10)',                                         layers: 1 },
  ];

  get selected(): ShadowToken {
    return this.tokens.find(t => t.name === this.selectedShadow) ?? this.tokens[4];
  }

  get demoStyle(): Record<string, string> {
    return { 'box-shadow': `var(${this.selected.token})` };
  }

  selectShadow(name: string): void { this.selectedShadow = name; }

  copyClass(cls: string): void {
    navigator.clipboard?.writeText(cls).then(() => {
      this.copiedClass = cls;
      setTimeout(() => (this.copiedClass = null), 1500);
    });
  }
}
