import { alpha, makeStyles } from '@material-ui/core'
import { colors } from '_config'

export const useStyles = makeStyles({
  card: {
    backgroundColor: colors.system.light.primary,
    borderRadius: '4px',
    boxShadow: `0px 2px 2px ${alpha(
      colors.readOnly.light.black,
      0.12,
    )}, 0px 0px 2px ${alpha(colors.readOnly.light.black, 0.24)}`,
    columnGap: '24px',
    cursor: 'pointer',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    padding: '24px',
  },
  iconWrapper: {
    display: 'flex',
  },
  textDescription: {
    width: '90px',
    fontSize: '14px',
    fontWeight: 500,
    color: colors.system.light.onPrimary,
  },
})
