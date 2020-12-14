import { trendRepository } from "@/repositories/TrendRepository"

class TrendService {
  
  matchByCodeAndDate(code: string, date: string): Promise<stock.Trend> {
    return trendRepository.matchByCodeAndDate(code, date);
  }
}

export const trendService = new TrendService();