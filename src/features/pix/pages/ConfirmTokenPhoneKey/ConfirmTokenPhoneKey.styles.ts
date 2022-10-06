import { colors } from '_config/theme'
import { makeStyles } from '@material-ui/core'
export const useStyles = makeStyles({
  tokenInput: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '& input': {
      marginRight: 5,
      marginLeft: 4,
      fontSize: 40,
      border: '0.8px solid #c4c4c4',
      boxSizing: 'border-box',
      borderRadius: 3,
      width: '41.95px',
      height: 51,
    },
  },
  label: {
    fontSize: 12,
    fontWeight: 500,
    color: colors.neutral.shade40,
  },
  boxContent: {
    paddingLeft: '10%',
  },
  buttonWithFloatingIcon: { marginTop: '70px' },
})
