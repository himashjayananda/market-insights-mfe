import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useCompanySearch } from "./api/hooks";
import type { SearchResult } from "./types";

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  onSelect: (result: SearchResult) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  loading,
  onSelect,
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={2}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (results.length === 0) {
    return (
      <Box p={2}>
        <Typography variant="body2" color="text.secondary">
          No companies found
        </Typography>
      </Box>
    );
  }

  return (
    <List dense>
      {results.map((result) => (
        <ListItem key={result.symbol} disablePadding>
          <ListItemButton onClick={() => onSelect(result)}>
            <ListItemText
              primary={result.name}
              secondary={`${result.symbol} • ${result.region}`}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

interface HomeSearchProps {
  onCompanySelect?: (symbol: string) => void;
}

const HomeSearch: React.FC<HomeSearchProps> = ({ onCompanySelect }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { data, isLoading } = useCompanySearch(searchTerm, showResults);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowResults(value.length >= 2);
  };

  const handleCompanySelect = (result: SearchResult) => {
    setSearchTerm("");
    setShowResults(false);

    if (onCompanySelect) {
      onCompanySelect(result.symbol);
    } else {
      navigate(`/company/${result.symbol}`);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (data?.bestMatches && data.bestMatches.length > 0) {
      handleCompanySelect(data.bestMatches[0]);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder="Search for a company (e.g., Apple, AAPL)"
          variant="outlined"
          size="medium"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { fontSize: "1.1rem" },
          }}
          sx={{ mb: 2 }}
        />
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: 300,
            overflow: "auto",
          }}
        >
          <SearchResults
            results={data?.bestMatches || []}
            loading={isLoading}
            onSelect={handleCompanySelect}
          />
        </Paper>
      )}
    </Box>
  );
};

export default HomeSearch;
