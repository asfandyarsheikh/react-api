type APIDisplay = {
  message: string;
  title: string;
  code: string;
  status: number;
};

export type APIError = APIDisplay;

export type APISuccess<T = unknown> = Partial<APIDisplay> & {
  data: T;
};

export type APIResponse<T = unknown> = {
  success: boolean;
  error: boolean;
  response: T;
};

export type APIRaw<R = unknown> = {
  error?: APIError;
  response?: R;
};
