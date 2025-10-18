import { useQuery } from "@tanstack/react-query";
import { mockApiClient } from "../../shared/utils/mock-api";
import type { SearchResponse } from "../../shared/types/api";

export const useCompanySearch = (keywords: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["company-search", keywords],
    queryFn: () => mockApiClient.searchCompanies(keywords),
    enabled: enabled && keywords.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useIncomeStatement = (symbol: string) => {
  return useQuery({
    queryKey: ["income-statement", symbol],
    queryFn: () => mockApiClient.getIncomeStatement(symbol),
    enabled: !!symbol,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useBalanceSheet = (symbol: string) => {
  return useQuery({
    queryKey: ["balance-sheet", symbol],
    queryFn: () => mockApiClient.getBalanceSheet(symbol),
    enabled: !!symbol,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCashFlow = (symbol: string) => {
  return useQuery({
    queryKey: ["cash-flow", symbol],
    queryFn: () => mockApiClient.getCashFlow(symbol),
    enabled: !!symbol,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCompanyNews = (symbol: string) => {
  return useQuery({
    queryKey: ["company-news", symbol],
    queryFn: () => mockApiClient.getNewsSentiment(symbol),
    enabled: !!symbol,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
