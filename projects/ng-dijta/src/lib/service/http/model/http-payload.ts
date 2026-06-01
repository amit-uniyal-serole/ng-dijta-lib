
export interface PaginationRequest {
    pageNo?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
}
export interface HttpApiConfig {
    method: 'POST' | 'GET'
    rootUrl?: string;
    api: string;
    paginationRequest?: PaginationRequest;
    params?: {
      [key: string]: any
    };
    body?: any;
    headers?: {
      [name: string]: string | string[];
    };
    staticSearch?: string;
}
