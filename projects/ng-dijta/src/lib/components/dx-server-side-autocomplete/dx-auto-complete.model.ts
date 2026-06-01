import { PaginationRequest } from "../dx-config-table";

export interface DxServerSideAutoCompleteConfig{
    method: 'POST' | 'GET'    
    api: string;
    paginationRequest?: PaginationRequest;
    params?:{
      [key:string]:any
    };        
    body?: any;
    headers?: {
      [name: string]: string | string[];
    }
    displayLabel:string;
    actualValue:string;
    searchPlaceholder?:string
  }