import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  boxContainer: {
    '& div div main': {
      padding: 0,
    },
    '& div div footer': {
      background: colors.readOnly.light.white,
    },
  },
  centerData: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  paymentDateInformation: {
    marginTop: 40,
    marginBottom: 20,
    '& .MuiFormControl-root': {
      display: 'none',
    },
  },
  paymentRecipientDetails: {
    background: colors.neutral.shade30,
    boxShadow:
      '0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24)',
    marginBottom: '10px',
    padding: '20px 40px',
  },
  fontWidth400: {
    fontWeight: 400,
  },
  titlePayee: {
    paddingLeft: '20px',
    marginLeft: 20,
    marginBottom: 6,
  },
  boxValue: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: '58px',
    fontFamily: 'Roboto, sans-serif',
  },
  labelValue: {
    color: colors.neutral.shade40,
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '15.6px',
    marginBottom: '5px',
  },
  value: {
    color: colors.readOnly.light.black,
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '31.2px',
  },
  informationPaymentDate: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '44px',
    marginBottom: '31px',
    color: colors.neutral.shade40,
  },
  labelInformationPaymentDate: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '15.6px',
    marginBottom: '9px',
    fontFamily: 'Roboto, sans-serif',
  },
  valueInformationPaymentDate: {
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '23.4px',
    marginBottom: '16px',
    fontFamily: 'Roboto, sans-serif',
  },
})
