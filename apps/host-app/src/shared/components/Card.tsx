import React from "react";
import { Card, CardContent, Skeleton, Box } from "@mui/material";
import type { CardProps } from "@mui/material";

interface CustomCardProps extends CardProps {
  children: React.ReactNode;
  loading?: boolean;
}

export const CustomCard: React.FC<CustomCardProps> = ({
  children,
  loading = false,
  ...props
}) => {
  if (loading) {
    return (
      <Card {...props}>
        <CardContent>
          <Skeleton variant="rectangular" height={120} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card {...props}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export const LoadingSkeleton: React.FC<{
  width?: string | number;
  height?: string | number;
  variant?: "text" | "rectangular" | "circular";
}> = ({ width = "100%", height = 20, variant = "rectangular" }) => {
  return <Skeleton variant={variant} width={width} height={height} />;
};

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <CustomCard key={index} loading>
          <Box />
        </CustomCard>
      ))}
    </>
  );
};
