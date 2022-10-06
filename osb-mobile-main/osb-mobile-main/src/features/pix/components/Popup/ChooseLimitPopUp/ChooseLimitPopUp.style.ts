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
    backgroundColor: colors.system.light.primary,
    color: colors.readOnly.light.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
    marginTop: 12,
    minHeight: 329,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: -12,
  },
  onCloseButtonClick: {

  },
  listOfLimits: {
    textAlign: "center",
    padding: "45px 0 0 0",
    "& hr": {
      background: "none",
    },
  },
  typeLimits: {
    padding: "15px 0",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    borderBottom: "0.5px solid",
    color: colors.readOnly.light.white,
    opacity: "0.33",
  },
  icon: {
    paddingRight: "10px"
  }
})
