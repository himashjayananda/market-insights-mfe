import { useQuery } from "@tanstack/react-query";
import { financialsApiClient } from "./index";

export const useIncomeStatement = (symbol: string) => {
  return useQuery({
    queryKey: ["income-statement", symbol],
    queryFn: () => financialsApiClient.getIncomeStatement(symbol),
    enabled: !!symbol,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useBalanceSheet = (symbol: string) => {
  return useQuery({
    queryKey: ["balance-sheet", symbol],
    queryFn: () => financialsApiClient.getBalanceSheet(symbol),
    enabled: !!symbol,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCashFlow = (symbol: string) => {
  return useQuery({
    queryKey: ["cash-flow", symbol],
    queryFn: () => financialsApiClient.getCashFlow(symbol),
    enabled: !!symbol,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
