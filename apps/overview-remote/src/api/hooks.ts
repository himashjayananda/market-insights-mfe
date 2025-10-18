import { useQuery } from "@tanstack/react-query";
import { overviewApiClient } from "../api";

export const useCompanyOverview = (symbol: string) => {
  return useQuery({
    queryKey: ["company-overview", symbol],
    queryFn: () => overviewApiClient.getCompanyOverview(symbol),
    enabled: !!symbol,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useDailyTimeSeries = (symbol: string) => {
  return useQuery({
    queryKey: ["time-series-daily", symbol],
    queryFn: () => overviewApiClient.getDailyTimeSeries(symbol),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000,
  });
};
