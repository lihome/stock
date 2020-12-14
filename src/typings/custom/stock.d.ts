declare namespace stock {

  /** 走势 */
  interface Trend {
    // 日期
    date: string;
    // 当日收盘价
    price: number;
    // 汇率
    rate: number;
  }

  // 股票交易记录
  interface Trade {
    // 持有者
    owner: string;
    // 交易日期
    date: string;
    // 交易股票代码
    code: string;
    // 交易数量(股)
    qty: number;
    // 交易单价
    price: number;
    // 交易金额
    amt: number;
    // 交易备注
    remark: string;
  }

  // 持有者单只股票汇总
  interface OwnerCodeSummary {
    // 持有者
    owner: string;
    // 持有股票代码
    code: string;
    // 持有数量(股)
    qty: number;
    // 当前市场单价
    price: number;
    // 成本;
    cost: number;
    // 当前盈亏情况
    amt: number;
    // 备注
    remark: string;
    // 股票交易详情
    tradeList: Array<Trade>
  }

  // 
  interface OwnerCompareSummary {
    // 持有者
    owner: string;
    // 开始 持股数量(股)
    sqty: number;
    // 开始 盈亏情况
    samt: number;
    // 开始 股票代码列表
    scodeList: OwnerCodeSummary[];
    // 截止 持股数量(股)
    eqty: number;
    // 截止 成本
    ecost: number;
    // 截止 盈亏情况
    eamt: number;
    // 截止 股票代码列表
    ecodeList: OwnerCodeSummary[];
    // diff
    damt: number;
  }

  // 持有者股票汇总
  interface OwnerSummary {
    // 持有者
    owner: string;
    // 当前持股数量(股)
    qty: number,
    // 成本
    cost: number;
    // 当前盈亏情况
    amt: number;
    // 备注
    remark: string;
    // 按代码分组的详单
    codeList: OwnerCodeSummary[]
  }

}