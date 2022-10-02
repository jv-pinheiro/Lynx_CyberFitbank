import React from 'react'
import { Close } from '@material-ui/icons'
import { Button } from 'components/Button'
import { Box, Typography, Drawer } from '@material-ui/core'
import { useStyles } from './InvalidValuePopUp.style'
import { PageContainer } from 'components/PageContainer'

interface InvalidValueProps {
  open: boolean
  onClose: (value: boolean) => void
}

export const InvalidValuePopUp: React.FC<InvalidValueProps> = ({
  open,
  onClose,
}) => {
  const styles = useStyles()

  const onCloseButtonClick = () => {
    onClose(false)
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
            <Box>
              <Typography className={styles.title}>Oops...</Typography>
            </Box>
            <Box className={styles.message}>
              <Typography className={styles.invalidValueText}>
                Valor inválido
              </Typography>
              <Typography className={styles.text}>
                O limite para PIX Saque e PIX Troco determinados pelo Banco
                Central é de R$500,00 diário e R$ 100,00 para noturno
              </Typography>
            </Box>
            <Box className={styles.button}>
              <Button
                onClick={onCloseButtonClick}
              >Entendi</Button>
            </Box>
          </Box>
        </PageContainer>
      </Drawer>
    </React.Fragment>
  )
}
