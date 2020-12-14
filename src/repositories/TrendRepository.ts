import { CsvUtil } from "@/utils/CsvUtil";
import { HttpUtil } from "@/utils/HttpUtil";


class TrendRepository {

  private cache: Record<string, stock.Trend[]> = {};
  private initialized: boolean = false;

  constructor() {
  }

  /**
   * 根据代码和日期找到最匹配的记录
   * @param code 
   * @param date 
   * @param callback 
   */
  async matchByCodeAndDate(code: string, date: string): Promise<stock.Trend> {
    console.log(date)
    const list = await this.listByCode(code)
    if (!list || !list.length) {
      return <stock.Trend>{};
    }
    let idx = list.length - 1;
    for (; idx >= 0; idx--) {
      const trend: stock.Trend = list[idx];
      if (trend.date < date) {
        idx++;
        break;
      }
    }
    
    if (idx < 0) {
      // 查找日期前的数据 没有定义时，取第一个记录
      idx = 0;
    }
    if (idx >= list.length) {
      // 查找日期后的数据 没有定义时，取最后一个记录
      idx = list.length - 1
    }
    return list[idx];
  }


  /**
   * 根据代码获取Trend列表
   * @param code 
   * @param callback 
   */
  async listByCode(code: string): Promise<stock.Trend[]> {
    const datas = await this.getAllDatas()
    return datas[code];
  }

  /**
   * 获取全部数据，目前实现基于解析网络的csv资源
   * @param callback 
   */
  private async getAllDatas(): Promise<Record<string, stock.Trend[]>> {
    if (this.initialized) {
      return this.cache;
    }

    const body = await HttpUtil.simpleGet("data/trend.csv")

    this.cache = this.parseData(body);
    this.initialized = true;
    
    return this.cache;
  }

  /**
   * 从文本中解析出结构化的数据
   * @param str 
   */
  private parseData(str: string): Record<string, stock.Trend[]> {

    const list: IStringObject[] = CsvUtil.parse(str)

    const ret: Record<string, stock.Trend[]> = {};
    for (const row of list) {
      const trend = <stock.Trend> {};
      trend.date = row.date;
      trend.price = parseFloat(row.price);
      trend.rate = parseFloat(row.rate);

      const code = row.code;
      let trendList = ret[code];
      if (!trendList) {
        ret[code] = trendList = [];
      }
      trendList.push(trend);
    }
    return ret;
  }
}

export const trendRepository = new TrendRepository();

