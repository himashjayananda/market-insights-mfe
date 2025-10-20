// Module Federation Types for Overview Remote
declare module "overview_remote/Overview" {
  interface OverviewProps {
    ticker: string;
  }
  const Overview: React.ComponentType<OverviewProps>;
  export default Overview;
}

declare module "overview_remote/api/hooks" {
  const useCompanyOverview: (symbol: string) => {
    data: CompanyOverview;
    isLoading: boolean;
    error: Error | null;
  };
  const useDailyTimeSeries: (symbol: string) => {
    data: TimeSeriesData;
    isLoading: boolean;
    error: Error | null;
  };
  export { useCompanyOverview, useDailyTimeSeries };
}

// Module Federation Types for Financials Remote
declare module "financials_remote/FinancialStatements" {
  interface FinancialStatementsProps {
    ticker: string;
  }
  const FinancialStatements: React.ComponentType<FinancialStatementsProps>;
  export default FinancialStatements;
}

declare module "financials_remote/api/hooks" {
  const useIncomeStatement: (symbol: string) => {
    data: IncomeStatement;
    isLoading: boolean;
    error: Error | null;
  };
  const useBalanceSheet: (symbol: string) => {
    data: BalanceSheet;
    isLoading: boolean;
    error: Error | null;
  };
  const useCashFlow: (symbol: string) => {
    data: CashFlow;
    isLoading: boolean;
    error: Error | null;
  };
  export { useIncomeStatement, useBalanceSheet, useCashFlow };
}

// Module Federation Types for News Remote
declare module "news_remote/NewsFeed" {
  interface NewsFeedProps {
    ticker: string;
  }
  const NewsFeed: React.ComponentType<NewsFeedProps>;
  export default NewsFeed;
}

declare module "news_remote/api/hooks" {
  const useCompanyNews: (symbol: string) => {
    data: NewsSentiment;
    isLoading: boolean;
    error: Error | null;
  };
  export { useCompanyNews };
}
