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
