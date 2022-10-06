import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
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
  value: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 400,
    color: colors.source.neutral,
  },
  scheduleButton: {
    marginTop: 20,
    '& .MuiFormControl-root': {
      display: 'none',
    },
  },
  payeeSection: {
    '& #payee-info-card': {
      margin: '0 -16px',
      marginTop: 8,
    },
  },
  text: {
    marginTop: 15,
    fontSize: '0.75rem',
    fontWeight: 500,
    color: colors.source.neutral,
  },
})
