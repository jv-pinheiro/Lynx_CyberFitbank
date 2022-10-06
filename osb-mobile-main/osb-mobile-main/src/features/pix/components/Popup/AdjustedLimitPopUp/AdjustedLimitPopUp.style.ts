import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  drawer: {
    '& .MuiDrawer-paper': {
      background: 'transparent',
    },
  },
  content: {
    padding: 16,
    backgroundColor: colors.neutral.shade70,
    color: colors.system.light.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
    marginTop: 12,
    minHeight: 211,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: -12,
  },
  message: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  adjustedLimitText: {
    paddingTop: "40px",
    fontWeight: 500,
  },
  newLimitText: {
    paddingTop: "24px",
    fontWeight: 300,
  },
})
