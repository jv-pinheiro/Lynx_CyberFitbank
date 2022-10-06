import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles ({
  header: {
    paddingTop: "13px",
    "& div h6": {
      width: "200px",
      height: "46px",
      paddingTop: "5px",
    },
  },
  totalDailyLimit: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  textMain: {
    fontWeight: 700,
    fontSize: "12px",
  },
  textValue: {
    fontWeight: 700,
    fontSize: "24px",
  },
  valueAvailable: {
    fontSize: "10px",
  },
  textManyLimits: {
    fontWeight: 400,
    fontSize: "12px",
    paddingBottom: "22px",
  },
  listOfLimits: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  typeLimits: {
    display: "flex",
    margin: "0 45px",
    justifyContent: "space-between",
    fontSize: "12px",
    textAlign: "center",
  },
  typeLimitsValue: {
    paddingLeft: "30px",
    fontWeight: 700,
    fontSize: "12px",
    paddingBottom: "5px",
  },
  adjustmentButton: {
    paddingTop: "52px",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
});