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
    minHeight: 232,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: -12,
  },
  title: {
    paddingTop: "3px",
    fontWeight: 900,
  },
  message: {
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  invalidValueText: {
    paddingTop: "18px",
    fontWeight: 500,
  },
  text: {
    paddingTop: "10px",
    fontWeight: 300,
  },
  button: {
    paddingTop: "15px",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    "& .MuiButton-containedPrimary": {
      width: "136px",
    },
  },
})
