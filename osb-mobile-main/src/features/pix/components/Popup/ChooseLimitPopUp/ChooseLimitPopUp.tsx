import React from 'react'
import { Box, Typography, Drawer } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Button } from 'components/Button'
import { useHistory } from 'react-router-dom'
import { useStyles } from './ChooseLimitPopUp.style'
import { PageContainer } from 'components/PageContainer'
import { PixRoutes } from 'features/pix/constants/routes'
import popUpPixArrow from '_assets/icons/popUpPixArrow.svg'
import popUpFavorites from '_assets/icons/popUpFavorites.svg'
import popUpPixSunIcon from '_assets/icons/popUpPixSunIcon.svg'
import popUpPixMoonIcon from '_assets/icons/popUpPixMoonIcon.svg'
import popUpWithdrawChangeIcon from '_assets/icons/popUpWithdrawChangeIcon.svg'
import { Icon } from 'components/Icon'
import { updateAccountLimitList } from 'features/pix/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { AccountOperationLimitType } from 'features/account/redux/models/accountOperationLimitType'

interface ChooseLimitPopUpProps {
  open: boolean
  onClose: (value: boolean) => void
}

export const ChooseLimitPopUp: React.FC<ChooseLimitPopUpProps> = ({
  open,
  onClose,
}) => {
  const styles = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const [dailyLimitMaxValue, setDailyLimitMaxValue] = React.useState(Number)
  const [overnightLimitMaxValue, setOvernightLimitMaxValue] =
    React.useState(Number)
  const [singleTransactionLimitMaxValue, setSingleTransactionLimitMaxValue] =
    React.useState(Number)

  const accountOperationLimitList = useSelector(
    (state: StoreState) => state.pix.accountOperationLimitList,
  )

  const operationLimits = useSelector(
    (state: StoreState) => state.pix.operationLimits,
  )

  React.useEffect(() => {
    accountOperationLimitList?.map(limitList => {
      limitList.type === AccountOperationLimitType.daily
        ? setDailyLimitMaxValue(limitList.maxValue)
        : limitList.type === AccountOperationLimitType.overNight
        ? setOvernightLimitMaxValue(limitList.maxValue)
        : setSingleTransactionLimitMaxValue(limitList.maxValue)
    })
  }, [accountOperationLimitList])

  const onDailyLimit = () => {
    dispatch(
      updateAccountLimitList({
        ...operationLimits,
        limitDaily: dailyLimitMaxValue!,
      }),
    )
    history.push(PixRoutes.totalDailyLimit)
  }

  const onNightlyLimit = () => {
    dispatch(
      updateAccountLimitList({
        ...operationLimits,
        limitOverNight: overnightLimitMaxValue!,
      }),
    )

    history.push(PixRoutes.nightlyLimit)
  }

  const onLimitPerTransaction = () => {}

  const onCloseButtonClick = () => {
    onClose(false)
  }

  const onLimitWithdrawChange = () => {
    history.push(PixRoutes.adjustLimit)
  }

  const onFavoritePerLimits = () => {}

  return (
    <React.Fragment>
      <Drawer
        className={styles.drawer}
        anchor="bottom"
        elevation={0}
        open={open}
        onClose={() => onClose(false)}
      >
        <PageContainer>
          <Box className={styles.content}>
            <Box className={styles.closeButton}>
              <Button
                size="small"
                palette="secondary"
                onClick={onCloseButtonClick}
                startIcon={<Close color="primary" />}
              >
                Fechar
              </Button>
            </Box>
            <Box className={styles.listOfLimits}>
              <Typography onClick={onDailyLimit} className={styles.typeLimits}>
                <Icon name="popUpPixSunIcon" className={styles.icon} />
                Limite Diário
              </Typography>
              <Box className={styles.line}></Box>
              <Typography
                onClick={onNightlyLimit}
                className={styles.typeLimits}
              >
                <Icon name="popUpPixMoonIcon" className={styles.icon} />
                Limite Noturno
              </Typography>
              <Box className={styles.line}></Box>
              {/*   <Typography className={styles.typeLimits}>
                <Icon name="popUpPixArrow" className={styles.icon} />
                Limite por Transação
              </Typography>
              <Box className={styles.line}></Box>
              <Typography
                className={styles.typeLimits}
                onClick={onLimitWithdrawChange}
              >
                <Icon name="popUpWithdrawChangeIcon" className={styles.icon} />
                Limite Saque/troco
              </Typography>
              <Box className={styles.line}></Box>
              <Typography className={styles.typeLimits}>
                <Icon name="popUpFavorites" className={styles.icon} />
                Limites para favoritos
              </Typography> */}
            </Box>
          </Box>
        </PageContainer>
      </Drawer>
    </React.Fragment>
  )
}
