import { makeStyles } from '@material-ui/core'
import { colors } from '_config/theme'

export const useStyles = makeStyles({
  headerContent: {
    '& .MuiBox-root-31': {
      height: 112,
    },
    '& #pd-description': {
      width: 130,
      marginTop: 8,
      marginBottom: 10,
      lineHeight: 1.5,
    },
  },
  handleTimIcon: {
    marginTop: 15,
    width: 37,
    height: 10,
  },
  handleText: {
    fontFamily: 'Roboto',
    fontSize: '12px',
    width: 127,
    height: 12,
    fontWeight: 300,
    marginTop: 21,
    color: colors.system.light.neutral,
  },
  handleSubText: {
    fontFamily: 'Roboto',
    fontStyle: 'Bold',
    fontSize: '15px',
    width: 130,
    height: 3,
    fontWeight: 700,
    color: colors.system.light.neutral,
  },
  handleTextPhone: {
    fontFamily: 'Roboto',
    fontSize: '12px',
    width: 127,
    height: 12,
    fontWeight: 300,
    marginTop: 21,
    color: colors.system.light.neutral,
  },
  handleSubTextPhone: {
    fontFamily: 'Roboto',
    fontStyle: 'Bold',
    fontSize: '15px',
    width: 130,
    height: 3,
    fontWeight: 700,
    color: colors.system.light.neutral,
  },
  handleTimeTopUp: {
    fontFamily: 'Roboto',
    fontSize: '12px',
    fontWeight: 300,
    marginTop: 30.78,
    width: 87,
    height: 3,
    color: colors.system.light.neutral,
  },
  handleSubTextTopUp: {
    fontFamily: 'Roboto',
    fontSize: '15px',
    marginTop: 8.83,
    fontWeight: 700,
    width: 300,
    height: 11.2,
    color: colors.system.light.neutral,
  },
  handleRepeatTopUp: {
    fontFamily: 'Roboto',
    fontSize: '12px',
    marginTop: 25.97,
    fontWeight: 300,
    width: 273,
    height: 12,
    color: colors.system.light.neutral,
  },
  handleSubRepeatTopUp: {
    fontFamily: 'Roboto',
    fontSize: '16px',
    fontWeight: 700,
    width: 84,
    height: 3,
    color: colors.system.light.neutral,
  },
})
