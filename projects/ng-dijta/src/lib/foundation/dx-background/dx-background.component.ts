import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface BgToken {
  label: string;
  token: string;
  cssVar: string;
  hex: string;
  onToken: string;
  onCssVar: string;
  category: 'surface' | 'brand' | 'alert';
}

/**
 * Background token explorer — displays all surface and semantic background tokens
 * from the design-system palette paired with their "on-*" text tokens.
 *
 * @example
 * ```html
 * <dx-background></dx-background>
 * ```
 */
@Component({
  selector: 'dx-background',
  templateUrl: './dx-background.component.html',
  styleUrls: ['./dx-background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxBackgroundComponent {
  selectedToken = '--dx-surface-variant';

  readonly tokens: BgToken[] = [
    // Surface
    {
      label: 'Surface',
      token: '--dx-surface',
      cssVar: 'var(--dx-surface, #ffffff)',
      hex: '#ffffff',
      onToken: '--dx-on-surface',
      onCssVar: 'var(--dx-on-surface, #2f2f2f)',
      category: 'surface',
    },
    {
      label: 'Surface Card',
      token: '--dx-surface-card',
      cssVar: 'var(--dx-surface-card, #ffffff)',
      hex: '#ffffff',
      onToken: '--dx-on-surface',
      onCssVar: 'var(--dx-on-surface, #2f2f2f)',
      category: 'surface',
    },
    {
      label: 'Surface Variant',
      token: '--dx-surface-variant',
      cssVar: 'var(--dx-surface-variant, #f3f7ff)',
      hex: '#f3f7ff',
      onToken: '--dx-on-surface-variant',
      onCssVar: 'var(--dx-on-surface-variant, #667085)',
      category: 'surface',
    },
    // Brand
    {
      label: 'Primary',
      token: '--dx-primary',
      cssVar: 'var(--dx-primary, #1f3bb3)',
      hex: '#1f3bb3',
      onToken: '--dx-on-primary',
      onCssVar: 'var(--dx-on-primary, #ffffff)',
      category: 'brand',
    },
    {
      label: 'Secondary',
      token: '--secondary-base',
      cssVar: 'var(--secondary-base, #fe5c83)',
      hex: '#fe5c83',
      onToken: '--secondary-on-base',
      onCssVar: 'var(--secondary-on-base, #ffffff)',
      category: 'brand',
    },
    // Alert semantic backgrounds
    {
      label: 'Success Light',
      token: '--alert-success-light',
      cssVar: 'var(--alert-success-light, #d4edda)',
      hex: '#d4edda',
      onToken: '--alert-success',
      onCssVar: 'var(--alert-success, #28a745)',
      category: 'alert',
    },
    {
      label: 'Warning Light',
      token: '--alert-warning-light',
      cssVar: 'var(--alert-warning-light, #ffe5b4)',
      hex: '#ffe5b4',
      onToken: '--alert-warning',
      onCssVar: 'var(--alert-warning, #ffa500)',
      category: 'alert',
    },
    {
      label: 'Error Light',
      token: '--alert-error-light',
      cssVar: 'var(--alert-error-light, #f8d7da)',
      hex: '#f8d7da',
      onToken: '--alert-error',
      onCssVar: 'var(--alert-error, #dc3545)',
      category: 'alert',
    },
    {
      label: 'Info Light',
      token: '--alert-information-light',
      cssVar: 'var(--alert-information-light, #d6e4ff)',
      hex: '#d6e4ff',
      onToken: '--alert-information',
      onCssVar: 'var(--alert-information, #007bff)',
      category: 'alert',
    },
  ];

  readonly categoryLabel: Record<string, string> = {
    surface: 'Surface',
    brand:   'Brand',
    alert:   'Semantic / Alert',
  };

  readonly categories = ['surface', 'brand', 'alert'] as const;

  get selected(): BgToken {
    return this.tokens.find(t => t.token === this.selectedToken) ?? this.tokens[2];
  }

  tokensFor(cat: string): BgToken[] {
    return this.tokens.filter(t => t.category === cat);
  }

  select(token: string): void {
    this.selectedToken = token;
  }
}
