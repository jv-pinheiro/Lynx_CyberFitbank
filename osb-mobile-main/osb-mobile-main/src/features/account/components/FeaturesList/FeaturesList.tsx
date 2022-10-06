import { Box } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import { TransferenceRoutes } from 'features/transference/constants/routes'
import { PaymentRoutes } from 'features/payment/constants/routes'
import { QrCodeTransferRoutes } from 'features/qrCodeTransfer/constants/routes'
import { CardRoutes } from 'features/card/constants/routes'
import { TopUpRoutes } from 'features/topUp/constants/routes'
import { SquareButtonWithIcon } from 'components/SquareButtonWithIcon'
import { useStyles } from './FeaturesList.style'
import { SchedulePayments } from 'features/schedulePayments/constants/routes'
import { DigitalWithdrawalRoutes } from 'features/digitalWithdrawal/constants/routes'
import { PixRoutes } from 'features/pix/constants/routes'
import { StoreState } from 'redux/state'
import { useSelector } from 'react-redux'
import { UiFunction } from 'features/account/redux/models/uiFunction'
interface FeaturesListProps {
  className?: string
}

export const FeaturesList: React.FC<FeaturesListProps> = ({ className }) => {
  const uiFunctions = useSelector(
    (state: StoreState) => state.account.dashboard?.uiFunctions,
  )
  const history = useHistory()
  const styles = useStyles()

  const onTransferButtonClick = () => {
    history.push(TransferenceRoutes.transference)
  }

  const onPaymentButtonClick = () => {
    history.push(PaymentRoutes.barcodePayment)
  }

  const onQrCodeTransferClick = () => {
    history.push(QrCodeTransferRoutes.qrCodeTransfer)
  }

  const onPixClick = () => {
    history.push(PixRoutes.home)
  }

  const onTopUpButtonClick = () => {
    history.push(TopUpRoutes.topUp)
  }

  const onCardManagementClick = () => {
    history.push(CardRoutes.cardManagement)
  }

  const onSchedulePaymentsClick = () => {
    history.push(SchedulePayments.ScheduleTransactions)
  }

  const onDigitalWithdrawalClick = () => {
    history.push(DigitalWithdrawalRoutes.digitalWithdrawalStart)
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns="auto auto auto"
      gridAutoColumns="auto"
      gridRowGap="12px"
      gridColumnGap="8px"
      className={className}
      data-test-id="feature-list"
    >
      {(uiFunctions?.includes(UiFunction.internalTransfer) ||
        uiFunctions?.includes(UiFunction.moneyTransfer)) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label="Transferência"
            icon={'transfer'}
            onClick={onTransferButtonClick}
            data-test-id="transfer-button"
          />
        </Box>
      )}
      {uiFunctions?.includes(UiFunction.boletoPayment) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label="Pagamento"
            icon={'payment'}
            onClick={onPaymentButtonClick}
            data-test-id="payment-button"
          />
        </Box>
      )}
      {uiFunctions?.includes(UiFunction.pix) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label={'Pix'}
            icon={'pix'}
            onClick={onPixClick}
          />
        </Box>
      )}
      {(uiFunctions?.includes(UiFunction.generateQrCode) ||
        uiFunctions?.includes(UiFunction.readQrCode)) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label={'QRCode'}
            icon={'qrCode'}
            onClick={onQrCodeTransferClick}
            data-test-id="qrcode-button"
          />
        </Box>
      )}
      {uiFunctions?.includes(UiFunction.topUp) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label={'Recarga'}
            icon={'topUp'}
            onClick={onTopUpButtonClick}
            data-test-id="top-up-button"
          />
        </Box>
      )}
      {uiFunctions?.includes(UiFunction.findCardList) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label={'Cartões'}
            icon={'cardManagement'}
            onClick={onCardManagementClick}
            data-test-id="card-button"
          />
        </Box>
      )}
      {uiFunctions?.includes(UiFunction.futureTransactions) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label={'Agendamentos'}
            icon={'shedulePayment'}
            onClick={onSchedulePaymentsClick}
            data-test-id="schedule-button"
          />
        </Box>
      )}
      {uiFunctions?.includes(UiFunction.digitalWithdrawal) && (
        <Box className={styles.featureItem}>
          <SquareButtonWithIcon
            label={'Saque'}
            icon={'digitalWithdrawal'}
            onClick={onDigitalWithdrawalClick}
            data-test-id="digital-withdrawal"
          />
        </Box>
      )}
    </Box>
  )
}
