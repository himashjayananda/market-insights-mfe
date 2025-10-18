import { useQuery } from "@tanstack/react-query";
import { searchApiClient } from "./index";

export const useCompanySearch = (keywords: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["company-search", keywords],
    queryFn: () => searchApiClient.searchCompanies(keywords),
    enabled: enabled && keywords.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
