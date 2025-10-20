import React from "react";
import { Box, Typography, Container, Paper } from "@market-insights/ui";
import HomeSearch from "./HomeSearch";

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: { xs: "60vh", md: "68vh" },
          textAlign: "center",
          px: { xs: 2, md: 0 },
          background:
            "radial-gradient(1000px 400px at 10% -10%, rgba(30, 111, 255, 0.08) 0%, rgba(30, 111, 255, 0) 60%), radial-gradient(800px 300px at 90% -10%, rgba(15, 23, 40, 0.06) 0%, rgba(15, 23, 40, 0) 60%)",
          borderRadius: 3,
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
        }}
      >
        {/* Hero Section */}
        <Typography
          variant="overline"
          color="primary"
          sx={{ fontWeight: 700, letterSpacing: 1.2 }}
        >
          Powered by modern market data
        </Typography>
        <Typography variant="h2" component="h1" gutterBottom sx={{ mt: 1 }}>
          Market Insights
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          paragraph
          sx={{ mb: 4, maxWidth: 720 }}
        >
          Discover comprehensive financial data and market insights for any
          company
        </Typography>

        {/* Search Form */}
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 3 },
            width: "100%",
            maxWidth: 720,
            mx: "auto",
            borderRadius: 3,
            backdropFilter: "saturate(140%) blur(4px)",
          }}
        >
          <HomeSearch />
        </Paper>

        {/* Features Preview */}
        <Box sx={{ mt: 8, width: "100%" }}>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "left" }}>
            What you can explore
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
              mt: 3,
            }}
          >
            <Paper sx={{ p: 3, textAlign: "left" }}>
              <Typography variant="h6" gutterBottom>
                Company Overview
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock prices, market cap, financial ratios, and key metrics
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, textAlign: "left" }}>
              <Typography variant="h6" gutterBottom>
                Financial Statements
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Income statements, balance sheets, and cash flow data
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, textAlign: "left" }}>
              <Typography variant="h6" gutterBottom>
                Market News
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Latest news and sentiment analysis for companies
              </Typography>
            </Paper>
          </Box>
        </Box>

        {/* Trending Companies */}
        <Box sx={{ mt: 8, width: "100%" }}>
          <Typography variant="h5" gutterBottom sx={{ textAlign: "left" }}>
            Popular Companies
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Explore detailed financial data for these trending companies
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {[
              {
                symbol: "AAPL",
                name: "Apple Inc.",
                sector: "Technology",
                price: "$200.00",
                change: "+2.5%",
              },
              {
                symbol: "MSFT",
                name: "Microsoft Corp.",
                sector: "Technology",
                price: "$380.00",
                change: "+1.8%",
              },
              {
                symbol: "GOOGL",
                name: "Alphabet Inc.",
                sector: "Technology",
                price: "$140.00",
                change: "+3.2%",
              },
              {
                symbol: "AMZN",
                name: "Amazon.com Inc.",
                sector: "Consumer Discretionary",
                price: "$150.00",
                change: "+1.1%",
              },
            ].map((company) => (
              <Paper
                key={company.symbol}
                sx={{
                  p: 3,
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
                onClick={() =>
                  (window.location.href = `/company/${company.symbol}`)
                }
              >
                <Typography variant="h6" gutterBottom>
                  {company.symbol}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {company.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 2, display: "block" }}
                >
                  {company.sector}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    {company.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="success.main"
                    fontWeight="medium"
                  >
                    {company.change}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
