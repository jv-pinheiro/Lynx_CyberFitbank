import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  pageWrapper: {
    '& div div header:nth-child(2)': {
      height: '115px',
      padding: '28px 16px 16px 16px',
    },
  },
  header: {
    height: '115px',
    background: colors.system.light.outline,
    '& #pd-title ': {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '23px',
      color: colors.system.light.primary,
    },
    '& div:nth-child(1)': {
      width: '174px',
    },
  },
  imageWrapperReference: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    bottom: '8px',
  },
  imageWrapper: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    '& img': {
      height: '45px',
      width: '45px',
    },
  },
  mainContent: {
    background: 'none',
  },
  boxMessege: {
    width: '100%',
    height: '60px',
    marginTop: '54px',
    marginBottom: '41px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: colors.neutral.shade40,
    fontSize: '12px',
    '& p': {
      position: 'relative',
      fontSize: '12px',
      display: 'flex',
    },
  },
  shareButtonMainWrapper: {
    height: '31px',
    marginTop: '76px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& button': {
      width: '122px',
      height: '31px',
      textAlign: 'center',
      borderRadius: '5px',
      '& span': {
        fontWeight: 500,
      },
    },
  },
  limitSlider: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    margin: 'auto',
  },

  timetables: {
    fontWeight: 700,
  },
})
