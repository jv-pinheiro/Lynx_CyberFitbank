import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { useStyles } from './QrCodeTransferCard.style'
import { ReactComponent as PixQrCode } from '_assets/icons/pix-qrcode.svg'

interface QrCodeTransferCardViewProps {
  onQrCodeTransferClick: VoidFunction
}

export const QrCodeTransferCardView: React.FC<QrCodeTransferCardViewProps> = ({
  onQrCodeTransferClick,
}) => {
  const styles = useStyles()

  return (
    <Box className={styles.card} onClick={onQrCodeTransferClick}>
      <Box className={styles.iconWrapper}>
        <Box height={45}>
          <PixQrCode />
        </Box>
      </Box>
      <Box>
        <Typography className={styles.textDescription}>
          Transferir por QR Code
        </Typography>
      </Box>
    </Box>
  )
}
