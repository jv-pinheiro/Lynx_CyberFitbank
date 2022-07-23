import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './FirstSlide.style'
import { SlideContent } from '../SlideContent'
import { Icon } from 'components/Icon'

export const FirstSlide: React.FC = () => {
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
          <Icon name={'pixChange'} className={styles.image} />
        </Box>
      </>
      <Typography className={styles.text}>
        Com o <strong>Pix Saque</strong> e o <strong>Pix Troco</strong>, você
        terá novas possibilidades de efetuar saques, sendo que no Pix Troco, o
        saque acontece junto com a realização de uma compra. Os estabelecimentos
        comerciais poderão, a seu critério, ofertar o Pix Saque e o Pix Troco.
      </Typography>
    </SlideContent>
  )
}
