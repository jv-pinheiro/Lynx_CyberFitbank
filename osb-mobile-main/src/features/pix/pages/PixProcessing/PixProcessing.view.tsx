import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { PageContainer } from 'components/PageContainer'
import { AppBar } from 'components/AppBar'
import { useStyles } from './PixProcessing.style'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AccountRoutes } from 'features/account/constants/routes'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { cancelLabel } from 'constants/buttons/labels'
import { Icon } from 'components/Icon'

interface PixProcessingViewProps {
  onCancelButtonClick: VoidFunction
}

export const PixProcessingView: React.FC<PixProcessingViewProps> = ({
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
              Pix em <br />
              processamento
            </Typography>
            <Box display="flex" justifyContent="center">
              <Icon name={'transferProcess'} className={styles.img} />
            </Box>

            <Typography variant="body1" className={styles.description}>
              Sua solicitação será processada e aparecerá em seu extrato após a
              conclusão.
            </Typography>

            <Grid item className={styles.box}>
              <Grid className={styles.detailPixContent}>
                <Typography> Pix no valor de </Typography>
                <Typography className={styles.pixDetail}>R$ 137,00</Typography>
                <Typography> para a conta de </Typography>
                <Typography className={styles.pixDetail}>
                  José da Silva
                </Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        }
      />
    </PageContainer>
  )
}
