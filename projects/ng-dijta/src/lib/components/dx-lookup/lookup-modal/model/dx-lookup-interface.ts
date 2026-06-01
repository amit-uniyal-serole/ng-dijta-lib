import { Observable } from "rxjs";
import { KeyValueModel } from "../../../../core/UI/model/keyValue";
import { PaginationRequest } from "../../../dx-config-table";
import { DxTableColumn, DxTableData, DxTableSetting } from "../../../dx-table";

export interface LookupModalHeaderSettings {
  title?: string;
  searchInputLabel?: string;
  // Applicable  for service defined title
  titlePrefix?: string;
  isServiceDefined?: boolean;
}
export interface LookupApiConfig<T> {
  method: 'POST' | 'GET' | 'DELETE'
  rootUrl?: string;
  api: string;
  paginationRequest?: PaginationRequest;
  params?: {
    [key: string]: any
  };
  searchBasedOn?: keyof T;
  searchBasedOperator?: string;
  newSearchFilter?: SearchFilter<T>;
  transformPayload?: any;
  body?: any;
  customSearchWithGenriceService?: boolean;
  headers?: {
    [name: string]: string | string[];
  };
  staticSearch?: string;
  transformRecord?: any
  responseType?: any;
  disableInitialCall?: boolean;
  hideRest?: boolean;
  observe?: 'body' | 'response';
}
export interface SearchParams<T> {
  field: T;
  label: string;
  value?: string | boolean | number;
  type?: 'TEXT' | 'SELECT';
  option?: KeyValueModel[];
  search?: 'eq' | 'sw' | string;
  options$?: Observable<KeyValueModel[]>;
}
export interface SearchFilter<T> {
  isServerSearch: boolean;
  searchParams: SearchParams<T>[];
}


export type ModuleRecordModel = {
  module: string
  action: string
  paginationRequest: {
    search: string
    pageNo: number
    pageSize: number
    sortBy: string
    sortOrder: string
  }
  response: ResponseContent
}
export interface ResponseContent {
  content: Array<any>
  pageable: {
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  numberOfElements: number
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  }
  size: number
  number: number
  empty: boolean
};


export interface FormBuilderModuleDefinitionDto {
  apiName?: string;
  customViewList?: DxCustomViewList;
  layout?: any;
  moduleLabel?: string;
  moduleName?: string;
  modulePluralName?: string;
  recordIdentifier?: string;
}
interface DxCustomViewList {
  customView?: Array<CustomViewList>;
  defaultView?: CustomViewList;
}

interface CustomViewList {
  customViewId?: number;
  customViewName?: string;
}

export interface LookupModalActions {
  enable?: boolean;
}

export interface FileUploadConfig {
  /** Endpoint that accepts the uploaded file and returns matching records. */
  apiConfig: LookupApiConfig<any>;
  /** Form-data field name for the file. @default 'file' */
  fileFieldName?: string;
  /** Accept attribute for <input type="file">. @default '.csv' */
  accept?: string;
  /** Max file size in bytes. @default 10 * 1024 * 1024 (10 MB) */
  maxSize?: number;
  /** Optional payload builder. Receives the file + apiConfig, returns the body
   *  used for the upload request (FormData by default if omitted). */
  payloadTransform?: (file: File, apiConfig: LookupApiConfig<any>) => unknown;
  /** Helper text shown below the upload button. */
  helperText?: string;
  /** Upload button label. @default 'Upload File' */
  buttonLabel?: string;
  /** Optional sample file users can download to see the expected upload format.
   *  When provided, a "Download sample" link renders in the drop-zone empty state.
   *  The library opens `url` via a synthesized `<a href download>` — no Blob, no body building. */
  sampleFile?: {
    /** URL pointing at the sample file. Typically provided by the backend (signed URL, CDN, static asset). */
    url: string;
    /** Optional suggested download filename — sets the `download` attribute on the anchor.
     *  When omitted, the browser uses Content-Disposition or the URL's last path segment. */
    fileName?: string;
  };
}


export interface SelectedRecordsModel {
  selectedRecords: DxTableData<any>[];
  recordIdentifier: string;
}

export interface MultiRecordSelectedIds {
  page?: number;
  ids?: number[];
  data?: DxTableData<any>[];
}



export interface DxLookupModalConfig {
  idName: IdNameModel | 'CUSTOM_MODULE';
  lookupApiConfig: LookupApiConfig<any>;
  tableSettings?: DxTableSetting | undefined;
  isGenericService?: boolean;
  columns?: DxTableColumn<any>[];
  lookUpHeaderSettings?: LookupModalHeaderSettings | undefined;
  listTransform?: any;
  additionalFilter?: AdditionalFilter[];
  config?: {
    [key: string]: any;
  }
  dropdownContentTransform?: any;
  recordIdentifier?: string;
  recordIdentifierId?: string;
  recordIdentifierSubtitle?: string;
  submitButtonTitle?: string;
  saveConfig?: {
    apiConfig?: LookupApiConfig<any>;
    payloadTransform?: any;
  };
  fileUploadConfig?: FileUploadConfig;
  tabs?: {
    title: string;
    submitButtonTitle?: string;
    lookupApiConfig: LookupApiConfig<any>;
    saveConfig?: {
      apiConfig?: LookupApiConfig<any>;
      payloadTransform?: any;
      successMessage?: string;
    };
    fileUploadConfig?: FileUploadConfig;
  }[];
}

export interface AdditionalFilter {
  label?: string;
  operator?: string;
  field?: string;
  type: 'TEXT' | 'SELECT' | 'CHIP';
  multi?: boolean;
  options?: KeyValueModel[];
  options$?: Observable<KeyValueModel[]>;
  value: string | string[];
  colSize?: string;
  hint?: string;
  maxLength?: number;
}
export interface IdNameModel {
  id: string;
  name: string;
  subtitle?: string;
}

