import { CsvUtil } from "@/utils/CsvUtil";
import { HttpUtil } from "@/utils/HttpUtil";


class TradeRepository {

  private cache: stock.Trade[] = [];
  private initialized: boolean = false;

  constructor() {
  }

  listAll(): Promise<stock.Trade[]> {
    return this.getAllDatas();
  }

  /**
   * 获取全部数据，目前实现基于解析网络的csv资源
   * @param callback 
   */
  private async getAllDatas(): Promise<stock.Trade[]> {
    if (this.initialized) {
      return this.cache;
    }

    const body = await HttpUtil.simpleGet("data/trade.csv");

    this.cache = this.parseData(body);
    this.initialized = true;
    return this.cache;
  }


  /**
   * 从文本中解析出结构化的数据
   * @param str 
   */
  parseData(str: string): stock.Trade[] {

    const datas: IStringObject[] = CsvUtil.parse(str);

    const ret: stock.Trade[] = [];
    for (const item of datas) {
      const trade = <stock.Trade> {};
      if (!item.owner) continue;
      trade.owner = item.owner;
      trade.date = item.date;
      trade.code = item.code;
      trade.price = parseFloat(item.price);
      trade.qty = parseInt(item.qty);
      trade.amt = parseFloat(item.amt);
      trade.remark = item.remark;

      ret.push(trade);
    }
    return ret;
  }
}

export const tradeRepository = new TradeRepository();