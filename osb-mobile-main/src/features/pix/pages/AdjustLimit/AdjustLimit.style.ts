import { makeStyles } from '@material-ui/core'
import { theme } from '_config/theme'

export const useStyles = makeStyles({
  header: {
    paddingTop: '13px',
    '& h6': {
      width: '212px',
      height: '46px',
    },
  },
  input: {
    width: "100%",
    "& input": {
      textAlign: "center",
      font: "roboto",
      fontWeight: 700,
      fontSize: "24px",
      height: "11px",
      borderRadius: "5px",
    },
  },
  text: {
    paddingBottom: "4px",
    fontSize: "12px",
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  textBottom: {
    paddingTop: "6px",
    fontSize: "10px",
    color: theme.palette.success.main,
  },
  nightlyLimit: {
    paddingTop: "25px",
  },
  buttonDefine: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    paddingTop: "44px",
    "& .MuiButton-containedPrimary": {
      width: "122px",
    }
  },
  pixVoucherBox: {
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    bottom: "10px",
    paddingBottom: "50px",
    "& .pixVoucherSubBox": {
      position: "absolute",
    },
  },
})