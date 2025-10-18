import React, { useEffect, useState } from "react";
import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { HeaderSearch } from "../features/search";

const AppLayout: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (isHome && showSearch) setShowSearch(false);
  }, [isHome, showSearch]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="static" elevation={1} square sx={{ borderRadius: 0 }}>
        <Toolbar>
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
          >
            Market Insights
          </Typography>

          {/* Header Search: hidden on home page */}
          {!isHome &&
            (showSearch ? (
              <HeaderSearch onClose={() => setShowSearch(false)} />
            ) : (
              <IconButton
                color="inherit"
                aria-label="search"
                onClick={() => setShowSearch(true)}
              >
                <SearchIcon />
              </IconButton>
            ))}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Outlet />
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: "auto",
          backgroundColor: "grey.100",
          borderTop: 1,
          borderColor: "grey.300",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            Market Insights
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default AppLayout;
