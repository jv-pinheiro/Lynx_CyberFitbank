import { makeStyles } from "@material-ui/core";
import { colors, theme } from "_config/theme";

export const useStyles = makeStyles({
  titlePage: {
    width: "15rem",
    paddingBottom: "27.41px",
  },
  descriptionHeader: {
    color: colors.neutral.shade40,
    fontWeight: 300,
    fontSize: "12px",
    lineHeight: "15.6px",
  },
  containerMain: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textMain: {
    width: "100%",
    paddingBottom: 74,
    "& .MuiInputLabel-formControl": {
      fontSize: 14,
    },
    "& .MuiInputBase-root": {
      height: 48,
    },
  },
  containerInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 55,
    width: "13.5rem",
    border: `0.5px solid ${colors.readOnly.light.black}`,
    borderRadius: 5,
    padding: "0.3rem",
    gap: 8,
    "& img": {
      height: 15,
    },
  },
  infoText: {
    fontSize: 12,
    lineHeight: "15.6px",
    fontWeight: "normal",
  },
  infoTextHours: {
    fontWeight: "bold",
  },
  buttonAsk: {
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
