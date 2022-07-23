import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  page: {
    "& footer": {
      backgroundColor: colors.readOnly.light.white,
    },
  },
  footer: {
    height: "50px",
  },
  summaryContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.8,
  },
});
