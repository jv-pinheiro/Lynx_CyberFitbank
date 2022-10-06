import { makeStyles } from '@material-ui/core'
import { theme } from '_config/theme'

export const useStyles = makeStyles({
  header: {
    paddingTop: '13px',
    '& div h6': {
      width: '200px',
      height: '46px',
      paddingTop: '5px',
    },
  },
  nightlyLimitImageBox: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    bottom: '10px',
    '& .dailyLimitImageSubBox': {
      position: 'absolute',
    },
  },
  main: {
    '& input': {
      width: '288px',
      height: '55px',
      padding: '0',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '5px',
    },
  },
  inputBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  input: {
    width: "288px",
    paddingTop: "48px",
    "& div input::placeholder": {
      textAlign: "center",
    },
    "& input": {
      textAlign: "center",
      font: "roboto",
      fontWeight: 700,
      fontSize: "24px",
      height: "48px",
      borderRadius: "5px",
    },
  },
  spanText: {
    fontSize: "10px",
    fontWeight: 400,
    color: theme.palette.success.main,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    paddingTop: "6px",
  },
  sliderBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  slider: {
    width: "217px",
    paddingTop: "69px",
  },
  raiseButtonBox: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "0px",
    "& button": {
      width: "122px",
      height: "31px",
      padding: 0,
      "& span span svg": {
        width: "20.58px",
        height: "20.58px",
      },
    },
  },
  nightlyTime: {
    paddingTop: "27px",
    textAlign: "center",
    fontSize: "12px",
    fontWeight: 300,
  },
  adjustTime: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "12px",
  }
})
