import { tradeRepository } from "../repositories/TradeRepository";

import { trendService } from "../services/TrendService"
import moment from "moment";

class TradeService {
  
  private KEY_SEP = "__$$__";

  public async ownerSummary(): Promise<stock.OwnerSummary[]> {
    const list: stock.Trade[] = await tradeRepository.listAll();

    return Object.values(await this.summaryByOwner(list, moment().format("YYYY-MM-DD")));
  }

  public async ownerSummaryFromImport(str: string): Promise<stock.OwnerSummary[]> {
    const list: stock.Trade[] = tradeRepository.parseData(str)

    return Object.values(await this.summaryByOwner(list, moment().format("YYYY-MM-DD")));
  }


  public async compareQuery(sdate: string, edate: string): Promise<stock.OwnerCompareSummary[]> {
    const list: stock.Trade[] = await tradeRepository.listAll();

    const slist: stock.Trade[] = [];
    const elist: stock.Trade[] = [];
    for (const trade of list) {
      if (trade.date <= sdate) {
        slist.push(trade);
        elist.push(trade);
        continue;
      }
      if (trade.date <= edate) {
        elist.push(trade);
      }
    }

    const sOwnersSummary: Record<string, stock.OwnerSummary> = await this.summaryByOwner(slist, sdate);
    const eOwnersSummary: Record<string, stock.OwnerSummary> = await this.summaryByOwner(elist, edate);

    return this.mergeToCompareSummary(sOwnersSummary, eOwnersSummary);
  }

  private mergeToCompareSummary(summary1: Record<string, stock.OwnerSummary>, summary2: Record<string, stock.OwnerSummary>): stock.OwnerCompareSummary[] {
    const ownerList = Object.keys(summary1)
    for (const owner in summary2) {
      if (!summary1[owner]) {
        ownerList.push(owner)
      }
    }
    const ret: stock.OwnerCompareSummary[] = []
    for (const owner of ownerList) {
      const sOwnerSummary = summary1[owner] || {};
      const eOwnerSummary = summary2[owner] || {};

      const compareSummary = <stock.OwnerCompareSummary> {};
      compareSummary.owner = owner;

      compareSummary.sqty = sOwnerSummary.qty || 0;
      compareSummary.samt = sOwnerSummary.amt || 0;
      compareSummary.scodeList = sOwnerSummary.codeList || [];

      compareSummary.eqty = eOwnerSummary.qty || 0;
      compareSummary.ecost = eOwnerSummary.cost || 0;
      compareSummary.eamt = eOwnerSummary.amt || 0;
      compareSummary.ecodeList = eOwnerSummary.codeList || [];
      compareSummary.damt = compareSummary.eamt - compareSummary.samt;

      ret.push(compareSummary);
    }

    return ret;
  }


  private async summaryByOwner(tradeList: stock.Trade[], refDate: string): Promise<Record<string, stock.OwnerSummary>> {
    
    const ownerCodeList = await this.summaryByOwnerAndCode(tradeList, refDate);
    
    const ret: Record<string, stock.OwnerSummary> = {};

    for (const ownerCodeSummary of ownerCodeList) {
      const owner = ownerCodeSummary.owner;
      let ownerSummary: stock.OwnerSummary = ret[owner]
      if (!ownerSummary) {
        ret[owner] = ownerSummary = <stock.OwnerSummary> {
          owner: owner,
          qty: 0,
          cost: 0,
          amt: 0,
          remark: "",
          codeList: [],
        };
      }
      ownerSummary.qty += ownerCodeSummary.qty;
      ownerSummary.amt += ownerCodeSummary.amt;
      ownerSummary.cost += ownerCodeSummary.cost;
      ownerSummary.codeList.push(ownerCodeSummary);
    }
    return ret;
  }

  /**
   * 按照人和code分组统计
   * @param tradeList 
   */
  private async summaryByOwnerAndCode(tradeList: Array<stock.Trade>, refDate: string) : Promise<stock.OwnerCodeSummary[]> {
    // 每人的每只股票 -> 交易明细列表
    const ownerCode2tradeList: Record<string, stock.Trade[]> = {};
    // 所有股票代码列表，用于获取当前价格
    const codes = new Set<string>();
    for (const trade of tradeList) {
      const key = trade.owner + this.KEY_SEP + trade.code;
      let transList = ownerCode2tradeList[key];
      if (!transList) {
        ownerCode2tradeList[key] = transList = [];
      }
      transList.push(trade);
      codes.add(trade.code);
    }
      
    const ret: stock.OwnerCodeSummary[] = [];
    
    for (const ownerCode in ownerCode2tradeList) {
      const ownerAndCode = ownerCode.split(this.KEY_SEP);
      const owner = ownerAndCode[0];
      const code = ownerAndCode[1];
      const tradeList = ownerCode2tradeList[ownerCode];

      const currTrend = await trendService.matchByCodeAndDate(code, refDate);
      const currPrice: number = currTrend.price;

      const ownerCodeSummary = <stock.OwnerCodeSummary>{};
      ownerCodeSummary.owner = owner;
      ownerCodeSummary.code = code;
      ownerCodeSummary.qty = 0;
      ownerCodeSummary.price = currPrice;
      ownerCodeSummary.cost = 0;
      ownerCodeSummary.amt = 0;
      ownerCodeSummary.tradeList = tradeList;

      for (const trade of tradeList) {
        ownerCodeSummary.qty += trade.qty;
        ownerCodeSummary.cost += trade.amt;
        ownerCodeSummary.amt += trade.amt;
      }

      if (ownerCodeSummary.qty != 0) {
        // 预估可卖出的金额
        const amt = (-1) * ownerCodeSummary.qty * currPrice * currTrend.rate
        ownerCodeSummary.amt += amt;

        tradeList.push(<stock.Trade>{
          owner: owner,
          date: "持有中",
          qty: ownerCodeSummary.qty,
          price: currPrice,
          amt: amt,
          remark: "预估"
        })
      }
      ret.push(ownerCodeSummary);
    }
    return ret;
  }
}

export const tradeService = new TradeService();