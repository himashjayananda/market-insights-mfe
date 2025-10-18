// Overview utility functions

export const formatCurrency = (value: string) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};

export const formatRatio = (value: string) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "-";
  return num.toFixed(2);
};

export const formatPercentage = (value: string) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "-";
  return `${(num * 100).toFixed(1)}%`;
};

export const getPriceChangeColor = (value: string) => {
  const num = parseFloat(value);
  if (isNaN(num)) return "text.secondary";
  return num >= 0 ? "success.main" : "error.main";
};

export const getPriceChangeIcon = (value: string) => {
  const num = parseFloat(value);
  if (isNaN(num)) return null;
  return num >= 0 ? "trending-up" : "trending-down";
};

export const formatTimeSeriesData = (seriesData: any, rangeDays: 7 | 30) => {
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

  return points;
};

export const getChartLabelIndices = (pointsLength: number) => {
  const i1 = Math.floor((pointsLength * 1) / 4);
  const i2 = Math.floor((pointsLength * 2) / 4);
  const i3 = Math.floor((pointsLength * 3) / 4);
  return new Set([i1, i2, i3]);
};

export const formatChartDate = (iso: string) => {
  const d = new Date(iso);
  return `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d
    .getDate()
    .toString()
    .padStart(2, "0")}`;
};

