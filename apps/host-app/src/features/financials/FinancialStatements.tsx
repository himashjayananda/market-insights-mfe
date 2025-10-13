import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { Skeleton } from "@mui/material";
import {
  useIncomeStatement,
  useBalanceSheet,
  useCashFlow,
} from "../../shared/hooks/useApi";
import { DataTable, formatters } from "../../shared/components/DataTable";
import { ErrorState, LoadingState } from "../../shared/components/States";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const FinancialStatements: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const [activeTab, setActiveTab] = useState(0);

  const {
    data: incomeData,
    isLoading: incomeLoading,
    error: incomeError,
  } = useIncomeStatement(ticker || "");
  const {
    data: balanceData,
    isLoading: balanceLoading,
    error: balanceError,
  } = useBalanceSheet(ticker || "");
  const {
    data: cashFlowData,
    isLoading: cashFlowLoading,
    error: cashFlowError,
  } = useCashFlow(ticker || "");

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (incomeLoading || balanceLoading || cashFlowLoading) {
    return (
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Financial Statements
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Loading comprehensive financial data for {ticker}
          </Typography>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Income Statement" />
            <Tab label="Balance Sheet" />
            <Tab label="Cash Flow" />
          </Tabs>
        </Box>
        <Box>
          {Array.from({ length: 8 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: 2,
                mb: 2,
              }}
            >
              <Skeleton variant="text" height={24} />
              <Skeleton variant="text" height={24} />
              <Skeleton variant="text" height={24} />
              <Skeleton variant="text" height={24} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (incomeError || balanceError || cashFlowError) {
    return (
      <ErrorState
        title="Financial data not found"
        message={`Unable to load financial statements for ${ticker}. Please try a different company.`}
      />
    );
  }

  // Income Statement columns
  const incomeColumns = [
    { id: "fiscalDateEnding", label: "Period", align: "left" as const },
    {
      id: "totalRevenue",
      label: "Total Revenue",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "costOfRevenue",
      label: "Cost of Revenue",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "grossProfit",
      label: "Gross Profit",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "operatingIncome",
      label: "Operating Income",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "netIncome",
      label: "Net Income",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "researchAndDevelopment",
      label: "R&D",
      align: "right" as const,
      format: formatters.currency,
    },
  ];

  // Balance Sheet columns
  const balanceColumns = [
    { id: "fiscalDateEnding", label: "Period", align: "left" as const },
    {
      id: "totalAssets",
      label: "Total Assets",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "totalCurrentAssets",
      label: "Current Assets",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "totalLiabilities",
      label: "Total Liabilities",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "totalCurrentLiabilities",
      label: "Current Liabilities",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "totalShareholderEquity",
      label: "Shareholder Equity",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "cashAndCashEquivalentsAtCarryingValue",
      label: "Cash & Equivalents",
      align: "right" as const,
      format: formatters.currency,
    },
  ];

  // Cash Flow columns
  const cashFlowColumns = [
    { id: "fiscalDateEnding", label: "Period", align: "left" as const },
    {
      id: "operatingCashflow",
      label: "Operating Cash Flow",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "cashflowFromInvestment",
      label: "Investing Cash Flow",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "cashflowFromFinancing",
      label: "Financing Cash Flow",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "changeInCashAndCashEquivalents",
      label: "Net Change in Cash",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "capitalExpenditures",
      label: "Capital Expenditures",
      align: "right" as const,
      format: formatters.currency,
    },
    {
      id: "dividendPayout",
      label: "Dividend Payout",
      align: "right" as const,
      format: formatters.currency,
    },
  ];

  return (
    <Box>
      {/* Section header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Financial Statements
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive financial data for {ticker}
        </Typography>
      </Box>

      {/* Section Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Income Statement" />
          <Tab label="Balance Sheet" />
          <Tab label="Cash Flow" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={activeTab} index={0}>
        <DataTable
          title="Income Statement"
          columns={incomeColumns}
          data={incomeData?.annualReports || []}
          emptyMessage="No income statement data available"
        />
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <DataTable
          title="Balance Sheet"
          columns={balanceColumns}
          data={balanceData?.annualReports || []}
          emptyMessage="No balance sheet data available"
        />
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <DataTable
          title="Cash Flow Statement"
          columns={cashFlowColumns}
          data={cashFlowData?.annualReports || []}
          emptyMessage="No cash flow data available"
        />
      </TabPanel>

      {/* Navigation buttons removed in favor of tabs */}
    </Box>
  );
};

export default FinancialStatements;
