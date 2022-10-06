import { makeStyles } from "@material-ui/core";
import { colors } from "_config/theme";

export const useStyles = makeStyles({
  wrapper: {
    "& div footer": {
      paddingTop: "6px",
      marginBottom: "0px",
      background: colors.readOnly.light.white,
    },
    "& div main p": {
      alignSelf: "flex-start",
    },
  },
  header: {
    padding: "5px 0px 12px 0px",
    "& div h6": {
      marginBottom: "0px",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
  },
  separator: {
    listStyle: "none",
    padding: 0,
    fontSize: "0.75rem",
    width: "100%",
    borderBottom: `1.5px solid ${colors.system.light.outline}`,
    borderTop: `1.5px solid ${colors.system.light.outline}`, 
    marginTop: "15px",    
  },
});
