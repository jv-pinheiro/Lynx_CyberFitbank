import { alpha, makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

export const useStyles = makeStyles({
  buttonCancel: {
    padding: '2px',
    position: 'relative',
    backgroundColor: colors.readOnly.light.white,
    color: theme.palette.primary.main,
    height: 24,
    border: `${colors.system.light.background}`,
    minWidth: '100px',
    fontSize: 9,
    borderRadius: 4,
    '& .MuiButton-label': {
      textTransform: 'none',
      textAlign: 'center',
    },
    '&.MuiButton-sizeSmall': {
      minWidth: '70px',
      fontSize: '9px',
      height: '20px',
    },
    '&.MuiButton-sizeLarge': {
      minWidth: '120px',
      fontSize: '12px',
      height: '40px',
    },
    '&.Mui-disabled': {
      borderColor: theme.palette.action.disabledBackground,
    },
    '&:hover': {
      backgroundColor: colors.readOnly.light.surface5,
    },
  },
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'transparent',
    },
  },
  content: {
    padding: 16,
    backgroundColor: colors.system.light.background,
    color: colors.readOnly.light.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
    marginTop: 12,
    minHeight: 212,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: -12,
  },
  buttonsRow: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 14,
  },
  text: {
    color: '#333750',
    fontWeight: 500,
  },
  cancelButton: {
    color: colors.system.light.primary,
    backgroundColor: colors.system.light.onPrimary,
  },
  deleteButton: {
    color: colors.system.light.onPrimary,
    backgroundColor: colors.system.light.primary,
  },
})
