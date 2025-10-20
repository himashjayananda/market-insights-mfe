import { useQuery } from "@tanstack/react-query";
import { newsApiClient } from "./index";

export const useCompanyNews = (symbol: string) => {
  return useQuery({
    queryKey: ["company-news", symbol],
    queryFn: () => newsApiClient.getNewsSentiment(symbol),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
