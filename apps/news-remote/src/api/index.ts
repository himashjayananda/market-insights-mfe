import type { NewsSentiment } from "../types";

// Mock data imports
import newsSentimentData from "../mocks/news-sentiment.json";
import newsSentimentMSFT from "../mocks/news-sentiment-msft.json";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// News-specific API client
export class NewsApiClient {
  private baseDelay = 300; // Base delay in milliseconds

  async getNewsSentiment(symbol: string): Promise<NewsSentiment> {
    await delay(this.baseDelay + Math.random() * 200);

    const sym = symbol.toUpperCase();
    if (sym === "AAPL") return newsSentimentData as NewsSentiment;
    if (sym === "MSFT") return newsSentimentMSFT as NewsSentiment;

    throw new Error(`News sentiment not found for symbol: ${symbol}`);
  }
}

// Export singleton instance
export const newsApiClient = new NewsApiClient();
