import React, { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

// Simple lazy import of remote NewsFeed component
const RemoteNewsFeed = lazy(() => import("news_remote/NewsFeed"));

const NewsWrapper: React.FC = () => {
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
      <RemoteNewsFeed ticker={ticker || ""} />
    </Suspense>
  );
};

export default NewsWrapper;
