import { buildError, ErrCodes } from "./ErrorUtil";

export class HttpUtil {


  static simpleGet(url: string): Promise<string> {
    return this.ajax("get", url);
  }

  static ajax(method: string, url: string): Promise<string> {
    return new Promise((resovle: (value: string) => void, reject: (err: custom.NullableError) => void) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = (ev: ProgressEvent) => {
        resovle(xhr.responseText);
      };
      xhr.onerror = (ev: ProgressEvent) => {
        reject(buildError(ErrCodes.C4000));
      };
      xhr.open(method, url, true);
      xhr.send();
    });
  }
}
