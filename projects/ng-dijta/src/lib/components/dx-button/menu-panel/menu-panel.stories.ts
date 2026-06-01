import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MenuPanelComponent } from './menu-panel.component';
import { DxButtonModule } from '../dx-button.module';

const meta: Meta<any> = {
  title: 'Utilities/Button/Menu Panel',
  component: MenuPanelComponent,
  decorators: [
    moduleMetadata({
      imports: [DxButtonModule],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    items: { control: 'object', description: 'Type: `{ name: string, children: string[] }[]`.' },
  },
  args: {
    items: [],
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
