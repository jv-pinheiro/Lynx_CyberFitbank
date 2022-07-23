import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { AccountRoutes } from 'features/account/constants/routes'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { ArrowRight, Close, KeyboardArrowRight } from '@material-ui/icons'
import { Box, Grid, MenuItem, Typography } from '@material-ui/core'
import { TextField, TransparentTextField } from 'components'
import { ErrorMessage } from 'components/ErrorMessage'
import { ActionListItem } from 'components/ActionListItem'
import { HelpPixQrCode } from '../components/HelpPixQrCode'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { useStyles } from './ReceivePixQrCodeValue.style'
import { SelectionButton } from 'features/pix/components/SelectionButton'
import Check from '_assets/icons/Check.svg'
import { maskCnpj, maskCpf } from '_utils/masks/taxPayer'
import { PixKeyType } from 'features/pix/redux/models/pixKeyType'
import { maskPhone } from '_utils/masks/phone'
import { PixRoutes } from 'features/pix/constants/routes'

interface ReceivePixQrCodeValueViewProps {
  onCancelButtonClick: VoidFunction
  isValidValue: boolean
  valueInput: string
  onSubmit: (e: React.FormEvent) => void
  balanceIsValid: boolean | undefined
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  description: string
  onIdentifierChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDoubtClick: VoidFunction
  onHelpClick: VoidFunction
  onHelpPixQRCode: boolean
  onHelpPixQRCodeClose: Function | ((HelpPixQRCodeValid: boolean) => void)
  loading: boolean
  errorMessage: string | undefined
  onAlertClose: VoidFunction
  Identifier: { id: string; value: string }[]
  optionalIdentifier: string
  pixKeyType?: number
  payeeValue?: string
}

export const ReceivePixQrCodeValueView: React.FC<
  ReceivePixQrCodeValueViewProps
> = ({
  onCancelButtonClick,
  isValidValue,
  valueInput,
  onSubmit,
  balanceIsValid,
  onValueChange,
  onDescriptionChange,
  description,
  onIdentifierChange,
  onHelpClick,
  onHelpPixQRCode,
  onHelpPixQRCodeClose,
  loading,
  errorMessage,
  onAlertClose,
  Identifier,
  optionalIdentifier,
  pixKeyType,
  payeeValue,
}) => {
  const styles = useStyles()

  const applyMaskPixKey = (keyType: number, keyValue: string) =>
    keyType === PixKeyType.CPF
      ? maskCpf(keyValue)
      : keyType === PixKeyType.CNPJ
      ? maskCnpj(keyValue)
      : maskPhone(keyValue)

  return (
    <PageContainer>
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
          <React.Fragment>
            <ProcessDescriptionHeader title="Transferência com Pix" />
            <Grid
              container
              direction="column"
              spacing={1}
              className={styles.subheader}
            >
              <TransparentTextField
                label="Qual o valor do Pix?"
                value={valueInput}
                onChange={onValueChange}
              />
              <Box className={styles.message}>
                {!balanceIsValid && (
                  <ErrorMessage message={'Saldo insuficiente'} />
                )}
              </Box>
            </Grid>
          </React.Fragment>
        }
        main={
          <Grid container direction="column">
            <Box className={styles.text}>
              <TextField
                label="Envie uma mensagem(opcional)"
                placeholder="Escreva sua mensagem"
                value={description}
                onChange={onDescriptionChange}
              />
            </Box>

            <Grid item className={styles.optionalIdentifier}>
              <TextField
                label="Identificador"
                value={optionalIdentifier}
                onChange={onIdentifierChange}
                select
              >
                {Identifier.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Box>
              <ActionListItem onClick={onHelpClick}>Dúvida?</ActionListItem>
            </Box>
            <Box className={styles.receiverSection}>
              <SelectionButton
                id="receiver-info-card"
                title="Chave Selecionada"
                subtitle={
                  pixKeyType! === PixKeyType.CPF ||
                  pixKeyType! === PixKeyType.CNPJ ||
                  pixKeyType! === PixKeyType.PhoneNumber
                    ? applyMaskPixKey(pixKeyType!, payeeValue!)
                    : payeeValue
                }
                startIcon={Check}
              />
            </Box>
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                palette="primary"
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={!isValidValue}
                onClick={onSubmit}
              >
                {nextLabel}
              </Button>
            }
          />
        }
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
      <HelpPixQrCode open={onHelpPixQRCode} onClose={onHelpPixQRCodeClose} />
    </PageContainer>
  )
}
