import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DxAvatarComponent } from './dx-avatar.component';
import { DxAvatarModule } from './dx-avatar.module';

const meta: Meta<any> = {
  title: 'Data Display/Avatar',
  component: DxAvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [DxAvatarModule, HttpClientModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'User / company avatar with a fallback chain: tries `src` → social-network ids ' +
          '(facebook / twitter / google / instagram / vkontakte / skype / gravatar / github) → ' +
          'initials from `name`. Auto-generates a stable random color when no `bgColor` is set. ' +
          'Supports a company-logo mode (`isCompanyLogo`), record-profile rectangle mode ' +
          '(`isRecordProfile`), inline status badge (`avatarStatus`), and a corner footer badge ' +
          '(`footerBadge`). The companion `dx-avatar-group` (formerly a separate menu entry) ' +
          'shows the first three avatars with a "+N" menu — included below as a variant.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Initials source — used when no image is available.' },
    src: { control: 'text', description: 'Direct image URL — first item in the fallback chain.' },
    icon: { control: 'text', description: 'Material Icons name shown instead of initials.' },
    avatarSettings: { control: 'object', description: '`NgDxAvatarSettings` — `size`, `round`, `bgColor`, `fgColor`, `borderColor`, `cornerRadius`, `initialsSize`, `textSizeRatio`, `style`, `placeholder`, `avatarSrc`, `isImageUpload`.' },
    avatarStatus: { control: 'object', description: 'Inline status badge: `{ color, icon? }`.' },
    footerBadge: { control: 'object', description: 'Corner footer badge data.' },
    isCompanyLogo: { control: 'boolean', description: 'When `true`, falls back to the bundled `DefaultCompany.logo` instead of initials.' },
    isRecordProfile: { control: 'boolean', description: 'Square (non-rounded) layout for record/profile cards.' },
    gravatarId: { control: 'text', description: 'Gravatar email/hash.' },
    githubId: { control: 'text', description: 'GitHub username.' },
    facebookId: { control: 'text', description: 'Facebook user id.' },
    twitterId: { control: 'text', description: 'Twitter handle.' },
    googleId: { control: 'text', description: 'Google user id.' },
    clickOnAvatar: { action: 'clickOnAvatar' },
    onImageUpload: { action: 'onImageUpload' },
  },
  args: {
    name: 'Ada Lovelace',
    avatarSettings: { size: 64, round: true },
    isCompanyLogo: false,
    isRecordProfile: false,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <ndx-avatar
    [name]="name"
    [src]="src"
    [icon]="icon"
    [avatarSettings]="avatarSettings"
    [avatarStatus]="avatarStatus"
    [footerBadge]="footerBadge"
    [isCompanyLogo]="isCompanyLogo"
    [isRecordProfile]="isRecordProfile"
    [gravatarId]="gravatarId"
    [githubId]="githubId"
    [facebookId]="facebookId"
    [twitterId]="twitterId"
    [googleId]="googleId"
    (clickOnAvatar)="clickOnAvatar($event)">
  </ndx-avatar>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Initials fallback — no image provided, so the component renders "AL" on an auto-generated background tied to the name.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const FromImage: Story = {
  name: 'From image URL',
  args: { src: 'https://i.pravatar.cc/120?img=12' },
  parameters: {
    docs: {
      description: {
        story: '`[src]` is the first item in the fallback chain — if the URL loads, the image is used.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Initials: Story = {
  name: 'Initials only',
  args: { name: 'Grace Hopper' },
  parameters: {
    docs: {
      description: {
        story: 'Without `[src]` or social IDs the component derives initials from `[name]`.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const CustomColors: Story = {
  name: 'Custom colors',
  args: {
    name: 'Linus Torvalds',
    avatarSettings: { size: 64, round: true, bgColor: '#0F4C81', fgColor: '#FFFFFF', borderColor: '#0B3A66' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Override the auto-generated palette with `bgColor` / `fgColor` / `borderColor`.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Square: Story = {
  name: 'Square (record profile)',
  args: {
    name: 'Acme Inc.',
    isRecordProfile: true,
    avatarSettings: { size: 72, round: false, cornerRadius: 6 },
  },
  parameters: {
    docs: {
      description: {
        story: '`[isRecordProfile]="true"` switches to a flush rectangle — typical record / company-card layout.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Rounded: Story = {
  name: 'Rounded corners',
  args: {
    name: 'Globex Corp.',
    avatarSettings: { size: 64, round: false, cornerRadius: 12 },
  },
  parameters: {
    docs: {
      description: {
        story: 'Between square and circle — `round=false` + `cornerRadius=12`.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const CompanyLogo: Story = {
  name: 'Company logo fallback',
  args: { isCompanyLogo: true, avatarSettings: { size: 64, round: true } },
  parameters: {
    docs: {
      description: {
        story: '`[isCompanyLogo]="true"` falls back to the bundled `DefaultCompany.logo` placeholder when no image / initials source is provided.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const SizeMatrix: Story = {
  name: 'All sizes',
  parameters: {
    docs: {
      description: {
        story: 'Common sizes side-by-side. Each entry passes its size through `avatarSettings`.',
      },
    },
  },
  render: () => ({
    props: {
      sizes: [24, 32, 40, 56, 72, 96],
    },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <ndx-avatar *ngFor="let s of sizes" name="Ada Lovelace" [avatarSettings]="{ size: s, round: true }"></ndx-avatar>
      </div>
    `,
  }),
};

export const WithStatus: Story = {
  name: 'With status badge',
  args: {
    name: 'Margaret Hamilton',
    avatarStatus: { color: '#4CAF50' },
    avatarSettings: { size: 64, round: true },
  },
  parameters: {
    docs: {
      description: {
        story: '`[avatarStatus]="{ color }"` paints a dot in the corner — useful for online/offline indicators.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const WithStatusIcon: Story = {
  name: 'With status icon',
  args: {
    name: 'Margaret Hamilton',
    avatarStatus: { color: '#EF5350', icon: 'do_not_disturb_on' },
    avatarSettings: { size: 64, round: true },
  },
  parameters: {
    docs: {
      description: {
        story: 'When `avatarStatus.icon` is set the badge renders the Material Icon tinted by `color`.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const GithubFallback: Story = {
  name: 'GitHub fallback chain',
  args: { name: 'Octocat', githubId: 'octocat', avatarSettings: { size: 64, round: true } },
  parameters: {
    docs: {
      description: {
        story: '`[githubId]` pulls the user\'s avatar from GitHub — included only because the network call is public. Falls back to initials if the request fails.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const GravatarFallback: Story = {
  name: 'Gravatar fallback',
  args: { name: 'Anonymous', gravatarId: '00000000000000000000000000000000', avatarSettings: { size: 64, round: true } },
  parameters: {
    docs: {
      description: {
        story: '`[gravatarId]` resolves to a Gravatar URL — works with both email and hash.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const ImageUpload: Story = {
  name: 'Image upload affordance',
  args: {
    name: 'Ada Lovelace',
    avatarSettings: { size: 96, round: true, isImageUpload: true },
  },
  parameters: {
    docs: {
      description: {
        story: '`avatarSettings.isImageUpload=true` shows the upload affordance — `(onImageUpload)` fires with the picked file list.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Group: Story = {
  name: 'Avatar group (absorbed `dx-avatar-group`)',
  parameters: {
    docs: {
      description: {
        story: 'Stacked avatars with a "+N" overflow menu — formerly its own sidebar entry, now folded in here as a variant. Renders the first three avatars and collapses the rest into a menu.',
      },
    },
  },
  render: () => ({
    props: {
      groupSetting: { spacing: 8 },
      groupAvatarSettings: { size: 40, round: true, borderColor: '#FFFFFF' },
      few: [
        { fullName: 'Ada Lovelace', shortName: 'AL' },
        { fullName: 'Grace Hopper', shortName: 'GH' },
        { fullName: 'Margaret Hamilton', shortName: 'MH' },
      ],
      many: [
        { fullName: 'Ada Lovelace', shortName: 'AL' },
        { fullName: 'Grace Hopper', shortName: 'GH' },
        { fullName: 'Margaret Hamilton', shortName: 'MH' },
        { fullName: 'Linus Torvalds', shortName: 'LT' },
        { fullName: 'Bjarne Stroustrup', shortName: 'BS' },
        { fullName: 'Brendan Eich', shortName: 'BE' },
      ],
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, minmax(260px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">Three avatars (no overflow)</h4>
          <dx-avatar-group [data]="few" [setting]="groupSetting" [avatarSettings]="groupAvatarSettings"></dx-avatar-group>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">Six avatars (+3 overflow)</h4>
          <dx-avatar-group [data]="many" [setting]="groupSetting" [avatarSettings]="groupAvatarSettings"></dx-avatar-group>
        </div>
      </div>
    `,
  }),
};
