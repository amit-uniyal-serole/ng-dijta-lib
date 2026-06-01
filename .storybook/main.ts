import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    // Foundations — design-token & typography reference pages (docs-only MDX).
    // These populate the "Foundations" sidebar group reserved in preview.ts.
    '../projects/ng-dijta/src/lib/stories/foundations/*.mdx',
    // Only the top-level story for each component folder — internal /
    // sub-component stories (e.g. dx-button/menu-panel/, dx-tree-v2/components/)
    // stay on disk but are hidden from the sidebar. Widen this glob if a
    // sub-component needs to be promoted to the public sidebar.
    '../projects/ng-dijta/src/lib/components/*/*.stories.@(ts|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
