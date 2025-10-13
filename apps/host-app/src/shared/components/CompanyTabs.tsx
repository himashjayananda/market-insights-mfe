import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const tabDefs = [
  { label: "Overview", to: (ticker: string) => `/company/${ticker}` },
  {
    label: "Financials",
    to: (ticker: string) => `/company/${ticker}/financials`,
  },
  {
    label: "News & Sentiment",
    to: (ticker: string) => `/company/${ticker}/news`,
  },
];

const getActiveIndex = (pathname: string) => {
  if (pathname.endsWith("/financials")) return 1;
  if (pathname.endsWith("/news")) return 2;
  return 0;
};

const CompanyTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ticker } = useParams<{ ticker: string }>();

  const activeIndex = getActiveIndex(location.pathname);

  const handleChange = (_: React.SyntheticEvent, newIndex: number) => {
    if (!ticker) return;
    navigate(tabDefs[newIndex].to(ticker));
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
      <Tabs value={activeIndex} onChange={handleChange} variant="scrollable">
        {tabDefs.map((tab) => (
          <Tab key={tab.label} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default CompanyTabs;
