import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  boxHeader: {
    marginTop: 8,
    fontWeight: 700,
    alignContent: "center",
    color: colors.source.neutral,
    "& .MuiTypography-root": {
      fontWeight: "inherit",
    },
  },
  paymentRecipientDetails: {
    backgroundColor: colors.neutral.shade10,
    boxShadow:
      "0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24)",
    marginBottom: "10px",
    padding: "10px 40px",
    margin: "0 -16px",
    border: 'none',
  },
  fontWeightNormal: {
    fontWeight: 400,
  },
  boxTitle: {
    marginLeft: 22,
  },
  informationBoxWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "44px",
    marginBottom: "31px",
    color: colors.neutral.shade40,
  },
  labelInformation: {
    fontSize: "12px",
    fontWeight: 300,
    lineHeight: "13px",
    marginBottom: "9px",
  },
  limitInformation: {
    fontSize: "13px",
    fontWeight: 300,
    lineHeight: "13px",
    marginBottom: "16px",
  },
})
