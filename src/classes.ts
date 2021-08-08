import { Method } from 'axios';
import forOwn from 'lodash/forOwn';

export interface IEndpoint {
  url: string;
  method?: Method;
}

export class Endpoint implements IEndpoint {
  method: Method;
  url: string;

  constructor(endpoint: IEndpoint) {
    this.method = endpoint.method || 'get';
    this.url = endpoint.url;
  }

  getFinalUrl(data: Record<string, any>): string {
    let output = '';
    forOwn(data, (value, param) => {
      output = this.url?.replace(new RegExp(`{${param}}`, 'g'), () =>
        String(value),
      );
    });
    return output;
  }
}
