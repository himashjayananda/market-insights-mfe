# News Remote App

This is a Micro Frontend (MFE) application that provides news and sentiment analysis functionality for the Market Insights application.

## Features

- Company news articles with sentiment analysis
- Market sentiment summary with bullish/bearish/neutral counts
- Responsive card-based layout for news articles
- Sentiment scoring and color-coded indicators
- Mock data for AAPL and MSFT companies
- Article metadata including authors, dates, and topics

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Module Federation

This app exposes:

- `./NewsFeed` - Main news feed component
- `./api/hooks` - React Query hooks for news data

## Port

Runs on port 3004 by default.

## Dependencies

- React 19
- Material-UI 7
- TanStack React Query
- TypeScript
