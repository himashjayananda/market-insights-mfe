import type {
  CompanyOverview,
  IncomeStatement,
  BalanceSheet,
  CashFlow,
  NewsSentiment,
  SearchResponse,
} from "../types/api";

// Mock data imports
import companyOverviewData from "../../mocks/company-overview.json";
import companyOverviewMSFT from "../../mocks/company-overview-msft.json";
import incomeStatementData from "../../mocks/income-statement.json";
import incomeStatementMSFT from "../../mocks/income-statement-msft.json";
import balanceSheetData from "../../mocks/balance-sheet.json";
import balanceSheetMSFT from "../../mocks/balance-sheet-msft.json";
import cashFlowData from "../../mocks/cash-flow.json";
import cashFlowMSFT from "../../mocks/cash-flow-msft.json";
import newsSentimentData from "../../mocks/news-sentiment.json";
import newsSentimentMSFT from "../../mocks/news-sentiment-msft.json";
import searchResultsData from "../../mocks/search-results.json";
import timeSeriesDailyData from "../../mocks/time-series-daily.json";
import timeSeriesDailyMSFT from "../../mocks/time-series-daily-msft.json";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API client that simulates Alpha Vantage API behavior
export class MockApiClient {
  private baseDelay = 300; // Base delay in milliseconds

  async getCompanyOverview(symbol: string): Promise<CompanyOverview> {
    await delay(this.baseDelay + Math.random() * 200);

    const sym = symbol.toUpperCase();
    if (sym === "AAPL") return companyOverviewData as CompanyOverview;
    if (sym === "MSFT") return companyOverviewMSFT as CompanyOverview;

    throw new Error(`Company overview not found for symbol: ${symbol}`);
  }

  async getIncomeStatement(symbol: string): Promise<IncomeStatement> {
    await delay(this.baseDelay + Math.random() * 200);

    const sym = symbol.toUpperCase();
    if (sym === "AAPL") return incomeStatementData as IncomeStatement;
    if (sym === "MSFT") return incomeStatementMSFT as IncomeStatement;

    throw new Error(`Income statement not found for symbol: ${symbol}`);
  }

  async getBalanceSheet(symbol: string): Promise<BalanceSheet> {
    await delay(this.baseDelay + Math.random() * 200);

    const sym = symbol.toUpperCase();
    if (sym === "AAPL") return balanceSheetData as BalanceSheet;
    if (sym === "MSFT") return balanceSheetMSFT as BalanceSheet;

    throw new Error(`Balance sheet not found for symbol: ${symbol}`);
  }

  async getCashFlow(symbol: string): Promise<CashFlow> {
    await delay(this.baseDelay + Math.random() * 200);

    const sym = symbol.toUpperCase();
    if (sym === "AAPL") return cashFlowData as CashFlow;
    if (sym === "MSFT") return cashFlowMSFT as CashFlow;

    throw new Error(`Cash flow not found for symbol: ${symbol}`);
  }

  async getNewsSentiment(symbol: string): Promise<NewsSentiment> {
    await delay(this.baseDelay + Math.random() * 200);

    const sym = symbol.toUpperCase();
    if (sym === "AAPL") return newsSentimentData as NewsSentiment;
    if (sym === "MSFT") return newsSentimentMSFT as NewsSentiment;

    throw new Error(`News sentiment not found for symbol: ${symbol}`);
  }

  async getDailyTimeSeries(symbol: string): Promise<any> {
    await delay(this.baseDelay + Math.random() * 200);

    const sym = symbol.toUpperCase();
    if (sym === "AAPL") return timeSeriesDailyData as any;
    if (sym === "MSFT") return timeSeriesDailyMSFT as any;

    throw new Error(`Time series not found for symbol: ${symbol}`);
  }

  async searchCompanies(keywords: string): Promise<SearchResponse> {
    await delay(this.baseDelay + Math.random() * 200);

    // Filter results based on keywords
    const filteredResults = searchResultsData.bestMatches.filter(
      (result) =>
        result.name.toLowerCase().includes(keywords.toLowerCase()) ||
        result.symbol.toLowerCase().includes(keywords.toLowerCase())
    );

    return {
      bestMatches: filteredResults,
    };
  }
}

// Export singleton instance
export const mockApiClient = new MockApiClient();
