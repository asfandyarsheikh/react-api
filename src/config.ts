import { AxiosRequestConfig } from 'axios';
import { Endpoint, IEndpoint } from './classes';
import { APIError, APIRaw, APIResponse, APISuccess } from './index.d';
import { defaultError, processResponse } from './utils';

export interface IInitialConfig extends AxiosRequestConfig {
  displayError: (input: APIError) => void;
  displaySuccess: (input: APISuccess) => void;
  showSpinner: (input: boolean) => void;
  getAuthHeader: (token: string) => string;
  getToken: () => Promise<string>;
  processResponse?: (raw: APIRaw) => APIResponse;
  defaultError?: APIError;
}

export class InitialConfig {
  baseURL: string;
  xsrfHeaderName: string;
  timeout: number;
  validateStatus: (status: number) => boolean;
  reactApiProcessResponse: (raw: APIRaw) => APIResponse;
  reactApiDisplayError: (input: APIError) => void;
  reactApiDisplaySuccess: (input: APISuccess) => void;
  reactApiShowSpinner: (input: boolean) => void;
  reactApiGetAuthHeader: (token: string) => string;
  reactApiGetToken: () => Promise<string>;
  reactApiDefaultError: APIError;

  constructor(x: IInitialConfig) {
    this.baseURL = x.baseURL;
    this.timeout = x.timeout || 5000;
    this.xsrfHeaderName = x.xsrfHeaderName || 'X-CSRFToken';
    this.reactApiProcessResponse = x.processResponse || processResponse;
    this.reactApiDisplayError = x.displayError;
    this.reactApiDisplaySuccess = x.displaySuccess;
    this.reactApiShowSpinner = x.showSpinner;
    this.reactApiGetAuthHeader = x.getAuthHeader;
    this.reactApiGetToken = x.getToken;
    this.reactApiDefaultError = x.defaultError || defaultError;
    this.validateStatus =
      x.validateStatus ||
      ((status) => {
        return status >= 200 && status < 500;
      });
  }
}

export interface IRestConfig<T = unknown> {
  upload?: boolean;
  displaySuccess?: boolean;
  displayError?: boolean;
  unauth?: boolean;
  displaySpinner?: boolean;
  data?: any;
  endpoint: IEndpoint;
  token?: string;
  urlParams?: Record<string, string>;
  headers?: Record<string, string>;
  queryParams?: Record<string, any>;
  loadingStart?: () => void;
  loadingEnd?: () => void;
  onSuccess?: (response: T) => void;
  onError?: (error: APIError) => void;
}

export class RestConfig<T = unknown> {
  upload = false;
  displaySuccess = false;
  displayError = true;
  unauth = false;
  displaySpinner = true;
  data?: any;
  endpoint: Endpoint;
  token?: string;
  urlParams?: Record<string, string>;
  headers?: Record<string, string>;
  queryParams?: Record<string, any>;
  loadingStart?: () => void;
  loadingEnd?: () => void;
  onSuccess?: (response: APISuccess<T>) => void;
  onError?: (error: APIError) => void;

  constructor({ endpoint, ...config }: IRestConfig<T>) {
    Object.assign(this, config);
    this.endpoint = new Endpoint(endpoint);
  }
}
