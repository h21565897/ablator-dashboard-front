import { IResponseMessage, ResponseCode } from "@/types/backendTypes";

export function success<T>(data:T):IResponseMessage<T>{
    return {
        code:ResponseCode.Success,
        data:data,
        showMessage:"",
        errorMessage:""
    }
}
export function failure<T>(errorMessage:string):IResponseMessage<T>{
    return {
        code:ResponseCode.Failure,
        data:null as unknown as T,
        showMessage:"",
        errorMessage:errorMessage
    }
}