import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './SecondSlide.style'
import { SlideContent } from '../SlideContent'
import { Icon } from 'components/Icon'

export const SecondSlide: React.FC = () => {
  const styles = useStyles()

  return (
    <SlideContent>
      <>
        <Typography variant="h1" className={styles.title}>
          Chegou o
          <br />
          <strong>Pix Saque e o PIX troco</strong>
        </Typography>
        <Box display="flex" justifyContent="center">
          <Icon name={'pixWithdrawal'} className={styles.image} />
        </Box>
      </>
      <Typography className={styles.text}>
        O Pix Saque também poderá ser ofertado em caixas eletrônicos, a critério
        das instituições prestadoras do serviço. Você tem direito a 8 transações
        de retirada gratuitas por mês, incluindo Pix Saque e Pix Troco e os
        saques tradicionais.
      </Typography>
    </SlideContent>
  )
}
