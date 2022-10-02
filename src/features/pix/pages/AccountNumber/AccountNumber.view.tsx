import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { AccountRoutes } from 'features/account/constants/routes'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { TextField } from 'components/TextField'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Box } from '@material-ui/core'
import { ProcessPageFooterButton } from 'components'

interface AccountNumberPixViewProps {
  onSubmit: (event: React.FormEvent) => void
  onCancelButtonClick: VoidFunction
  onAccountNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  accountNumber: string
}

export const AccountNumberView: React.FC<AccountNumberPixViewProps> = ({
  onSubmit,
  onCancelButtonClick,
  onAccountNumberChange,
  accountNumber,
}) => {
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
          <ProcessDescriptionHeader
            title="Transferência com Pix"
            subtitle="Qual o número da conta?"
            description="Informe o número completo da conta, incluindo o dígito."
          />
        }
        main={
          <Box component="form" onSubmit={onSubmit}>
            <TextField
              label="Conta"
              placeholder="Digite apenas números"
              inputMode="numeric"
              value={accountNumber}
              onChange={onAccountNumberChange}
            />
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <ProcessPageFooterButton
                primary
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={accountNumber.length < 5}
                onClick={onSubmit}
              >
                {nextLabel}
              </ProcessPageFooterButton>
            }
          />
        }
      />
    </PageContainer>
  )
}
