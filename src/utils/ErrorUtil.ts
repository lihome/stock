//@ts-ignore
import * as util from "util"

export enum ErrCodes {
  /** No Error */
  C0 = 0,

  C4000 = 4000,
  C4001 = 4001,
  C4002 = 4002,

}

/** 其他业务异常 */
export enum ErrCodes2 {
 

}

const mappings: Record<ErrCodes, string> = {
  [ErrCodes.C0] : "%s",
  [ErrCodes.C4000] : "Network",
  [ErrCodes.C4001] : "参数(%s)为空",
  [ErrCodes.C4002] : "参数(%s)无效",
  
};


export const buildError = (errCode: ErrCodes, ...params: any[]): custom.IError => {
  const errcode: number = errCode.valueOf();
  const errmsg: string = mappings[errCode] || "%s";

  return {
    errcode: errcode,
    errmsg:  util.format(errmsg, ...params)
  };
}

export const buildError2 = (errCode: ErrCodes2, errmsg: string): custom.IError => {
  const errcode: number = errCode.valueOf();
  return {
    errcode: errcode,
    errmsg:  errmsg
  };
}

export const buildLogError = (err: any, errCode: ErrCodes, ...params: any[]): custom.IError => {

  const buildErrorRet = buildError(errCode, ...params)

  console.error("[%s]%s, detail: %s", buildErrorRet.errcode, buildErrorRet.errmsg, err)

  return buildErrorRet
}

export const errorCallback = (errCode: ErrCodes, ...params: any[]): custom.GeneralCallback<void> => {
  return (err: any) => {
    if (err) {
      buildLogError(err, errCode, params)
    }
  }
}