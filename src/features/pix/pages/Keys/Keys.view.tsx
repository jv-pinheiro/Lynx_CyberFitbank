import { Box, Typography } from '@material-ui/core'
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooter,
  ProcessPageLayout,
  SelectionCard,
} from 'components'
import React from 'react'
import { maskPhone } from '_utils/masks/phone'
import { maskCnpj, maskCpf } from '_utils/masks/taxPayer'
import { EmptyListMessage } from './components/EmptyListMessage'
import { useStyles } from './Keys.styles'
import { PixKeys } from 'features/pix/redux/models/PixKey'
import { PixKeyType } from 'features/pix/redux/models/pixKeyType'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { AlertConcluded } from 'components/AlertConcluded'
import { KeyType } from 'features/pix/redux/models/keyType'
import { AccountRoutes } from 'features/account/constants/routes'
import { Close, KeyboardArrowLeft } from '@material-ui/icons'
import { cancelLabel } from 'constants/buttons/labels'
import { ConfirmDeletionKeySheet } from './components/ConfirmDeletionKeySheet'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { SelectPixKey } from 'features/pix/redux/models/selectPixKey'
import { PixKeyStatus } from 'features/pix/redux/models/pixKeyStatus'

interface KeysViewProps {
  onPixKeysTaxIdClick: VoidFunction
  onPixKeysEmailClick: VoidFunction
  onPixKeysPhoneClick: VoidFunction
  onPixKeysRandomClick: VoidFunction
  onCancelButtonClick: VoidFunction
  onBackButtonClick: VoidFunction
  registeredKeyList?: PixKeys[]
  loading: boolean
  errorMessage?: string
  onConfirmDeletion: any
  onSelectKeyToDelete: (pixDetails: SelectPixKey) => void
  closeDeletionDrawer: VoidFunction
  openPopUpRemoveKeyConfirm: boolean
  showAlert: boolean
  onCloseAlert: VoidFunction
  onClickAlert: VoidFunction
  onCloseErrorAlert: VoidFunction
  openAuthorizationSheet: boolean
  onAuthorizationClose: (event: any) => void
}
export const KeysView: React.FC<KeysViewProps> = ({
  onPixKeysTaxIdClick,
  onPixKeysEmailClick,
  onPixKeysPhoneClick,
  onPixKeysRandomClick,
  onCancelButtonClick,
  onBackButtonClick,
  registeredKeyList,
  loading,
  errorMessage,
  onConfirmDeletion,
  onSelectKeyToDelete,
  closeDeletionDrawer,
  openPopUpRemoveKeyConfirm,
  showAlert,
  onCloseAlert,
  onClickAlert,
  onCloseErrorAlert,
  onAuthorizationClose,
  openAuthorizationSheet,
}) => {
  const styles = useStyles()

  const applyMaskPixKey = (keyType: number, keyValue: string) =>
    keyType === PixKeyType.CPF
      ? maskCpf(keyValue)
      : keyType === PixKeyType.CNPJ
      ? maskCnpj(keyValue)
      : maskPhone(keyValue.substring(3))

  const mapPixKeyTypeToIcon = (keyType: number) =>
    PixKeyType.CPF === keyType || PixKeyType.CNPJ === keyType
      ? 'pixTaxId'
      : PixKeyType.Email === keyType
      ? 'pixMail'
      : PixKeyType.PhoneNumber === keyType
      ? 'pixPhone'
      : 'pixKey'

  const isRegistered = (keyType?: number) => {
    const verifyIfKeyExist = registeredKeyList?.some(pixKey => {
      if (keyType === 0 && pixKey.pixKeyType === 1) return true

      return pixKey.pixKeyType === keyType
    })
    return verifyIfKeyExist
  }

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
                startIcon={<Close color="primary" />}
                onClick={onCancelButtonClick}
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Minhas chaves Pix"
            subtitle="Gerencie e compartilhe suas chaves"
            description="Pode ser para uma conta bancária ou por mensagem de texto no celular, mesmo que o beneficiário não tenha conta bancária."
          />
        }
        main={
          <>
            <Typography className={styles.text}>Chaves cadastradas</Typography>
            <Box
              display="grid"
              gridAutoRows="1fr"
              gridRowGap={1}
              margin="0 -16px"
              className={styles.keyTypesList}
            >
              {registeredKeyList?.length ? (
                <>
                  {registeredKeyList?.map((pixKey, key) => {
                    return (
                      <SelectionCard
                        variant="pix"
                        title={PixKeyType[pixKey.pixKeyType!]}
                        key={key}
                        subtitle={
                          pixKey.pixKeyType! === PixKeyType.CPF ||
                          pixKey.pixKeyType! === PixKeyType.CNPJ ||
                          pixKey.pixKeyType! === PixKeyType.PhoneNumber
                            ? applyMaskPixKey(
                                pixKey.pixKeyType!,
                                pixKey.pixKeyValue!,
                              )
                            : pixKey.pixKeyValue
                        }
                        startIcon={mapPixKeyTypeToIcon(pixKey.pixKeyType!)}
                        endLabel={
                          pixKey.status === PixKeyStatus.Registering
                            ? pixKey.pixKeyType === 2 || pixKey.pixKeyType === 3
                              ? 'Confirmar'
                              : 'Aguardando confirmação'
                            : 'Excluir'
                        }
                        onClick={() => onSelectKeyToDelete(pixKey)}
                      />
                    )
                  })}
                </>
              ) : (
                <EmptyListMessage />
              )}
            </Box>
            <Typography className={styles.text}>
              Chaves que você pode cadastrar
            </Typography>
            <Box
              display="grid"
              gridAutoRows="1fr"
              gridRowGap={1}
              margin="0 -16px"
              className={styles.keyTypesList}
            >
              <SelectionCard
                variant="pix"
                title={KeyType.taxId.displayString}
                subtitle={maskCpf('00000000000')}
                startIcon={'pixTaxId'}
                onClick={onPixKeysTaxIdClick}
                className={isRegistered(0) ? 'displayNone' : ''}
              />
              <SelectionCard
                variant="pix"
                title={KeyType.email.displayString}
                subtitle="meu_email@gmail.com"
                startIcon={'pixMail'}
                onClick={onPixKeysEmailClick}
                className={isRegistered(2) ? 'displayNone' : ''}
              />
              <SelectionCard
                variant="pix"
                title={KeyType.phone.displayString}
                subtitle={maskPhone('00000000000')}
                startIcon={'pixPhone'}
                onClick={onPixKeysPhoneClick}
                className={isRegistered(3) ? 'displayNone' : ''}
              />
              <SelectionCard
                variant="pix"
                title={KeyType.random.displayString}
                subtitle="Cadastrar"
                startIcon={'pixKey'}
                onClick={onPixKeysRandomClick}
                className={isRegistered(4) ? 'displayNone' : ''}
              />
            </Box>
          </>
        }
        footer={
          <ProcessPageFooter
            secondaryButton={
              <Button
                palette="secondary"
                startIcon={<KeyboardArrowLeft color="secondary" />}
                onClick={onBackButtonClick}
                data-test-id="home-button"
              >
                Voltar
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
          onClose={onCloseErrorAlert}
        />
      )}
      <ConfirmDeletionKeySheet
        open={openPopUpRemoveKeyConfirm}
        onClose={closeDeletionDrawer}
        onConfirmDeletion={onConfirmDeletion}
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose}
      />
      <AlertConcluded
        open={showAlert}
        onClose={onCloseAlert}
        onClick={onClickAlert}
        title={'Chave Cancelada com sucesso'}
      />
      {errorMessage && (
        <Alert title="Erro" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
