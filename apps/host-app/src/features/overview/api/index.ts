import type { CompanyOverview, TimeSeriesData } from "../types";

// Mock data imports
import companyOverviewData from "../mocks/company-overview.json";
import companyOverviewMSFT from "../mocks/company-overview-msft.json";
import timeSeriesDailyData from "../mocks/time-series-daily.json";
import timeSeriesDailyMSFT from "../mocks/time-series-daily-msft.json";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Overview-specific API client
export class OverviewApiClient {
  private baseDelay = 300; // Base delay in milliseconds

  async getCompanyOverview(symbol: string): Promise<CompanyOverview> {
    await delay(this.baseDelay + Math.random() * 200);

    const sym = symbol.toUpperCase();
    if (sym === "AAPL") return companyOverviewData as CompanyOverview;
    if (sym === "MSFT") return companyOverviewMSFT as CompanyOverview;

    throw new Error(`Company overview not found for symbol: ${symbol}`);
  }

  async getDailyTimeSeries(symbol: string): Promise<TimeSeriesData> {
    await delay(this.baseDelay + Math.random() * 200);

    const sym = symbol.toUpperCase();
    if (sym === "AAPL") return timeSeriesDailyData as TimeSeriesData;
    if (sym === "MSFT") return timeSeriesDailyMSFT as TimeSeriesData;

    throw new Error(`Time series not found for symbol: ${symbol}`);
  }
}

// Export singleton instance
export const overviewApiClient = new OverviewApiClient();
