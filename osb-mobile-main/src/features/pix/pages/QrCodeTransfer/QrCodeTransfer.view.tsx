import React from 'react'
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
} from 'components'
import { cancelLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { useStyles } from './QrCodeTransfer.style'
import { QrCodeReader } from 'components/QrCodeReader'
import { Close } from '@material-ui/icons'
import { Alert } from 'components/Alert'
import { Loader } from 'components/Loader'

interface QrCodeTransferViewProps {
  onCancelButtonClick: VoidFunction
  onScanComplete: (hash: string | null) => void
  onScanFail: (e: any) => void
  errorMessage: string | undefined
  loading: boolean
  onAlertClose: VoidFunction
  onBackPage: VoidFunction
}

export const QrCodeTransferView: React.FC<QrCodeTransferViewProps> = ({
  onCancelButtonClick,
  onScanComplete,
  onScanFail,
  loading,
  errorMessage,
  onAlertClose,
  onBackPage,
}) => {
  const styles = useStyles()

  return (
    <PageContainer className={styles.container}>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={AccountRoutes.home}
            action={
              <Button
                palette="secondary"
                size="small"
                startIcon={<Close color="inherit" />}
                onClick={onCancelButtonClick}
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader title="Enviar transferência via QR code" />
        }
        main={
          <QrCodeReader
            onScanFail={onScanFail}
            onScanComplete={onScanComplete}
          />
        }
        footer={<ProcessPageFooterButton onClick={onBackPage} />}
      />

      <Loader open={loading} />
      {errorMessage && (
        <Alert
          title="Erro"
          message={errorMessage}
          severity={'error'}
          onClose={onAlertClose}
        />
      )}
    </PageContainer>
  )
}
