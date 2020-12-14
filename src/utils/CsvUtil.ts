export class CsvUtil {

  static parse(str: string): IStringObject[] {

    let csvArray: Array<string> = str.split(/\r\n|\r|\n/)

    const headers: Array<string> = csvArray[0].split(",")

    const colLen = headers.length

    const ret: IStringObject[] = []

    for (let rowIdx = 1; rowIdx < csvArray.length; rowIdx++) {
      const rowArray = csvArray[rowIdx].split(",")
      const rowData: IStringObject = {}
      for (let colIdx = 0; colIdx < rowArray.length && colIdx < colLen; colIdx++) {
        rowData[headers[colIdx]] = rowArray[colIdx]
      }
      ret.push(rowData)
    }
    return ret
  }

}
