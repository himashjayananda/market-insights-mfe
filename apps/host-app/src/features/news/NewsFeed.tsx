import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
} from "@mui/material";
import { Skeleton } from "@mui/material";
import { OpenInNew, CalendarToday, Person } from "@mui/icons-material";
import { useCompanyNews } from "../../shared/hooks/useApi";
// Tabs moved to shared CompanyLayout
import { ErrorState } from "../../shared/components/States";

const NewsFeed: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const { data: newsData, isLoading, error } = useCompanyNews(ticker || "");

  if (isLoading) {
    return (
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            News & Market Sentiment
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Loading latest news...
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <Box key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Skeleton variant="rectangular" height={200} animation="wave" />
                <CardContent>
                  <Skeleton
                    variant="text"
                    height={28}
                    width="80%"
                    sx={{ mb: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    height={20}
                    width="60%"
                    sx={{ mb: 2 }}
                  />
                  <Skeleton variant="text" height={18} width="100%" />
                  <Skeleton variant="text" height={18} width="95%" />
                  <Skeleton
                    variant="text"
                    height={18}
                    width="90%"
                    sx={{ mb: 2 }}
                  />
                  <Skeleton variant="rectangular" height={36} width="100%" />
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (error || !newsData) {
    return (
      <ErrorState
        title="News not found"
        message={`Unable to load news for ${ticker}. Please try a different company.`}
      />
    );
  }

  const formatDate = (timePublished: string) => {
    try {
      const date = new Date(timePublished);
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

  const getSentimentColor = (label: string) => {
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

  const articles = newsData.feed || [];

  return (
    <Box>
      {/* Section header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          News & Market Sentiment
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Latest news and sentiment analysis for {ticker}
        </Typography>
      </Box>

      {/* News Articles */}
      {articles.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No news articles available
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          {articles.map((article, index) => (
            <Box key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {(() => {
                  const placeholder = `https://picsum.photos/seed/${encodeURIComponent(
                    `${ticker}-${index}`
                  )}/800/400`;
                  const imageUrl = article.banner_image || placeholder;
                  return (
                    <CardMedia
                      component="img"
                      height="200"
                      image={imageUrl}
                      alt={article.title}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = placeholder;
                      }}
                      sx={{ objectFit: "cover" }}
                    />
                  );
                })()}

                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  {/* Article Header */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {article.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Person fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {article.authors.join(", ")}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <CalendarToday fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(article.time_published)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Summary */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{ flexGrow: 1 }}
                  >
                    {article.summary}
                  </Typography>

                  {/* Sentiment Analysis */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Sentiment Analysis
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <Chip
                        label={article.overall_sentiment_label}
                        color={getSentimentColor(
                          article.overall_sentiment_label
                        )}
                        size="small"
                      />
                      <Chip
                        label={`Score: ${article.overall_sentiment_score.toFixed(
                          2
                        )}`}
                        variant="outlined"
                        size="small"
                      />
                    </Box>
                  </Box>

                  {/* Source and Topics */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Source: {article.source}
                    </Typography>
                    {article.topics && article.topics.length > 0 && (
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {article.topics.slice(0, 3).map((topic, topicIndex) => (
                          <Chip
                            key={topicIndex}
                            label={topic.topic}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    )}
                  </Box>

                  {/* Action Button */}
                  <Button
                    variant="outlined"
                    startIcon={<OpenInNew />}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                  >
                    Read Full Article
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {/* Navigation buttons removed in favor of tabs */}
    </Box>
  );
};

export default NewsFeed;
