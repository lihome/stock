declare namespace custom {

  interface IError {
    errcode: number
    errmsg: string
  }

  type NullableError = IError | null;

  interface GeneralCallback<T> {
    (err: NullableError, result?: T): void
  }

  type AnyObjectCallback = GeneralCallback<IAnyObject>



}


interface Window {
  [s: string]: any
}