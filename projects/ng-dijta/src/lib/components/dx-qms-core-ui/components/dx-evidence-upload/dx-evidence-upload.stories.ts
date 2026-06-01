import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxEvidenceUploadComponent } from './dx-evidence-upload.component';
import { DxQmsCoreUiModule } from '../../dx-qms-core-ui.module';

const meta: Meta<any> = {
  title: 'Utilities/Qms Core Ui/Evidence Upload',
  component: DxEvidenceUploadComponent,
  decorators: [
    moduleMetadata({
      imports: [DxQmsCoreUiModule],
    }),
  ],
  argTypes: {
    initialEvidenceUploadStatus: { control: 'text', description: 'Type: `string`.' },
    quoteNr: { control: 'text', description: 'Type: `string`.' },
    showFilteredUploadedEvidenceList: { control: 'boolean', description: 'Type: `boolean`.' },
    disabledEvidenceUpload: { control: 'boolean', description: 'Type: `boolean`.' },
    disabledUploadLater: { control: 'boolean', description: 'Type: `boolean`.' },
    evidenceTitle: { control: 'text', description: 'Type: `string`.' },
    uploadLaterVisible: { control: 'boolean', description: 'Type: `boolean`.' },
    statusList: { control: 'object', description: 'Type: `KeyValueModel[]`.' },
    quote: { control: 'object', description: 'Type: `any | undefined`.' },
    evidenceList: { control: 'object', description: 'Type: `EvidenceModel[] | undefined`.' },
    rootUrl: { control: 'object', description: 'Type: `string | undefined`.' },
    fileSizeinByte: { control: 'number', description: 'Type: `number`.' },
    isAgent: { control: 'boolean', description: 'Type: `boolean`.' },
    isSales: { control: 'boolean', description: 'Type: `boolean`.' },
    loginUser: { control: 'object', description: 'Type: `string | undefined`.' },
    actions: { control: 'object', description: 'Type: `DxEvidenceActionPermission[] | undefined`.' },
    productCd: { control: 'object', description: 'Type: `string | undefined`.' },
    customNoEvidenceMsg: { control: 'object', description: 'Type: `string @Input() specialDocTypes!: string[]`.' },
    mandatoryDocTypes: { control: 'object', description: 'Type: `string[]`.' },
    evidenceListEmit: { action: 'evidenceListEmit' },
    sendUploadCheckbox: { action: 'sendUploadCheckbox' },
  },
  args: {
    initialEvidenceUploadStatus: 'TBVD',
    quoteNr: 'Sample',
    showFilteredUploadedEvidenceList: true,
    disabledEvidenceUpload: false,
    disabledUploadLater: false,
    evidenceTitle: '',
    uploadLaterVisible: false,
    statusList: [],
    quote: {},
    evidenceList: {},
    rootUrl: 'Sample',
    fileSizeinByte: 10485760,
    isAgent: false,
    isSales: false,
    loginUser: 'Sample',
    actions: {},
    productCd: 'Sample',
    customNoEvidenceMsg: [],
    mandatoryDocTypes: [],
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
