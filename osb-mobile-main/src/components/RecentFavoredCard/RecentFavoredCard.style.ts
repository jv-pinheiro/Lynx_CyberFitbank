import { makeStyles } from '@material-ui/core'
import { colors, theme } from '_config/theme'

export const useStyles = makeStyles({
  eachPixRecent: {
    '& button': {
      height: '48px',
      width: '112px',
      borderRadius: '6px',
      border: `1px solid ${colors.neutral.shade30}`,
      boxShadow: `0px 2px 4px 0px ${colors.readOnly.light.black}40`,
      padding: 0,
      color: colors.neutral.shade40,
      display: 'block',
      '& .expressionsWrapper': {
        marginTop: '5px',
        display: 'block',
        lineHeight: '1.2',
        marginLeft: '8px',
        '& .cpf': {
          fontFamily: 'Roboto',
          fontSize: '9px',
          fontStyle: 'normal',
          fontWeight: 400,
          letterSpacing: '0em',
          textAlign: 'left',
          display: 'block',
          alignItems: 'left',
        },
        '& .name': {
          fontFamily: 'Roboto',
          fontSize: '11px',
          fontStyle: 'normal',
          fontWeight: 500,
          letterSpacing: '0em',
          textAlign: 'left',
          display: 'block',
        },
        '& .bank': {
          fontFamily: 'Roboto',
          fontSize: '11px',
          fontStyle: 'normal',
          fontWeight: 400,
          letterSpacing: '0em',
          textAlign: 'left',
          display: 'block',
        },
      },
    },
  },
})
