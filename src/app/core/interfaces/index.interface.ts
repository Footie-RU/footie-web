export interface RequestResponse {
  result: 'success' | 'error';
  message: string;
  data: any;
  statusCode?: number;
  error?: string;
}

export enum Languages {
  ENGLISH = 'en',
  FRENCH = 'fr',
  RUSSIAN = 'ru',
}

export interface LoginResponse {
  data: any;
  message?: string;
  result: 'success' | 'error';
}
