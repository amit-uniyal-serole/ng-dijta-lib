import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface ColorSwatch {
  name: string;
  hex: string;
  darkText?: boolean;
}

export interface ColorGroup {
  title: string;
  swatches: ColorSwatch[];
}

export interface ThemePalette {
  key: string;
  name: string;
  groups: ColorGroup[];
}

/**
 * Displays the full ng-dijta design-system color palette: theme palettes
 * (Persian Blue, Tune, Optus), semantic alert colors, and element colors.
 *
 * @example
 * ```html
 * <dx-color-palette></dx-color-palette>
 * ```
 */
@Component({
  selector: 'dx-color-palette',
  templateUrl: './dx-color-palette.component.html',
  styleUrls: ['./dx-color-palette.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxColorPaletteComponent {
  activeThemeKey = 'persian-blue';

  readonly themes: ThemePalette[] = [
    {
      key: 'persian-blue',
      name: 'Persian Blue',
      groups: [
        {
          title: 'Primary',
          swatches: [
            { name: 'Primary Base',  hex: '#1f3bb3' },
            { name: 'Primary Light', hex: '#354fbb' },
            { name: 'Primary Dark',  hex: '#13236b' },
            { name: 'On Primary',    hex: '#ffffff', darkText: true },
          ],
        },
        {
          title: 'Two Toned',
          swatches: [{ name: 'Two Toned', hex: '#17b0ff' }],
        },
        {
          title: 'Primary Opacity',
          swatches: [
            { name: '20%', hex: 'rgba(51, 90, 249, 0.2)', darkText: true },
            { name: '10%', hex: 'rgba(51, 90, 249, 0.1)', darkText: true },
          ],
        },
        {
          title: 'Secondary',
          swatches: [
            { name: 'Secondary Base', hex: '#fe5c83' },
            { name: 'On Secondary',   hex: '#ffffff', darkText: true },
          ],
        },
      ],
    },
    {
      key: 'tune',
      name: 'Tune / Arise',
      groups: [
        {
          title: 'Primary',
          swatches: [
            { name: 'Primary Base',  hex: '#cc0000' },
            { name: 'Primary Light', hex: '#ff0000' },
            { name: 'Primary Dark',  hex: '#990000' },
            { name: 'On Primary',    hex: '#ffffff', darkText: true },
          ],
        },
        {
          title: 'Two Toned',
          swatches: [{ name: 'Two Toned', hex: '#f2994a', darkText: true }],
        },
        {
          title: 'Secondary',
          swatches: [
            { name: 'Secondary Base', hex: '#f2994a', darkText: true },
            { name: 'On Secondary',   hex: '#ffffff', darkText: true },
          ],
        },
      ],
    },
    {
      key: 'optus',
      name: 'SeaNeo / Optus',
      groups: [
        {
          title: 'Primary',
          swatches: [
            { name: 'Primary Base',  hex: '#388188' },
            { name: 'Primary Light', hex: '#4c8e94' },
            { name: 'Primary Dark',  hex: '#2d676d' },
            { name: 'On Primary',    hex: '#ffffff', darkText: true },
          ],
        },
        {
          title: 'Two Toned',
          swatches: [{ name: 'Two Toned', hex: '#ffe145', darkText: true }],
        },
        {
          title: 'Secondary',
          swatches: [
            { name: 'Secondary Base', hex: '#ffda28', darkText: true },
            { name: 'On Secondary',   hex: '#2f2f2f' },
          ],
        },
      ],
    },
  ];

  readonly alertGroups: ColorGroup[] = [
    {
      title: 'Information',
      swatches: [
        { name: 'Information',   hex: '#007bff' },
        { name: 'Info Light',    hex: '#d6e4ff', darkText: true },
      ],
    },
    {
      title: 'Warning',
      swatches: [
        { name: 'Warning',       hex: '#ffa500', darkText: true },
        { name: 'Warning Light', hex: '#ffe5b4', darkText: true },
      ],
    },
    {
      title: 'Success',
      swatches: [
        { name: 'Success',       hex: '#28a745' },
        { name: 'Success Light', hex: '#d4edda', darkText: true },
      ],
    },
    {
      title: 'Error',
      swatches: [
        { name: 'Error',         hex: '#dc3545' },
        { name: 'Error Light',   hex: '#f8d7da', darkText: true },
      ],
    },
    {
      title: 'Notice',
      swatches: [
        { name: 'Notice',        hex: '#17a2b8' },
        { name: 'Notice Light',  hex: '#d1ecf1', darkText: true },
      ],
    },
    {
      title: 'Critical',
      swatches: [
        { name: 'Critical',      hex: '#b00020' },
        { name: 'Critical Light',hex: '#f8d7da', darkText: true },
      ],
    },
  ];

  readonly elementGroups: ColorGroup[] = [
    {
      title: 'Background & Surface',
      swatches: [
        { name: 'Background',  hex: '#f6f7fb', darkText: true },
        { name: 'On Surface',  hex: '#2f2f2f' },
      ],
    },
    {
      title: 'Disabled',
      swatches: [
        { name: 'Disable Dark',  hex: '#888888' },
        { name: 'Disable Light', hex: '#c3c3c3', darkText: true },
      ],
    },
  ];

  get activeTheme(): ThemePalette {
    return this.themes.find(t => t.key === this.activeThemeKey) ?? this.themes[0];
  }

  hexLabel(hex: string): string {
    if (!hex.startsWith('#')) return hex;
    return '#' + hex.slice(1).toUpperCase();
  }
}
