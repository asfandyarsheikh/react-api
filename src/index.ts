import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  IInitialConfig,
  InitialConfig,
  IRestConfig,
  RestConfig,
} from './config';
import { defaultError } from './utils';
import { APIError, APIRaw, APIResponse, APISuccess } from './index.d';

class RestService {
  initialConfig: InitialConfig;

  constructor(initialConfig: IInitialConfig) {
    this.initialConfig = new InitialConfig(initialConfig);
  }

  private async manageToken(config: IRestConfig): Promise<string> {
    if (config.unauth) return null;
    if (config.token) {
      return config.token;
    }
    return this.initialConfig.reactApiGetToken();
  }

  private async manageConfig<T>(config: IRestConfig<T>): Promise<RestConfig> {
    const output = new RestConfig<T>(config);
    output.token = await this.manageToken(output);
    return output;
  }

  private async manageLoading(
    config: RestConfig,
    loading: boolean,
  ): Promise<void> {
    if (loading) {
      if (config.loadingStart) {
        config.loadingStart();
      } else if (config.displaySpinner) {
        this.initialConfig.reactApiShowSpinner(true);
      }
    } else if (config.loadingEnd) {
      config.loadingEnd();
    } else if (config.displaySpinner) {
      this.initialConfig.reactApiShowSpinner(false);
    }
  }

  private async sculpt(config: RestConfig): Promise<AxiosRequestConfig> {
    const {
      endpoint,
      data,
      token,
      headers = {},
      queryParams,
      urlParams,
    } = config;
    const { url, method } = endpoint;
    const finalHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    };

    if (token) {
      headers.Authorization = this.initialConfig.reactApiGetAuthHeader(token);
    }

    let options: AxiosRequestConfig = {
      ...this.initialConfig,
      method,
      headers: finalHeaders,
      url,
    };
    if (urlParams) {
      options.url = endpoint.getFinalUrl(urlParams);
    }

    if (queryParams) {
      options.params = queryParams;
    }

    if (data) {
      options.data = JSON.stringify(data);
    }

    return options;
  }

  private static async promise(
    options: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return axios(options);
  }

  async request<T>(
    config: IRestConfig<T>,
  ): Promise<APIResponse<APISuccess<T> | APIError>> {
    const finalConfig = await this.manageConfig<T>(config);
    const requestConfig = await this.sculpt(finalConfig);
    await this.manageLoading(finalConfig, true);
    try {
      const resp = await RestService.promise(requestConfig);
      return this.response<T>(finalConfig, resp);
    } catch (e) {
      return this.manageError(finalConfig, defaultError);
    }
  }

  private async response<T>(
    config: RestConfig<T>,
    axiosResponse: AxiosResponse<APIRaw>,
  ): Promise<APIResponse<APISuccess<T> | APIError>> {
    const apiResponse = this.initialConfig.reactApiProcessResponse(
      axiosResponse.data,
    );
    const { error, response } = apiResponse;
    if (error) {
      return this.manageError(config, (response || defaultError) as APIError);
    }
    return this.manageSuccess<T>(config, response as APISuccess<T>);
  }

  private async manageError(
    config: RestConfig,
    error: APIError,
  ): Promise<APIResponse<APIError>> {
    if (config.displayError) {
      this.initialConfig.reactApiDisplayError(error);
    }
    if (config.onError) {
      config.onError(error);
    }
    await this.manageLoading(config, false);
    return {
      error: true,
      success: false,
      response: error,
    };
  }

  private async manageSuccess<T>(
    config: RestConfig<T>,
    success: APISuccess<T>,
  ): Promise<APIResponse<APISuccess<T>>> {
    if (config.displaySuccess) {
      this.initialConfig.reactApiDisplaySuccess(success);
    }
    if (config.onSuccess) {
      config.onSuccess(success);
    }
    await this.manageLoading(config, false);
    return {
      error: false,
      success: true,
      response: success,
    };
  }
}

export default RestService;
