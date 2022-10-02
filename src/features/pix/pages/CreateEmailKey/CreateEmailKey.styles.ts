import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  emailInput: {
    marginTop: "10px",
  },
  importantWarning: {
    marginTop: "30px",
  },

  txtalert: {
    fontSize: 15,
    marginTop: 10,
  },

  inputError: {
    color: colors.system.light.error,
    fontSize: "14",
    fontFamily: "Roboto",
  },
});
