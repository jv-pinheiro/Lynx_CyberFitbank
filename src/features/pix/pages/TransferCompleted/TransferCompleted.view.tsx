import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { AppBar } from 'components/AppBar'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon'
import { useStyles } from './TransferCompleted.style'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AccountRoutes } from 'features/account/constants/routes'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { cancelLabel } from 'constants/buttons/labels'
import { Icon } from 'components/Icon'

interface TransferCompletedViewProps {
  onBackButtonClick: VoidFunction
  onReceiptButtonClick: VoidFunction
  onHomeButtonClick: VoidFunction
  onCancelButtonClick: VoidFunction
}

export const TransferCompletedView: React.FC<TransferCompletedViewProps> = ({
  onBackButtonClick,
  onReceiptButtonClick,
  onHomeButtonClick,
  onCancelButtonClick,
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
        main={
          <React.Fragment>
            <Typography variant="h3" className={styles.title}>
              Pix enviado
            </Typography>
            <Box display="flex" justifyContent="center">
              <Icon name={'completedTransfer'} className={styles.img} />
            </Box>
            <Box display="flex" justifyContent="center">
              {/*               
              <ButtonWithFloatingIcon
                icon={'receipt'}
                size="large"
                onClick={onReceiptButtonClick}
              >
                Comprovante
              </ButtonWithFloatingIcon> 
              */}
            </Box>
          </React.Fragment>
        }
        footer={
          <Grid container spacing={4} justify="center">
            <Grid item>
              <ButtonWithFloatingIcon size="large" onClick={onBackButtonClick}>
                Voltar ao Pix
              </ButtonWithFloatingIcon>
            </Grid>
            <Grid item>
              <ButtonWithFloatingIcon
                icon={<Icon name="home" />}
                size="large"
                onClick={onHomeButtonClick}
              >
                Início
              </ButtonWithFloatingIcon>
            </Grid>
          </Grid>
        }
      />
    </PageContainer>
  )
}
