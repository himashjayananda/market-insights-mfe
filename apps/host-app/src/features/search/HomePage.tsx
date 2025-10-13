import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import HomeSearch from "./HomeSearch";

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
        }}
      >
        {/* Hero Section */}
        <Typography variant="h2" component="h1" gutterBottom>
          Market Insights
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          paragraph
          sx={{ mb: 4 }}
        >
          Discover comprehensive financial data and market insights for any
          company
        </Typography>

        {/* Search Form */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            width: "100%",
            maxWidth: 600,
          }}
        >
          <HomeSearch />
        </Paper>

        {/* Features Preview */}
        <Box sx={{ mt: 6, width: "100%" }}>
          <Typography variant="h5" gutterBottom>
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
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Company Overview
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock prices, market cap, financial ratios, and key metrics
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Financial Statements
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Income statements, balance sheets, and cash flow data
              </Typography>
            </Paper>

            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6" gutterBottom>
                Market News
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Latest news and sentiment analysis for companies
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
