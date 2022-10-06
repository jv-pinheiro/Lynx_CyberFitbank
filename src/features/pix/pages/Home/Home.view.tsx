import React from 'react'
import {
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
} from 'components'
import { Box } from '@material-ui/core'
import { QrCodeTransferCard, SectionTitle } from './components'
import { SelectionCard } from 'components/SelectionCard'
import { RecentFavoredCard } from 'components/RecentFavoredCard'

import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AccountRoutes } from 'features/account/constants/routes'
import { AppBar } from 'components/AppBar'
import { cancelLabel } from 'constants/buttons/labels'
import { Close } from '@material-ui/icons'
import { Icon } from 'components/Icon'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { useStyles } from './Home.style'
import { PixButtonConfig } from './components/PixButtonConfig'

interface HomeViewProps {
  onTransferWithKeyClick: VoidFunction
  onCopyPasteTransferClick: VoidFunction
  onPixKeysClick: VoidFunction
  onReceivePixQRCodeClick: VoidFunction
  loading: boolean
  errorMessage: string | undefined
  onAlertClose: VoidFunction
  onCancelButton: VoidFunction
  onHelpClick: VoidFunction
  onBackToHome: VoidFunction
  onMyLimitsPix: VoidFunction
}

export const HomeView: React.FC<HomeViewProps> = ({
  onTransferWithKeyClick,
  onCopyPasteTransferClick,
  onPixKeysClick,
  onReceivePixQRCodeClick,
  loading,
  errorMessage,
  onAlertClose,
  onCancelButton,
  onHelpClick,
  onBackToHome,
  onMyLimitsPix,
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
                startIcon={<Close color="primary" />}
                onClick={onCancelButton}
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Minha área PIX"
            subtitle="Pagamento e recebimento instantâneo"
            description="Com o Pix você pode realizar ou receber pagamentos em instantes a qualquer dia e hora."
          />
        }
        main={
          <Box className={styles.content}>
            <Box component="section" className={styles.paymentMethodsSection}>
              <Box gridArea="1 / span 2">
                <SectionTitle>Pagar com pix</SectionTitle>
              </Box>
              <Box display="flex" justifyContent="center" gridArea="2 / span 2">
                <QrCodeTransferCard />
              </Box>
              <SelectionCard
                variant="pix"
                title="Transferir"
                subtitle="Usando chave ou dados bancários"
                startIcon={'pixTransfer'}
                className={styles.pixPaymentMethodCard}
                onClick={onTransferWithKeyClick}
              />
              <SelectionCard
                variant="pix"
                title="PIX Copia e Cola"
                subtitle="Cole o código"
                startIcon={'pixCopyPaste'}
                className={styles.pixPaymentMethodCard}
                onClick={onCopyPasteTransferClick}
              />
            </Box>
            <Box component="section">
              <SectionTitle>Cobrar e receber</SectionTitle>
              <SelectionCard
                variant="pix"
                title="Cobrar e Receber"
                subtitle="Cobre com o PIX"
                startIcon={'pixCharge'}
                className={styles.collectAndReceipt}
                onClick={onReceivePixQRCodeClick}
              />
            </Box>
            {/*             <Box component="section">
              <SectionTitle>Recentes</SectionTitle>
              <Box className={styles.favoredList}>
                <RecentFavoredCard
                  name="José Pinho"
                  taxId="000.xxx.xxx.00"
                  bank="Bradesco"
                />
                <RecentFavoredCard
                  name="Maria Costa Silva"
                  taxId="000.xxx.xxx.00"
                  bank="Itaú"
                />
                <RecentFavoredCard
                  name="Antonio José"
                  taxId="000.xxx.xxx.00"
                  bank="NuBank"
                />
              </Box>
            </Box> */}
            <Box component="section" className={styles.optionsList}>
              <PixButtonConfig
                title="Minhas chaves"
                subtitle="Gerencie suas chaves registradas no Fitbank"
                startIcon={'pixKeys'}
                onClick={onPixKeysClick}
              />
              <PixButtonConfig
                title="Meus limites Pix"
                subtitle="Consulte e solicite alterações nos seus limites"
                startIcon={'pixLimits'}
                onClick={onMyLimitsPix}
              />
              <PixButtonConfig
                title="Precisa de ajuda?"
                subtitle="Podemos te ajudar"
                startIcon={'pixHelp'}
                onClick={onHelpClick}
              />
            </Box>
          </Box>
        }
        footer={
          <ProcessPageFooter
            secondaryButton={
              <ProcessPageFooterButton
                onClick={onBackToHome}
              ></ProcessPageFooterButton>
            }
          />
        }
        footerPosition="fixed"
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
