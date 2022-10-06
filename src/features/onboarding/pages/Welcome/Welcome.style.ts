import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'
import welcomeBackground from '_assets/img/palitos-brancos.svg'
import logo from '_assets/img/homebank.svg'

export const useOnboardingStyles = makeStyles({
  container: {
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: '#145281',
    backgroundImage: `url(${welcomeBackground})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '650px',

    [theme.breakpoints.up('md')]: {
      padding: '0 80px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '0 72px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 64px',
    },
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      marginTop: '200px',
      marginBottom: '96px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px',
      marginBottom: '64px',
    },
  },
  logo: {
    marginBottom: 10,
  },
  title: {
    marginBottom: 64,
    color: colors.system.light.onPrimary,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 48,
    },
  },
  buttonsSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    padding: '230px 64px 0',
  },
  signInButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 40px',
    [theme.breakpoints.down('xs')]: {
      margin: '0 20px',
    },
  },
  onboardingButtonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      borderWidth: 2,
    },
  },
})