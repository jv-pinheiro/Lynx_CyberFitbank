import { makeStyles } from '@material-ui/core'
//import loginBackground from '_assets/img/loginBackground.svg'
import logo from '_assets/img/homebank.svg'
import palitos from '_assets/img/palitos.svg'
import { colors, theme } from '_config/theme'

const bottomSpacing = 16
const screenHeight = window.screen.height

const calculateBackgroundHeight = () => {
  const baseBackgroundImageHeight = 150
  return screenHeight / 4 + baseBackgroundImageHeight - bottomSpacing
}
const calculateContentTopPadding = (backgroundHeightWeight: number) => {
  const effectiveBackgroundHeight = backgroundHeight * backgroundHeightWeight
  let result = screenHeight / 2 - effectiveBackgroundHeight + bottomSpacing

  if (result < 0) result = result * -1

  return result
}

const backgroundHeight = calculateBackgroundHeight()

export const useStyle = makeStyles({
  container: {
    minHeight: '100vh',
    backgroundImage: `url(${palitos})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '700px',
  },

  header: {
    color: colors.system.light.primary,
    //minHeight: '11vh',
    //backgroundImage: `url(${logo})`,
    backgroundSize: '100px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginBottom: 60,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 48,
    },
  },
  forgotPassword: {
    textAlign: 'center',
  },
  contentWrapper: {
    paddingBottom: bottomSpacing,
    [theme.breakpoints.up('sm')]: {
      paddingTop: calculateContentTopPadding(0.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: calculateContentTopPadding(0.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: calculateContentTopPadding(0.4),
    },
  },
})
