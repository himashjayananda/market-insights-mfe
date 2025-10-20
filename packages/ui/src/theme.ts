import { createTheme } from "@mui/material/styles";

// Professional color palette (cool blues + neutral greys)
const colors = {
  primary: {
    50: "#E8F1FF",
    100: "#CFE2FF",
    200: "#9FC5FF",
    300: "#6FA8FF",
    400: "#3F8BFF",
    500: "#1E6FFF", // brand blue
    600: "#1556C8",
    700: "#0E4096",
    800: "#082B66",
    900: "#041A3B",
  },
  secondary: {
    50: "#F2F6FF",
    100: "#E5EEFF",
    200: "#C7D9FF",
    300: "#A9C4FF",
    400: "#8BAFFF",
    500: "#6D9AFF",
    600: "#4A78E6",
    700: "#385BB3",
    800: "#263E80",
    900: "#16234D",
  },
  success: {
    50: "#ECFDF3",
    100: "#D1FADF",
    200: "#A6F4C5",
    300: "#6CE9A6",
    400: "#32D583",
    500: "#12B76A",
    600: "#039855",
    700: "#027A48",
    800: "#05603A",
    900: "#054F31",
  },
  error: {
    50: "#FEF3F2",
    100: "#FEE4E2",
    200: "#FECDCA",
    300: "#FDA29B",
    400: "#F97066",
    500: "#F04438",
    600: "#D92D20",
    700: "#B42318",
    800: "#912018",
    900: "#7A271A",
  },
  warning: {
    50: "#FFFAEB",
    100: "#FEF0C7",
    200: "#FEDF89",
    300: "#FEC84B",
    400: "#FDB022",
    500: "#F79009",
    600: "#DC6803",
    700: "#B54708",
    800: "#93370D",
    900: "#7A2E0E",
  },
  grey: {
    50: "#F8FAFC",
    100: "#EEF2F6",
    200: "#E3E8EF",
    300: "#CDD5DF",
    400: "#9AA4B2",
    500: "#697586",
    600: "#4B5565",
    700: "#364152",
    800: "#202939",
    900: "#0F1728",
  },
};

// Typography scale
const typography = {
  fontFamily: '"Jost", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: "2.5rem",
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1.25,
    letterSpacing: -0.25,
  },
  h3: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.3 },
  h4: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.35 },
  h5: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.4 },
  h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.4 },
  subtitle1: { fontSize: "1rem", fontWeight: 500 },
  subtitle2: { fontSize: "0.875rem", fontWeight: 500 },
  body1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.6 },
  body2: { fontSize: "0.95rem", fontWeight: 400, lineHeight: 1.6 },
  caption: { fontSize: "0.8rem", fontWeight: 400, lineHeight: 1.4 },
};

// Spacing scale
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Create the theme
export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[500],
      light: colors.primary[300],
      dark: colors.primary[700],
      contrastText: "#ffffff",
    },
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[300],
      dark: colors.secondary[700],
      contrastText: "#ffffff",
    },
    success: {
      main: colors.success[500],
      light: colors.success[300],
      dark: colors.success[700],
      contrastText: "#ffffff",
    },
    error: {
      main: colors.error[500],
      light: colors.error[300],
      dark: colors.error[700],
      contrastText: "#ffffff",
    },
    warning: {
      main: colors.warning[500],
      light: colors.warning[300],
      dark: colors.warning[700],
      contrastText: "#000000",
    },
    background: {
      default: colors.grey[50],
      paper: "#ffffff",
    },
    text: {
      primary: colors.grey[900],
      secondary: colors.grey[600],
    },
    grey: colors.grey,
  },
  typography,
  spacing: 8, // Base spacing unit
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          backgroundImage:
            "radial-gradient(1000px 400px at 10% -10%, rgba(30, 111, 255, 0.06) 0%, rgba(30, 111, 255, 0) 60%), radial-gradient(800px 300px at 90% -10%, rgba(15, 23, 40, 0.06) 0%, rgba(15, 23, 40, 0) 60%)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 10,
          boxShadow: "none",
          paddingInline: 16,
          paddingBlock: 10,
        },
        containedPrimary: {
          backgroundImage: "linear-gradient(180deg, #2D7FFF 0%, #1E6FFF 100%)",
          color: "#fff",
          "&:hover": {
            filter: "brightness(0.98)",
          },
        },
        outlined: {
          borderColor: colors.grey[300],
          "&:hover": {
            borderColor: colors.primary[300],
            backgroundColor: colors.primary[50],
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            "0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.10)",
          border: `1px solid ${colors.grey[200]}`,
          transition: "transform 120ms ease, box-shadow 120ms ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow:
              "0 4px 10px rgba(16, 24, 40, 0.08), 0 6px 20px rgba(16, 24, 40, 0.06)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.9))",
          backdropFilter: "saturate(140%) blur(4px)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            backgroundColor: "#fff",
            "& fieldset": {
              borderColor: colors.grey[300],
            },
            "&:hover fieldset": {
              borderColor: colors.primary[300],
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary[500],
              boxShadow: `0 0 0 3px ${colors.primary[50]}`,
            },
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 44,
        },
        indicator: {
          height: 3,
          borderRadius: 3,
          backgroundColor: colors.primary[500],
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          minHeight: 44,
          paddingInline: 16,
          color: colors.grey[600],
          "&.Mui-selected": {
            color: colors.primary[700],
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: colors.grey[900],
          borderBottom: `1px solid ${colors.grey[200]}`,
          boxShadow: "none",
          backdropFilter: "saturate(180%) blur(8px)",
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.8))",
        },
      },
    },
  },
});

// Export design tokens for use in components
export const designTokens = {
  colors,
  typography,
  spacing,
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  shadows: {
    sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
    md: "0 2px 8px rgba(0, 0, 0, 0.1)",
    lg: "0 4px 16px rgba(0, 0, 0, 0.1)",
    xl: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
};
