// Alpha Vantage API Response Types

export interface CompanyOverview {
  Symbol: string;
  AssetType: string;
  Name: string;
  Description: string;
  CIK: string;
  Exchange: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  Address: string;
  FiscalYearEnd: string;
  LatestQuarter: string;
  MarketCapitalization: string;
  EBITDA: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  DividendPerShare: string;
  DividendYield: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  "52WeekHigh": string;
  "52WeekLow": string;
  "50DayMovingAverage": string;
  "200DayMovingAverage": string;
  SharesOutstanding: string;
  DividendDate: string;
  ExDividendDate: string;
}

export interface IncomeStatement {
  symbol: string;
  annualReports: Array<{
    fiscalDateEnding: string;
    reportedCurrency: string;
    totalRevenue: string;
    totalOperatingExpense: string;
    costOfRevenue: string;
    grossProfit: string;
    ebit: string;
    ebitda: string;
    depreciation: string;
    depreciationAndAmortization: string;
    incomeBeforeTax: string;
    incomeTaxExpense: string;
    interestIncome: string;
    interestExpense: string;
    netInterestIncome: string;
    otherOperatingExpense: string;
    operatingIncome: string;
    netIncome: string;
    researchAndDevelopment: string;
    effectOfAccountingCharges: string;
    incomeBeforeTaxProvision: string;
    provisionForIncomeTax: string;
    netIncomeFromContinuingOps: string;
    netIncomeFromContinuingOperationNetMinorityInterest: string;
    netIncomeFromContinuingOperationNetMinorityInterestUSD: string;
    operatingExpense: string;
    nonOperatingIncomeNetOther: string;
    netIncomeIncludingNoncontrollingInterests: string;
    netIncomeIncludingNoncontrollingInterestsUSD: string;
    netIncomeCommonStockholders: string;
    netIncomeCommonStockholdersUSD: string;
    netIncomeNonControllingInterests: string;
    netIncomeNonControllingInterestsUSD: string;
    netIncomeDiscontinuedOperations: string;
    netIncomeDiscontinuedOperationsUSD: string;
    preferredStockAndOtherAdjustments: string;
    netIncomeApplicableToCommonShares: string;
    netIncomeApplicableToCommonSharesUSD: string;
  }>;
  quarterlyReports: Array<{
    fiscalDateEnding: string;
    reportedCurrency: string;
    totalRevenue: string;
    totalOperatingExpense: string;
    costOfRevenue: string;
    grossProfit: string;
    ebit: string;
    ebitda: string;
    depreciation: string;
    depreciationAndAmortization: string;
    incomeBeforeTax: string;
    incomeTaxExpense: string;
    interestIncome: string;
    interestExpense: string;
    netInterestIncome: string;
    otherOperatingExpense: string;
    operatingIncome: string;
    netIncome: string;
    researchAndDevelopment: string;
    effectOfAccountingCharges: string;
    incomeBeforeTaxProvision: string;
    provisionForIncomeTax: string;
    netIncomeFromContinuingOps: string;
    netIncomeFromContinuingOperationNetMinorityInterest: string;
    netIncomeFromContinuingOperationNetMinorityInterestUSD: string;
    operatingExpense: string;
    nonOperatingIncomeNetOther: string;
    netIncomeIncludingNoncontrollingInterests: string;
    netIncomeIncludingNoncontrollingInterestsUSD: string;
    netIncomeCommonStockholders: string;
    netIncomeCommonStockholdersUSD: string;
    netIncomeNonControllingInterests: string;
    netIncomeNonControllingInterestsUSD: string;
    netIncomeDiscontinuedOperations: string;
    netIncomeDiscontinuedOperationsUSD: string;
    preferredStockAndOtherAdjustments: string;
    netIncomeApplicableToCommonShares: string;
    netIncomeApplicableToCommonSharesUSD: string;
  }>;
}

