import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline } from "@market-insights/ui";
import FinancialStatements from "./FinancialStatements";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Mock component for standalone development
const MockFinancialStatements: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CssBaseline />
        <div style={{ padding: "20px" }}>
          <FinancialStatements ticker="AAPL" />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

// Render for standalone development
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<MockFinancialStatements />);
}
