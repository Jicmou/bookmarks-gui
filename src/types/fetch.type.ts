export enum ERedirect {
  FOLLOW = 'follow',
}

export enum EMethod {
  GET = 'GET',
  DELETE = 'DELETE',
  POST = 'POST',
  PUT = 'PUT',
}

export interface IRequestOptions {
  body?: string;
  method: EMethod;
  redirect: ERedirect;
}

export interface IResponse {
  json: () => Promise<any>;
  ok: boolean;
  status: number;
}

export type Fetch = (
  url: string,
  options: IRequestOptions,
) => Promise<IResponse>;
