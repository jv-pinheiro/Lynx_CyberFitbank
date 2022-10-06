import { makeStyles } from "@material-ui/core";
import { colors, theme } from "_config/theme";

export const useStyles = makeStyles({
  titleWarper: {
    width: "15rem",
    "& .MuiTypography-h6": {
      lineHeight: "23.44px",
    },
  },
  description: {
    color: colors.neutral.shade40,
    fontWeight: 300,
    fontSize: "12px",
    lineHeight: "15.6px",
    marginTop: "1rem",
  },
  mainWarper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainWarperForm: {
    width: "100%",
    paddingBottom: 74,
    "& .MuiInputLabel-formControl": {
      fontSize: 14,
    },
    "& .MuiInputBase-root": {
      height: 48,
    },
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: "14rem",
    border: `0.5px solid ${colors.readOnly.light.black}4d`,
    borderRadius: 5,
    padding: "0.3rem",
    background: `${colors.readOnly.light.black}d`,
    gap: 8,
    "& img": {
      height: 15,
    },
  },
  infoContainerText: {
    fontSize: 12,
    lineHeight: "15.6px",
    fontWeight: "normal",
  },
  infoText: {
    fontSize: 12,
    lineHeight: "15.6px",
    fontWeight: "normal",
  },
  buttonsWrapper: {
    display: "flex",
    justifyContent: "end",
    "& .MuiButton-root": {
      minWidth: 136,
      borderRadius: 10,
    },
    "& .MuiButton-label": {
      display: "block",
      position: "relative",
    },
    "& .MuiButton-startIcon, & .MuiButton-endIcon": {
      display: "block",
      position: "absolute",
    },
    "& .MuiButton-startIcon": {
      top: 0,
      left: 0,
      marginRight: 8,
    },
    "& .MuiButton-endIcon": {
      marginLeft: 8,
      top: 0,
      right: 0,
    },
  },
});
