import React from "react";
import { Box, Typography, Button } from "@mui/material";

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  onRetry,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h5" gutterBottom color="error">
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {message}
      </Typography>
      {onRetry && (
        <Button variant="contained" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </Box>
  );
};

