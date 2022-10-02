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
import { Alert } from 'components/Alert'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { LabelWithValueBank } from 'components/LabelWithValueBank'
import { Loader } from 'components/Loader'
import { cancelLabel, concludeLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { TagChip } from 'features/tags/components/TagChip'
import React from 'react'
import { useStyles } from './TransferSummary.style'

interface TransferSummaryViewProps {
  onSubmit: VoidFunction
  onCancelButtonClick: VoidFunction
  value: number
  date: Date
  openAuthorizationSheet: any
  onAuthorizationClose: Function
  errorMessage?: string
  loading: boolean
  name?: string
  taxId?: string
  description?: string
  tags?: string[]
}

export const TransferSummaryView: React.FC<TransferSummaryViewProps> = ({
  onSubmit,
  onCancelButtonClick,
  value,
  date,
  openAuthorizationSheet,
  onAuthorizationClose,
  errorMessage,
  loading,
  name,
  taxId,
  description,
  tags,
}) => {
  const styles = useStyles()

  const tagsView = React.useMemo(() => {
    return tags?.map(t => <TagChip label={t} key={t} />)
  }, [])

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
            subtitle="Hora de conferir"
            description="Confira, cuidadosamente, os dados da transferência."
          />
        }
        main={
          <React.Fragment>
            <Box>
              <LabelWithValueBank
                name={name}
                totalValue={value}
                taxId={taxId}
                datePix={date}
                description={description!}
              />
            </Box>
            <Typography className={styles.txtalert}>Suas TAGs</Typography>
            <Box
              id="tags"
              display="grid"
              gridAutoRows="1fr"
              gridColumnGap={4}
              gridTemplateColumns="repeat(5, 1fr)"
            >
              {tagsView}
            </Box>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <ProcessPageFooterButton
                primary
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
              >
                {concludeLabel}
              </ProcessPageFooterButton>
            }
          />
        }
      />
      <AuthorizationSheet
        open={openAuthorizationSheet}
        onClose={onAuthorizationClose}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Error" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
