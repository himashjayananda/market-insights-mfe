import React from "react";
import { Outlet, Link as RouterLink, useParams } from "react-router-dom";
import { Box, Typography, Chip, Breadcrumbs, Link } from "@mui/material";
import { Skeleton } from "@mui/material";
import CompanyTabs from "../../shared/components/CompanyTabs";
import { useCompanyOverview } from "../../shared/hooks/useApi";
import { LoadingState, ErrorState } from "../../shared/components/States";

const CompanyLayout: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const { data: company, isLoading, error } = useCompanyOverview(ticker || "");

  if (isLoading) {
    return (
      <Box>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Skeleton variant="text" width={120} height={24} />
          <Skeleton variant="text" width={200} height={24} />
        </Breadcrumbs>
        <Box sx={{ mb: 3 }}>
          <Skeleton variant="text" width={360} height={40} sx={{ mb: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="rounded" width={100} height={24} />
            <Skeleton variant="rounded" width={120} height={24} />
          </Box>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Skeleton variant="text" width={100} height={32} />
            <Skeleton variant="text" width={120} height={32} />
            <Skeleton variant="text" width={160} height={32} />
          </Box>
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

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Typography color="text.primary">{company.Name}</Typography>
      </Breadcrumbs>

      {/* Common Company Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {company.Name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Chip label={company.Symbol} size="small" />
          <Chip label={company.Exchange} size="small" />
          <Chip label={company.Sector} size="small" color="primary" />
        </Box>
      </Box>

      {/* Tabs */}
      <CompanyTabs />

      {/* Routed content */}
      <Outlet />
    </Box>
  );
};

export default CompanyLayout;
