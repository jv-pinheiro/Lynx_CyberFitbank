import React from 'react'
import { useValue } from 'hooks/useValue'
import { PageContainer } from 'components'
import { Button } from 'components/Button'
import { Close } from '@material-ui/icons'
import { AppBar } from 'components/AppBar'
import { maskMoney } from '_utils/masks/money'
import { useHistory } from 'react-router-dom'
import { useStyles } from './AdjustLimit.style'
import { cancelLabel } from 'constants/buttons/labels'
import { PixRoutes } from 'features/pix/constants/routes'
import { parseCurrency } from '_translate'
import pixVoucherLogo from '_assets/img/pixVoucherLogo.svg'
import { Box, Typography, TextField } from '@material-ui/core'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { InvalidValuePopUp } from 'features/pix/components/Popup/InvalidValuePopUp'
import { Icon } from 'components/Icon'
import { updateAccountLimitList } from 'features/pix/redux/actions'
import { useDispatch } from 'react-redux'

export const AdjustLimit: React.FC = () => {
  const history = useHistory()
  const styles = useStyles()
  const [valueInput, setValueInput] = useValue(maskMoney)
  const [isValidValue, setIsValidValue] = React.useState(false)
  const [openInvalidValuePopup, setOpenInvalidValuePopup] =
    React.useState(false)

  const casting = (valueInString: string) => {
    const valueCents = Number(valueInString.split(',')[1]) / 100 || 0
    return (
      Number(valueInString.split(',')[0].replace(/[^0-9]+/g, '')) + valueCents
    )
  }
  const dispatch = useDispatch()

  const onCancelButtonClick = () => {
    dispatch(updateAccountLimitList())
    history.push(PixRoutes.home)
  }

  const onClosePopup = () => {
    setOpenInvalidValuePopup(false)
  }

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value)
  }

  React.useEffect(() => {
    const parsedValue = parseCurrency(valueInput)
    setIsValidValue(Number.isNaN(parsedValue) || parsedValue <= 0)
  }, [valueInput])

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
        header={
          <Box className={styles.header}>
            <ProcessDescriptionHeader title="Ajuste de limite PIX saque / PIX troco" />
            <Box className={styles.pixVoucherBox}>
              <Box className="pixVoucherSubBox">
                <Icon name="pixVoucherLogo" />
              </Box>
            </Box>
          </Box>
        }
        main={
          <Box>
            <Box>
              <Typography className={styles.text}>
                Digite o limite diário pretendido
              </Typography>
              <Box className={styles.inputBox}>
                <TextField
                  className={styles.input}
                  type="text"
                  placeholder="R$ 500,00"
                  variant="outlined"
                  value={valueInput}
                  onChange={onValueChange}
                />
                <Typography className={styles.textBottom}>
                  R$ 500,00 disponível para uso hoje
                </Typography>
              </Box>
            </Box>
            <Box className={styles.nightlyLimit}>
              <Typography className={styles.text}>
                Digite o limite noturno pretendido
              </Typography>
              <Box className={styles.inputBox}>
                <TextField
                  className={styles.input}
                  type="text"
                  placeholder="R$ 100,00"
                  variant="outlined"
                  value={valueInput}
                  onChange={onValueChange}
                />
                <Typography className={styles.textBottom}>
                  R$ 100,00 disponível para uso hoje
                </Typography>
              </Box>
            </Box>
            <Box className={styles.buttonDefine}>
              <Button> Definir </Button>
            </Box>
            <InvalidValuePopUp
              open={openInvalidValuePopup}
              onClose={onClosePopup}
            />
          </Box>
        }
      />
    </PageContainer>
  )
}
