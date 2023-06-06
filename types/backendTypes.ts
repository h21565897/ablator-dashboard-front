export enum ResponseCode {
    Success = 0,
    Failure = 1,
    NotAvailable = 2,
  }
export interface IResponseMessage<T> {
    code: ResponseCode;
    data: T;
    showMessage: string;
    errorMessage: string;
}


  