// News utility functions

export const formatDate = (timePublished: string) => {
  try {
    // Handle different date formats
    let date: Date;
    if (timePublished.includes("T") && timePublished.length === 15) {
      // Format: 20241115T160000
      const year = timePublished.substring(0, 4);
      const month = timePublished.substring(4, 6);
      const day = timePublished.substring(6, 8);
      const hour = timePublished.substring(9, 11);
      const minute = timePublished.substring(11, 13);
      const second = timePublished.substring(13, 15);
      date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
    } else {
      // Standard ISO format
      date = new Date(timePublished);
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return timePublished;
  }
};

export const getSentimentColor = (label: string) => {
  switch (label.toLowerCase()) {
    case "bullish":
      return "success";
    case "somewhat-bullish":
      return "success";
    case "neutral":
      return "default";
    case "somewhat-bearish":
      return "warning";
    case "bearish":
      return "error";
    default:
      return "default";
  }
};

export const getSentimentLabel = (score: number) => {
  if (score >= 0.35) return "Bullish";
  if (score >= 0.15) return "Somewhat-Bullish";
  if (score <= -0.35) return "Bearish";
  if (score <= -0.15) return "Somewhat-Bearish";
  return "Neutral";
};

export const calculateSentimentSummary = (articles: any[]) => {
  if (!articles.length) return null;

  const sentiments = articles.map((article) => article.overall_sentiment_score);
  const avgSentiment =
    sentiments.reduce((sum, score) => sum + score, 0) / sentiments.length;

  const bullishCount = articles.filter(
    (a) => a.overall_sentiment_score > 0.15
  ).length;
  const bearishCount = articles.filter(
    (a) => a.overall_sentiment_score < -0.15
  ).length;
  const neutralCount = articles.length - bullishCount - bearishCount;

  return {
    averageScore: avgSentiment,
    bullishCount,
    bearishCount,
    neutralCount,
    totalArticles: articles.length,
  };
};
