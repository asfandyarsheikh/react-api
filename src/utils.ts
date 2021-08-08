import { APIError, APIRaw, APIResponse } from './index.d';

export function isAPIError(response: APIResponse): boolean {
  return !response || response.error || !response.success;
}

export const defaultError: APIError = {
  title: 'Goblin attack!',
  message: 'An unknown error has occurred :(',
  code: 'DEFAULT_ERROR',
  status: 400,
};

export function processResponse<T>(raw: APIRaw<T>): APIResponse {
  if (raw.error || raw.response === undefined || raw.response === null) {
    return {
      response: raw.error,
      success: false,
      error: true,
    } as APIResponse<APIError>;
  }
  return {
    response: raw.response,
    success: true,
    error: false,
  } as APIResponse<T>;
}
