import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        color: "secondary",
        variant: "outlined",
        fullWidth: true,
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
        size: "small",
      },
    },
    MuiFormControl: {
      defaultProps: {
        size: "small",
        fullWidth: true,
      },
    },
    MuiInputLabel: {
      defaultProps: {
        size: "small",
        fullWidth: true,
      },
    },
    MuiMenuItem: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
});

export default theme;
