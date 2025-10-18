import React, { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

// Simple lazy import of remote Overview component
const RemoteOverview = lazy(() => import("overview_remote/Overview"));

const OverviewWrapper: React.FC = () => {
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
      <RemoteOverview ticker={ticker || ""} />
    </Suspense>
  );
};

export default OverviewWrapper;
