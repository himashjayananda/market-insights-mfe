// News-specific API Response Types

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
