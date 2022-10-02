import React from 'react'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AccountRoutes } from 'features/account/constants/routes'
import { Button } from 'components/Button'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { Box } from '@material-ui/core'
import {
  ProcessPageFooter,
  ProcessPageFooterButton,
  TextField,
} from 'components'

interface TransferPayeeTaxIdViewProps {
  onSubmit: VoidFunction
  onCancelButtonClick: VoidFunction
  onTaxIdChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}

export const TransferPayeeTaxIdView: React.FC<TransferPayeeTaxIdViewProps> = ({
  onSubmit,
  onCancelButtonClick,
  onTaxIdChange,
  value,
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
            title="Transferência com Pix"
            subtitle="Informe o CPF ou CNPJ de quem receberá sua transferência"
          />
        }
        main={
          <Box component="form" onSubmit={onSubmit}>
            <TextField
              label="CPF/CNPJ"
              placeholder="Digite aqui"
              inputMode="numeric"
              value={value}
              onChange={onTaxIdChange}
            />
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <ProcessPageFooterButton
                primary
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={!(value.length === 14 || value.length === 18)}
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
