import type { SearchResponse } from "../types";

// Mock data imports
import searchResultsData from "../mocks/search-results.json";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Search-specific API client
export class SearchApiClient {
  private baseDelay = 300; // Base delay in milliseconds

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
export const searchApiClient = new SearchApiClient();
