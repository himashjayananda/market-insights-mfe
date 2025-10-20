import React from "react";
import { Card, CardContent, Skeleton } from "@market-insights/ui";
import type { CardProps } from "@market-insights/ui";

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
