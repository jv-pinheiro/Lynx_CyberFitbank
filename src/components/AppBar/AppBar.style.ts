import { makeStyles } from '@material-ui/core'
import { Height } from '@material-ui/icons'
import { colors, theme } from '_config/theme'

const toolbarHeight = 48

export const useStyles = makeStyles({
  toolbar: {
    alignItems: 'center',
    background: colors.system.light.surface,
    display: 'flex',
    justifyContent: 'space-between',
    height: toolbarHeight,

    [theme.breakpoints.down('sm')]: {
      height: toolbarHeight,
    },
  },
  cancelButton: {
    marginLeft: '-200px',
  },
  logo: {
    height: '100%',
    marginLeft: '-25px',
    borderRadius: '0px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: 30,
    },
  },
  play:{
    marginLeft: '-600px',
  },
  test:{
    marginLeft: '-400px',
    '& img': {
      height: 40,
    },
    height: 40,
    background: colors.system.light.surface
  }
})
