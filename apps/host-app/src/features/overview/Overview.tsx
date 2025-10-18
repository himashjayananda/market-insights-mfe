import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Skeleton } from "@mui/material";
import { TrendingUp, TrendingDown, AttachMoney } from "@mui/icons-material";
import { useCompanyOverview, useDailyTimeSeries } from "./api/hooks";
import { CustomCard } from "./components/Card";
import { LineChart } from "@mui/x-charts";
import { ErrorState } from "../../shared/components/States";
import {
  formatCurrency,
  formatRatio,
  formatPercentage,
  getPriceChangeColor,
  formatTimeSeriesData,
  getChartLabelIndices,
  formatChartDate,
} from "./utils";

const Overview: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const { data: company, isLoading, error } = useCompanyOverview(ticker || "");
  const { data: seriesData, isLoading: seriesLoading } = useDailyTimeSeries(
    ticker || ""
  );
  const [rangeDays, setRangeDays] = React.useState<7 | 30>(30);
  const handleRangeChange = (
    _: React.MouseEvent<HTMLElement>,
    value: 7 | 30 | null
  ) => {
    if (value) setRangeDays(value);
  };

  if (isLoading) {
    return (
      <Box>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Company Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Loading key company details...
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
            mb: 4,
          }}
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <Box key={idx}>
              <CustomCard>
                <Skeleton variant="text" height={28} width="70%" />
                <Skeleton variant="text" height={20} width="50%" />
              </CustomCard>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (error || !company) {
    return (
      <ErrorState
        title="Company not found"
        message={`Unable to load information for ${ticker}. Please try searching for a different company.`}
      />
    );
  }

  const getPriceChangeIcon = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return null;
    return num >= 0 ? <TrendingUp /> : <TrendingDown />;
  };

  return (
    <Box>
      {/* Overview blurb */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="body1" color="text.secondary" paragraph>
          {company.Description}
        </Typography>
      </Box>

      {/* Price Chart */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <ToggleButtonGroup
            size="small"
            color="primary"
            exclusive
            value={rangeDays}
            onChange={handleRangeChange}
          >
            <ToggleButton value={7}>7 days</ToggleButton>
            <ToggleButton value={30}>30 days</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {seriesLoading ? (
          <Skeleton variant="rectangular" height={260} />
        ) : (
          (() => {
            const points = formatTimeSeriesData(seriesData, rangeDays);
            const labelIndices = getChartLabelIndices(points.length);
            const closes = points.map((p) => p.close);
            const minClose = Math.min(...closes);
            const maxClose = Math.max(...closes);
            const span = Math.max(0.01, maxClose - minClose);
            const pad = span * 0.1;
            return (
              <>
                <LineChart
                  height={260}
                  grid={{ horizontal: true, vertical: false }}
                  slotProps={{ legend: { hidden: true } }}
                  series={[
                    {
                      id: "close",
                      label: "Close price",
                      data: points.map((p) => p.close),
                      showMark: false,
                      color: "#1E6FFF",
                      area: true,
                      curve: "monotoneX",
                      valueFormatter: (v: number | null) =>
                        v == null
                          ? "-"
                          : new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(v),
                    },
                  ]}
                  xAxis={[
                    {
                      scaleType: "point",
                      data: points.map((p) => p.date),
                      tickLabelInterval: (
                        _value: string | number,
                        index: number
                      ) => labelIndices.has(index),
                      valueFormatter: (value: string | number) =>
                        typeof value === "string"
                          ? formatChartDate(value)
                          : String(value),
                    },
                  ]}
                  yAxis={[
                    { min: minClose - pad, max: maxClose + pad, tickNumber: 4 },
                  ]}
                  margin={{ left: 40, right: 10, top: 10, bottom: 20 }}
                  sx={{
                    "& .MuiLineElement-root": { strokeWidth: 2 },
                    "& .MuiAreaElement-root": { fillOpacity: 0.15 },
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  Past {rangeDays} days price (daily close)
                </Typography>
              </>
            );
          })()
        )}
      </Box>

      {/* Key Metrics Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Stock Price */}
        <CustomCard>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h4" component="div">
                {formatCurrency(company.AnalystTargetPrice)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Target Price
              </Typography>
            </Box>
            <Box sx={{ color: getPriceChangeColor(company.Beta) }}>
              {getPriceChangeIcon(company.Beta)}
            </Box>
          </Box>
        </CustomCard>

        {/* Market Cap */}
        <CustomCard>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h4" component="div">
                {formatCurrency(company.MarketCapitalization)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Market Cap
              </Typography>
            </Box>
            <AttachMoney sx={{ color: "primary.main" }} />
          </Box>
        </CustomCard>
      </Box>

      {/* Technical Indicators */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Technical Indicators
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
          <CustomCard>
            <Typography variant="h6" component="div">
              {company["52WeekHigh"]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              52-Week High
            </Typography>
          </CustomCard>
          <CustomCard>
            <Typography variant="h6" component="div">
              {company["52WeekLow"]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              52-Week Low
            </Typography>
          </CustomCard>
          <CustomCard>
            <Typography variant="h6" component="div">
              {company["50DayMovingAverage"]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              50-Day MA
            </Typography>
          </CustomCard>
          <CustomCard>
            <Typography variant="h6" component="div">
              {company["200DayMovingAverage"]}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              200-Day MA
            </Typography>
          </CustomCard>
        </Box>
      </Box>

      {/* Growth Metrics */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Growth Metrics
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          <CustomCard>
            <Typography
              variant="h6"
              component="div"
              color={getPriceChangeColor(company.QuarterlyEarningsGrowthYOY)}
            >
              {formatPercentage(company.QuarterlyEarningsGrowthYOY)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quarterly Earnings Growth (YoY)
            </Typography>
          </CustomCard>
          <CustomCard>
            <Typography
              variant="h6"
              component="div"
              color={getPriceChangeColor(company.QuarterlyRevenueGrowthYOY)}
            >
              {formatPercentage(company.QuarterlyRevenueGrowthYOY)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quarterly Revenue Growth (YoY)
            </Typography>
          </CustomCard>
          <CustomCard>
            <Typography variant="h6" component="div">
              {formatRatio(company.Beta)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Beta (Volatility)
            </Typography>
          </CustomCard>
        </Box>
      </Box>

      {/* Valuation Metrics */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Valuation Metrics
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
          <CustomCard>
            <Typography variant="h6" component="div">
              {formatRatio(company.PERatio)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              P/E Ratio (TTM)
            </Typography>
          </CustomCard>
          <CustomCard>
            <Typography variant="h6" component="div">
              {formatRatio(company.ForwardPE)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Forward P/E
            </Typography>
          </CustomCard>
          <CustomCard>
            <Typography variant="h6" component="div">
              {formatRatio(company.PriceToSalesRatioTTM)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price-to-Sales
            </Typography>
          </CustomCard>
          <CustomCard>
            <Typography variant="h6" component="div">
              {formatRatio(company.PriceToBookRatio)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price-to-Book
            </Typography>
          </CustomCard>
        </Box>
      </Box>

      {/* Profitability Metrics */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Profitability & Efficiency
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          <CustomCard>
            <Typography variant="h6" component="div">
              {formatCurrency(company.EPS)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              EPS (TTM)
            </Typography>
          </CustomCard>
          <CustomCard>
            <Typography variant="h6" component="div">
              {formatPercentage(company.DividendYield)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dividend Yield
            </Typography>
          </CustomCard>
          <CustomCard>
            <Typography variant="h6" component="div">
              {formatCurrency(company.DividendPerShare)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dividend Per Share
            </Typography>
          </CustomCard>
        </Box>
      </Box>

      {/* Financial Highlights */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 3,
          mb: 4,
        }}
      >
        <CustomCard>
          <Typography variant="h6" gutterBottom>
            Financial Highlights
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Revenue (TTM):</Typography>
              <Typography variant="body2" fontWeight="medium">
                {formatCurrency(company.RevenueTTM)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Gross Profit (TTM):</Typography>
              <Typography variant="body2" fontWeight="medium">
                {formatCurrency(company.GrossProfitTTM)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Profit Margin:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {formatPercentage(company.ProfitMargin)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Operating Margin:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {formatPercentage(company.OperatingMarginTTM)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">ROA (TTM):</Typography>
              <Typography variant="body2" fontWeight="medium">
                {formatPercentage(company.ReturnOnAssetsTTM)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">ROE (TTM):</Typography>
              <Typography variant="body2" fontWeight="medium">
                {formatPercentage(company.ReturnOnEquityTTM)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">EBITDA:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {formatCurrency(company.EBITDA)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Shares Outstanding:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {formatCurrency(company.SharesOutstanding)}
              </Typography>
            </Box>
          </Box>
        </CustomCard>

        {/* Company Information */}
        <CustomCard>
          <Typography variant="h6" gutterBottom>
            Company Information
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Sector:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {company.Sector}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Industry:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {company.Industry}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Exchange:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {company.Exchange}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Country:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {company.Country}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Currency:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {company.Currency}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Fiscal Year End:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {company.FiscalYearEnd}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Latest Quarter:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {company.LatestQuarter}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">CIK:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {company.CIK}
              </Typography>
            </Box>
          </Box>
        </CustomCard>
      </Box>

      {/* Earnings Calendar */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Earnings & Dividends
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          <CustomCard>
            <Typography variant="h6" component="div">
              {company.DividendDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Next Dividend Date
            </Typography>
          </CustomCard>
          <CustomCard>
            <Typography variant="h6" component="div">
              {company.ExDividendDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ex-Dividend Date
            </Typography>
          </CustomCard>
          <CustomCard>
            <Typography variant="h6" component="div">
              {company.LatestQuarter}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Latest Quarter
            </Typography>
          </CustomCard>
        </Box>
      </Box>

      {/* Navigation buttons removed in favor of tabs */}
    </Box>
  );
};

export default Overview;
