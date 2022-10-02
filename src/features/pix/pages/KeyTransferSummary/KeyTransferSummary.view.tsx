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
import { LabelWithValueKeyPix } from 'components/LabelWithValueKeyPix'
import { cancelLabel, concludeLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { TagChip } from 'features/tags/components/TagChip'
import React from 'react'
import { useStyles } from './KeyTransferSummary.style'
import { AuthorizationSheet } from 'components/AuthorizationSheet'
import { Loader } from 'components/Loader'
import { Alert } from 'components/Alert'

interface KeyTransferSummaryViewProps {
  onSubmit: VoidFunction
  onCancelButtonClick: VoidFunction
  name?: string
  description?: string
  tags?: string[]
  value?: number
  date?: Date
  taxId?: string
  openAuthorizationSheet?: any
  onAuthorizationClose?: Function
  errorMessage?: string
  loading: boolean
  pixKeyType?: string
  pixKey?: string
}

export const KeyTransferSummaryView: React.FC<KeyTransferSummaryViewProps> = ({
  onSubmit,
  onCancelButtonClick,
  value,
  date,
  name,
  description,
  tags,
  taxId,
  openAuthorizationSheet,
  onAuthorizationClose,
  errorMessage,
  loading,
  pixKeyType,
  pixKey,
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
              <LabelWithValueKeyPix
                name={name}
                totalValue={value!}
                taxPayer={taxId}
                keyPix={`${pixKeyType}: ${pixKey}`}
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
        onClose={onAuthorizationClose!}
      />
      <Loader open={loading} />
      {errorMessage && (
        <Alert title="Error" message={errorMessage} severity="error" />
      )}
    </PageContainer>
  )
}
