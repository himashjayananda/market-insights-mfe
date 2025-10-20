import type { IncomeStatement, BalanceSheet, CashFlow } from "../types";

// Mock data imports
import incomeStatementData from "../mocks/income-statement.json";
import incomeStatementMSFT from "../mocks/income-statement-msft.json";
import balanceSheetData from "../mocks/balance-sheet.json";
import balanceSheetMSFT from "../mocks/balance-sheet-msft.json";
import cashFlowData from "../mocks/cash-flow.json";
import cashFlowMSFT from "../mocks/cash-flow-msft.json";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Financials-specific API client
export class FinancialsApiClient {
  private baseDelay = 300; // Base delay in milliseconds

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
}

// Export singleton instance
export const financialsApiClient = new FinancialsApiClient();
