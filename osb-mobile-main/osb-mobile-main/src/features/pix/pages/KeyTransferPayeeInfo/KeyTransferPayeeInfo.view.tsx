/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooter,
  ProcessPageFooterButton,
  ProcessPageLayout,
} from 'components'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { useStyles } from './KeyTransferPayeeInfo.style'
import { AccountRoutes } from 'features/account/constants/routes'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
interface KeyTransferPayeeInfoViewProps {
  onNextButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
  payeeName?: string
  payeePixKeyValueText?: string
  loading: boolean
  errorMessage?: string
  disabled?: boolean
}
export const KeyTransferPayeeInfoView: React.FC<
  KeyTransferPayeeInfoViewProps
> = ({
  onNextButtonClick,
  onCancelButtonClick,
  payeeName: payeeName,
  payeePixKeyValueText: payeePixKeyValueText,
  loading,
  errorMessage,
  disabled,
}) => {
  const styles = useStyles()
  return (
    <PageContainer className={styles.page}>
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
          <ProcessDescriptionHeader
            title="Transferência com PIX"
            subtitle="Recebedor"
            description="Confira, cuidadosamente, quem receberá de seu PIX."
          />
        }
        main={
          <Box className={styles.payeeInfo}>
            <Typography variant="h6">{payeeName}</Typography>
            {/* TODO: Parametrizar exibição do tipo de chave */}
            <Typography>{payeePixKeyValueText}</Typography>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <ProcessPageFooterButton
                primary
                endIcon={<KeyboardArrowRight />}
                onClick={onNextButtonClick}
                disabled={disabled}
              >
                {nextLabel}
              </ProcessPageFooterButton>
            }
          />
        }
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Erro" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
