# Financials Remote App

This is a Micro Frontend (MFE) application that provides financial statements functionality for the Market Insights application.

## Features

- Income Statement data and visualization
- Balance Sheet data and visualization
- Cash Flow Statement data and visualization
- Tabbed interface for easy navigation between statements
- Responsive data tables with proper formatting
- Mock data for AAPL and MSFT companies

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

- `./FinancialStatements` - Main financial statements component
- `./api/hooks` - React Query hooks for financial data

## Port

Runs on port 3003 by default.

## Dependencies

- React 19
- Material-UI 7
- TanStack React Query
- TypeScript
