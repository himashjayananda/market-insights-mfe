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
  IconButton,
} from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
import { useCompanySearch } from "./api/hooks";
import type { SearchResult } from "./types";

interface HeaderSearchProps {
  onClose?: () => void;
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ onClose }) => {
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
    navigate(`/company/${result.symbol}`);
    if (onClose) onClose();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (data?.bestMatches && data.bestMatches.length > 0) {
      handleCompanySelect(data.bestMatches[0]);
    }
  };

  return (
    <Box sx={{ position: "relative", width: 300 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          placeholder="Search companies..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: onClose && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={onClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
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
            mt: 1,
          }}
        >
          {isLoading ? (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress size={20} />
            </Box>
          ) : data?.bestMatches && data.bestMatches.length > 0 ? (
            <List dense>
              {data.bestMatches.slice(0, 5).map((result) => (
                <ListItem key={result.symbol} disablePadding>
                  <ListItemButton onClick={() => handleCompanySelect(result)}>
                    <ListItemText
                      primary={result.name}
                      secondary={`${result.symbol} • ${result.region}`}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box p={2}>
              <Typography variant="body2" color="text.secondary">
                No companies found
              </Typography>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default HeaderSearch;
