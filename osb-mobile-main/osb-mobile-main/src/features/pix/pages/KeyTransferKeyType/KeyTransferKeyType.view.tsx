/* eslint-disable no-control-regex */
import React from 'react'
import {
  AppBar,
  Button,
  PageContainer,
  ProcessDescriptionHeader,
  ProcessPageFooterButton,
  ProcessPageLayout,
  TextField,
} from 'components'
import { PixKeyTypeButtonList } from './components'
import { KeyType } from 'features/pix'
import { Box } from '@material-ui/core'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { AccountRoutes } from 'features/account/constants/routes'
import { Loader } from 'components/Loader'

interface KeyTransferKeyTypeViewProps {
  keyValue: string
  onKeyValueChange: React.ChangeEventHandler<HTMLInputElement>
  selectedKeyType: KeyType
  onKeyTypeChange: (_: KeyType) => void
  keyIsValid?: boolean
  loading: boolean
  onSubmit: React.FormEventHandler
  onCancelButtonClick: VoidFunction
  onBackButtonClick?: VoidFunction
}

export const KeyTransferKeyTypeView: React.FC<KeyTransferKeyTypeViewProps> = ({
  keyValue,
  onKeyValueChange,
  selectedKeyType,
  onKeyTypeChange,
  keyIsValid,
  loading,
  onSubmit,
  onCancelButtonClick,
  onBackButtonClick,
}) => {
  const placeholder = React.useMemo(() => {
    switch (selectedKeyType) {
      case KeyType.phone:
        return 'Celular do destinatário'

      case KeyType.taxId:
        return 'CPF/CNPJ do destinatário'

      case KeyType.email:
        return 'E-mail do destinatário'

      case KeyType.random:
        return 'Chave aleatória do destinatário'
    }
  }, [selectedKeyType])

  const inputMode = React.useMemo(() => {
    switch (selectedKeyType) {
      case KeyType.phone:
        return 'tel'

      case KeyType.taxId:
        return 'numeric'

      case KeyType.email:
        return 'email'

      case KeyType.random:
        return 'text'
    }
  }, [selectedKeyType])

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
            title="Transferência com PIX"
            subtitle="Utilizando chave Pix"
            description="Insira a chave fornecida pelo beneficiário."
          />
        }
        main={
          <Box
            display="grid"
            gridAutoRows="auto"
            component="form"
            onSubmit={onSubmit}
          >
            <PixKeyTypeButtonList onKeyTypeChange={onKeyTypeChange} />
            <TextField
              label={''}
              inputMode={inputMode}
              placeholder={placeholder}
              value={keyValue}
              onChange={onKeyValueChange}
            />
          </Box>
        }
        footer={
          <Box display="flex" justifyContent="space-between">
            <ProcessPageFooterButton onClick={onBackButtonClick} />
            <ProcessPageFooterButton
              primary
              disabled={!keyIsValid}
              endIcon={<KeyboardArrowRight />}
              onClick={onSubmit}
            >
              {nextLabel}
            </ProcessPageFooterButton>
          </Box>
        }
      />
      <Loader open={loading} />
    </PageContainer>
  )
}
