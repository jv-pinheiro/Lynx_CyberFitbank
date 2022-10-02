import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  container: {
    '& main': {
      padding: '0px',
    },
  },
  content: {
    gridTemplateRows: 'auto auto auto auto',
    gridRowGap: '24px',
    overflowX: 'hidden',
    paddingBottom: '80px',
    '& > section': {
      padding: '0 16px',
    },
  },
  paymentMethodsSection: {
    display: 'grid',
    gridAutoRows: 'auto',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto auto 1fr',
    gridRowGap: '16px',
    gridColumnGap: '16px',
    marginBottom: '23px',
  },
  collectAndReceipt: {
    marginBottom: '23px',
    height: '80px',
    '& #start-icon-column': {
      marginBottom: '10px',
    },
  },
  pixPaymentMethodCard: {
    padding: '10px 10px 0px 10px',
    '& #title': {
      lineHeight: '15.23px',
    },
    '& #subtitle': {
      fontSize: '10px',
      fontWeight: 300,
    },
    '& #start-icon': {
      width: 'auto',
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '-19px',
      marginRight: '-2px',
      marginLeft: '10px',
    },
  },
  favoredList: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr',
    gridColumnGap: '16px',
    overflowX: 'scroll',
    padding: '0px 0px 23px 0px',
    '& .MuiButton-containedSecondary:hover': {
      color: colors.system.light.onPrimary,
      backgroundColor: colors.readOnly.light.surface5,
    },
  },
  optionsList: {
    display: 'grid',
    gridRowGap: '2px',
    padding: '0 !important',
  },
})
