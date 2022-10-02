import React from 'react'
import { Close } from '@material-ui/icons'
import { Button } from 'components/Button'
import { Box, Drawer, Typography } from '@material-ui/core'
import { useStyles } from './AdjustedLimitPopUp.style'
import { PageContainer } from 'components/PageContainer'

interface AdjustedLimitPopupProps{
  open: boolean;
  onClose: (value: boolean) => void;
}

export const AdjustedLimitPopUp: React.FC<AdjustedLimitPopupProps> = ({
  open,
  onClose
}) => {
  const styles = useStyles()

  const onCloseButtonClick = () => {
    //
  }

  return (
    <React.Fragment>
      <Drawer
        className={styles.drawer}
        anchor="bottom"
        elevation={0}
        open={open}
        onClose={() => onClose(false)}
      >
        <PageContainer>
          <Box className={styles.content}>
            <Box className={styles.closeButton}>
              <Button
                size="small"
                palette="secondary"
                onClick={onCloseButtonClick}
                startIcon={<Close color="primary" />}
              >
                Fechar
              </Button>
            </Box>
            <Box className={styles.message}>
              <Typography className={styles.adjustedLimitText}>Limite ajustado</Typography>
              <Typography className={styles.newLimitText}>Seu novo limite foi salvo</Typography>
            </Box>
          </Box>
        </PageContainer>
      </Drawer>
    </React.Fragment>
  )
}
