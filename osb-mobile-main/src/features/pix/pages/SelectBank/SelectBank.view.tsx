import React from 'react'
import { PageContainer } from 'components/PageContainer'
import { AppBar } from 'components/AppBar'
import { AccountRoutes } from 'features/account/constants/routes'
import { SearchField } from 'components/SearchField/SearchField'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Box } from '@material-ui/core'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Button } from 'components/Button'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { useStyles } from './SelectBank.style'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { ProcessPageFooterButton } from 'components'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'
import { Banks } from 'features/pix/redux/models/banks'
import { BankCard } from 'features/transference/components/BankCard'

interface SelectBankPixViewProps {
  onNextButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
  disableNextButton: boolean
  toBank: string
  _search: (value: string) => void
  name?: string
  displayBanks?: any
  onBankClick?: any
  errorMessage?: string
  loading: boolean
}

export const SelectBankView: React.FC<SelectBankPixViewProps> = ({
  onNextButtonClick,
  onCancelButtonClick,
  disableNextButton,
  toBank,
  name,
  displayBanks,
  onBankClick,
  _search,
  errorMessage,
  loading,
}) => {
  const styles = useStyles()

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
            subtitle={`Qual o banco da conta de ${name} que você deseja transferir?`}
            description="Selecione a instituição na lista ou busque pelo nome ou código do banco."
          />
        }
        main={
          <Box display="flex" flexDirection="column">
            <Box className={styles.searchField}>
              <SearchField
                placeholder="Busque por nome ou código"
                onChange={e => _search(e.target.value)}
              />
            </Box>
            <Box>
              {displayBanks?.map((bank: Banks) => (
                <BankCard
                  key={bank.code}
                  bank={bank}
                  selected={toBank === bank.code}
                  onClick={onBankClick}
                />
              ))}
            </Box>
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <ProcessPageFooterButton
                primary
                endIcon={<KeyboardArrowRight color="secondary" />}
                disabled={disableNextButton}
                onClick={onNextButtonClick}
              >
                {nextLabel}
              </ProcessPageFooterButton>
            }
          />
        }
        footerPosition="fixed"
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Erro" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
