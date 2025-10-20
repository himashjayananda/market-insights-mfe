import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@market-insights/ui";
import type { TableProps } from "@market-insights/ui";

interface DataTableColumn {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  format?: (value: any) => string;
}

interface DataTableProps extends Omit<TableProps, "children"> {
  columns: DataTableColumn[];
  data: Record<string, any>[];
  loading?: boolean;
  emptyMessage?: string;
  title?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  loading = false,
  emptyMessage = "No data available",
  title,
  ...props
}) => {
  const formatValue = (value: any, format?: (value: any) => string) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }
    return format ? format(value) : String(value);
  };

  const formatCurrency = (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatNumber = (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "-";
    return new Intl.NumberFormat("en-US").format(num);
  };

  const formatPercentage = (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "-";
    return `${(num * 100).toFixed(2)}%`;
  };

  if (loading) {
    return (
      <Paper>
        {title && (
          <Box p={2}>
            <Typography variant="h6">{title}</Typography>
          </Box>
        )}
        <TableContainer>
          <Table {...props}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      <Box
                        sx={{
                          width: "80%",
                          height: 20,
                          backgroundColor: "grey.200",
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  return (
    <Paper>
      {title && (
        <Box p={2}>
          <Typography variant="h6">{title}</Typography>
        </Box>
      )}
      <TableContainer>
        <Table {...props}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body2" color="text.secondary">
                    {emptyMessage}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={index} hover>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {formatValue(row[column.id], column.format)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// Common formatters for financial data
export const formatters = {
  currency: (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  },
  number: (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "-";
    return new Intl.NumberFormat("en-US").format(num);
  },
  percentage: (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "-";
    return `${(num * 100).toFixed(2)}%`;
  },
  ratio: (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "-";
    return num.toFixed(2);
  },
};
