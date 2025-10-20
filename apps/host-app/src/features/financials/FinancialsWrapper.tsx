import React, { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@market-insights/ui";

// Simple lazy import of remote FinancialStatements component
const RemoteFinancialStatements = lazy(
  () => import("financials_remote/FinancialStatements")
);

const FinancialsWrapper: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();

  return (
    <Suspense
      fallback={
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      }
    >
      <RemoteFinancialStatements ticker={ticker || ""} />
    </Suspense>
  );
};

export default FinancialsWrapper;
