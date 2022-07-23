import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  page: {
    "& footer": {
      backgroundColor: "#fff",
    },
  },
  footer: {
    height: "50px",
    marginTop: "16px",
    borderBottom: "1.5px solid #F2F2F2",
  },
});