import React from 'react'
import { useStyles } from './AdjustNightlyInternal.style'
import { AppBar } from 'components/AppBar'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AccountRoutes } from 'features/account/constants/routes'
import { Button } from 'components/Button'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Close } from '@material-ui/icons'
import { cancelLabel } from 'constants/buttons/labels'
import Moon from '_assets/img/MoonImage.svg'
import { Box, Typography } from '@material-ui/core'

interface AdjustNightlyInternalViewProps {
  onDefineNightLimitClick: VoidFunction
  onCancelButtonClick: VoidFunction
}

export const AdjustNightlyInternalView: React.FC<
  AdjustNightlyInternalViewProps
> = ({ onDefineNightLimitClick, onCancelButtonClick }) => {
  const styles = useStyles()

  return (
    <Box className={styles.pageWrapper}>
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
            <Box className={styles.header}>
              <ProcessDescriptionHeader title="Ajuste do período noturno" />
              <Box className={styles.imageWrapperReference}>
                <Box className={styles.imageWrapper}>
                  <img src={Moon} alt="Moon"></img>
                </Box>
              </Box>
            </Box>
          }
          main={
            <Box className={styles.mainContent}>
              <Typography className={styles.boxMessege}>
                Escolha o início do noturno:
                <Typography>
                  <Typography className={styles.timetables}>
                    20h&nbsp;
                  </Typography>
                  às&nbsp;
                  <Typography className={styles.timetables}>06h</Typography>
                </Typography>
              </Typography>
              <Box className={styles.limitSlider}>
                {/* <Slider
                    initialValueRange={initialValueSlider}
                    setInitialValueRange={setInitialValueSlider}
                  /> */}
              </Box>
              <Box className={styles.shareButtonMainWrapper}>
                <Button onClick={onDefineNightLimitClick}>Definir</Button>
              </Box>
            </Box>
          }
          footer={
            <Box>
              {/* <PopUpMensage open={onShowPopupShare} onClose={onClosePopUpShare} /> */}
            </Box>
          }
        />
      </PageContainer>
    </Box>
  )
}