export interface BalanceSheet {
  symbol: string;
  annualReports: Array<{
    fiscalDateEnding: string;
    reportedCurrency: string;
    totalAssets: string;
    totalCurrentAssets: string;
    cashAndCashEquivalentsAtCarryingValue: string;
    cashAndShortTermInvestments: string;
    inventory: string;
    currentNetReceivables: string;
    totalNonCurrentAssets: string;
    propertyPlantEquipment: string;
    accumulatedDepreciationAmortizationPPE: string;
    intangibleAssets: string;
    intangibleAssetsExcludingGoodwill: string;
    goodwill: string;
    investments: string;
    longTermInvestments: string;
    shortTermInvestments: string;
    otherCurrentAssets: string;
    otherNonCurrentAssets: string;
    totalLiabilities: string;
    totalCurrentLiabilities: string;
    currentAccountsPayable: string;
    deferredRevenue: string;
    currentDebt: string;
    shortTermDebt: string;
    totalNonCurrentLiabilities: string;
    capitalLeaseObligations: string;
    longTermDebt: string;
    currentLongTermDebt: string;
    longTermDebtNoncurrent: string;
    shortLongTermDebtTotal: string;
    otherCurrentLiabilities: string;
    otherNonCurrentLiabilities: string;
    totalShareholderEquity: string;
    treasuryStock: string;
    retainedEarnings: string;
    commonStock: string;
    commonStockSharesOutstanding: string;
  }>;
  quarterlyReports: Array<{
    fiscalDateEnding: string;
    reportedCurrency: string;
    totalAssets: string;
    totalCurrentAssets: string;
    cashAndCashEquivalentsAtCarryingValue: string;
    cashAndShortTermInvestments: string;
    inventory: string;
    currentNetReceivables: string;
    totalNonCurrentAssets: string;
    propertyPlantEquipment: string;
    accumulatedDepreciationAmortizationPPE: string;
    intangibleAssets: string;
    intangibleAssetsExcludingGoodwill: string;
    goodwill: string;
    investments: string;
    longTermInvestments: string;
    shortTermInvestments: string;
    otherCurrentAssets: string;
    otherNonCurrentAssets: string;
    totalLiabilities: string;
    totalCurrentLiabilities: string;
    currentAccountsPayable: string;
    deferredRevenue: string;
    currentDebt: string;
    shortTermDebt: string;
    totalNonCurrentLiabilities: string;
    capitalLeaseObligations: string;
    longTermDebt: string;
    currentLongTermDebt: string;
    longTermDebtNoncurrent: string;
    shortLongTermDebtTotal: string;
    otherCurrentLiabilities: string;
    otherNonCurrentLiabilities: string;
    totalShareholderEquity: string;
    treasuryStock: string;
    retainedEarnings: string;
    commonStock: string;
    commonStockSharesOutstanding: string;
  }>;
}

export interface CashFlow {
  symbol: string;
  annualReports: Array<{
    fiscalDateEnding: string;
    reportedCurrency: string;
    operatingCashflow: string;
    paymentsForOperatingActivities: string;
    proceedsFromOperatingActivities: string;
    changeInOperatingLiabilities: string;
    changeInOperatingAssets: string;
    depreciationDepletionAndAmortization: string;
    capitalExpenditures: string;
    changeInReceivables: string;
    changeInInventory: string;
    profitLoss: string;
    cashflowFromInvestment: string;
    cashflowFromFinancing: string;
    proceedsFromRepaymentsOfShortTermDebt: string;
    paymentsForRepurchaseOfCommonStock: string;
    paymentsForRepurchaseOfEquity: string;
    paymentsForRepurchaseOfPreferredStock: string;
    dividendPayout: string;
    dividendPayoutCommonStock: string;
    dividendPayoutPreferredStock: string;
    proceedsFromIssuanceOfCommonStock: string;
    proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet: string;
    proceedsFromIssuanceOfPreferredStock: string;
    proceedsFromRepurchaseOfEquity: string;
    proceedsFromSaleOfTreasuryStock: string;
    changeInCashAndCashEquivalents: string;
    changeInExchangeRate: string;
    netIncome: string;
  }>;
  quarterlyReports: Array<{
    fiscalDateEnding: string;
    reportedCurrency: string;
    operatingCashflow: string;
    paymentsForOperatingActivities: string;
    proceedsFromOperatingActivities: string;
    changeInOperatingLiabilities: string;
    changeInOperatingAssets: string;
    depreciationDepletionAndAmortization: string;
    capitalExpenditures: string;
    changeInReceivables: string;
    changeInInventory: string;
    profitLoss: string;
    cashflowFromInvestment: string;
    cashflowFromFinancing: string;
    proceedsFromRepaymentsOfShortTermDebt: string;
    paymentsForRepurchaseOfCommonStock: string;
    paymentsForRepurchaseOfEquity: string;
    paymentsForRepurchaseOfPreferredStock: string;
    dividendPayout: string;
    dividendPayoutCommonStock: string;
    dividendPayoutPreferredStock: string;
    proceedsFromIssuanceOfCommonStock: string;
    proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet: string;
    proceedsFromIssuanceOfPreferredStock: string;
    proceedsFromRepurchaseOfEquity: string;
    proceedsFromSaleOfTreasuryStock: string;
    changeInCashAndCashEquivalents: string;
    changeInExchangeRate: string;
    netIncome: string;
  }>;
}

export interface NewsArticle {
  title: string;
  url: string;
  time_published: string;
  authors: string[];
  summary: string;
  banner_image: string;
  source: string;
  category_within_source: string;
  source_domain: string;
  topics: Array<{
    topic: string;
    relevance_score: string;
  }>;
  overall_sentiment_score: number;
  overall_sentiment_label:
    | "Bullish"
    | "Somewhat-Bullish"
    | "Neutral"
    | "Somewhat-Bearish"
    | "Bearish";
  ticker_sentiment: Array<{
    ticker: string;
    relevance_score: string;
    ticker_sentiment_score: string;
    ticker_sentiment_label:
      | "Bullish"
      | "Somewhat-Bullish"
      | "Neutral"
      | "Somewhat-Bearish"
      | "Bearish";
  }>;
}

export interface NewsSentiment {
  items: string;
  sentiment_score_definition: string;
  relevance_score_definition: string;
  feed: NewsArticle[];
}

export interface SearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
}

export interface SearchResponse {
  bestMatches: SearchResult[];
}

// Common API response wrapper
export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}
