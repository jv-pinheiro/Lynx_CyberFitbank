import { makeStyles } from '@material-ui/core'
import { colors } from '_config'

export const useStyles = makeStyles({
  page: {
    '& main': {
      color: colors.neutral.shade40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  },

  transferValueSection: {
    textAlign: 'center',

    '& #pix-transfer-value-label': {
      fontSize: '0.75rem',
      fontWeight: 'bold',
      marginBottom: '0.25rem',
    },
    '& #pix-transfer-value': {
      color: colors.neutral.shade30,
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
  },

  text: {
    fontSize: '0.75rem',
    fontWeight: 500,
  },

  transferDate: {
    fontSize: '1.125rem',
    marginTop: '0.5rem',
    textAlign: 'center',
  },

  scheduleButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 16,
  },

  payeeSection: {
    '& #payee-info-card': {
      margin: '0 -16px',
      marginTop: 8,
    },
  },
  subheader: {
    marginTop: 8,
    fontWeight: 700,
    alignContent: 'center',
    color: colors.source.neutral,
    '& .MuiTypography-root': {
      fontWeight: 'inherit',
    },
  },
  title: {
    fontSize: 12,
    alignItems: 'center',
    alignContent: 'center',
  },
})
