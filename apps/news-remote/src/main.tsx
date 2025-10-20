import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline } from "@market-insights/ui";
import NewsFeed from "./NewsFeed";

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
const MockNewsFeed: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CssBaseline />
        <div style={{ padding: "20px" }}>
          <NewsFeed ticker="AAPL" />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

// Render for standalone development
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<MockNewsFeed />);
}
