import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { useStyles } from './SelectAccountType.style'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { SelectionCard } from 'components/SelectionCard'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { cancelLabel } from 'constants/buttons/labels'

interface SelectAccountTypeViewProps {
  onCancelButtonClick: VoidFunction
  onSavingsAccountClick: VoidFunction
  onCheckingAccountClick: VoidFunction
  name?: string
}

export const SelectAccountTypeView: React.FC<SelectAccountTypeViewProps> = ({
  onSavingsAccountClick,
  onCancelButtonClick,
  onCheckingAccountClick,
  name,
}) => {
  const styles = useStyles()

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={''}
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
            subtitle={`Qual o tipo da conta de ${name} ?`}
            description="Para realizar a transferência, precisamos que você informe o tipo da conta destino."
          />
        }
        main={
          <React.Fragment>
            <Box className={styles.accountTypeHeader}>
              <Typography variant="caption">Tipo de conta</Typography>
            </Box>
            <Box className={styles.selectionCards}>
              <SelectionCard
                title="Conta Corrente"
                endIcon={'next'}
                onClick={onCheckingAccountClick}
              />
              <SelectionCard
                title="Conta Poupança"
                endIcon={'next'}
                onClick={onSavingsAccountClick}
              />
            </Box>
          </React.Fragment>
        }
        footer={<ProcessPageFooter />}
      />
    </PageContainer>
  )
}
