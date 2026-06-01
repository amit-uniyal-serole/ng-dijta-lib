import type { Decorator } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Type } from '@angular/core';

/**
 * Wrap a `<dx-*>` story render template with consistent demo chrome:
 * spacing + a max-width container so stories breathe in the Storybook canvas.
 */
export const demoWrap = (inner: string, opts?: { width?: string }) => `
  <div style="padding: 24px; max-width: ${opts?.width ?? '720px'};">
    ${inner}
  </div>
`;

/**
 * Variant-matrix helper: renders the same component once per `value` of the
 * given input, side by side. Useful for `AllSizes` / `AllVariants` stories.
 *
 * @example
 * render: () => ({ template: variantMatrix('dx-button', 'size', ['small', '', 'big'], 'Click me') })
 */
export const variantMatrix = (
  selector: string,
  inputName: string,
  values: readonly string[],
  innerHtml: string,
  extraAttrs = ''
) => `
  <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
    ${values
      .map(
        (v) => `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
            <span style="font-size: 11px; color: #666;">${inputName} = "${v}"</span>
            <${selector} ${inputName}="${v}" ${extraAttrs}>${innerHtml}</${selector}>
          </div>`
      )
      .join('')}
  </div>
`;

/**
 * Build a `moduleMetadata` decorator that imports the component's own
 * NgModule. Keeps story files terse for the common case.
 */
export const withModule = (mod: Type<unknown>): Decorator =>
  moduleMetadata({ imports: [mod] });
