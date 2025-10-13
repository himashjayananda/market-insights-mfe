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
import { useCompanyOverview } from "../../shared/hooks/useApi";
import { CustomCard } from "../../shared/components/Card";
import { LineChart } from "@mui/x-charts";
import { useDailyTimeSeries } from "../../shared/hooks/useApi";
import { ErrorState } from "../../shared/components/States";

const CompanyOverview: React.FC = () => {
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

  const formatCurrency = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  };

  const formatRatio = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "-";
    return num.toFixed(2);
  };

  const formatPercentage = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "-";
    return `${(num * 100).toFixed(1)}%`;
  };

  const getPriceChangeColor = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "text.secondary";
    return num >= 0 ? "success.main" : "error.main";
  };

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
            const daily = seriesData?.["Time Series (Daily)"] as
              | Record<string, { [k: string]: string }>
              | undefined;
            const points = daily
              ? Object.keys(daily)
                  .sort()
                  .map((date) => ({
                    date,
                    close: parseFloat(daily[date]["4. close"]) || 0,
                  }))
                  .slice(-(rangeDays === 7 ? 7 : 30))
              : [];
            const i1 = Math.floor((points.length * 1) / 4);
            const i2 = Math.floor((points.length * 2) / 4);
            const i3 = Math.floor((points.length * 3) / 4);
            const labelIndices = new Set([i1, i2, i3]);
            const formatMd = (iso: string) => {
              const d = new Date(iso);
              return `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d
                .getDate()
                .toString()
                .padStart(2, "0")}`;
            };
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
                      data: points.map((p) => p.close),
                      showMark: false,
                      color: "#1E6FFF",
                      area: true,
                      curve: "monotoneX",
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
                          ? formatMd(value)
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

      {/* Additional Information */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
          mb: 4,
        }}
      >
        {/* P/E Ratio */}
        <CustomCard>
          <Typography variant="h5" component="div">
            {formatRatio(company.PERatio)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            P/E Ratio
          </Typography>
        </CustomCard>

        {/* EPS */}
        <CustomCard>
          <Typography variant="h5" component="div">
            {formatCurrency(company.EPS)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            EPS (TTM)
          </Typography>
        </CustomCard>

        {/* Dividend Yield */}
        <CustomCard>
          <Typography variant="h5" component="div">
            {formatPercentage(company.DividendYield)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Dividend Yield
          </Typography>
        </CustomCard>
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
              <Typography variant="body2">ROE (TTM):</Typography>
              <Typography variant="body2" fontWeight="medium">
                {formatPercentage(company.ReturnOnEquityTTM)}
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
              <Typography variant="body2">Industry:</Typography>
              <Typography variant="body2" fontWeight="medium">
                {company.Industry}
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
          </Box>
        </CustomCard>
      </Box>

      {/* Navigation buttons removed in favor of tabs */}
    </Box>
  );
};

export default CompanyOverview;
