import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@market-insights/ui";
import Overview from "./Overview";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CssBaseline />
        <BrowserRouter>
          <Overview ticker="AAPL" />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
