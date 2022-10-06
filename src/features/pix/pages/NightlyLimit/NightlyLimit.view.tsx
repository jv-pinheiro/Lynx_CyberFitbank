import React from 'react'
import { Add } from '@material-ui/icons'
import { Close } from '@material-ui/icons'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { CurrencyFormatter } from '_translate'
import { useStyles } from './NightlyLimit.style'
import { Slider } from 'features/pix/components'
import MoonImage from '_assets/img/MoonImage.svg'
import { Box, TextField } from '@material-ui/core'
import { cancelLabel } from 'constants/buttons/labels'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Icon } from 'components/Icon'
import { casting } from '_utils/masks/money'

interface NightlyLimitProps {
  onCancelButtonClick: VoidFunction
  limitIncreaseOnClickButton: VoidFunction
  setValueInput: (value: string) => void
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  valueInput: string
  availableValue: number
  permittedLimitNumber: number
}

export const NighltyLimitView: React.FC<NightlyLimitProps> = ({
  limitIncreaseOnClickButton,
  onCancelButtonClick,
  setValueInput,
  onValueChange,
  valueInput,
  availableValue,
  permittedLimitNumber,
}) => {
  const styles = useStyles()

  return (
    <PageContainer>
      <Box>
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
              <ProcessDescriptionHeader title="Ajuste de limite noturno" />
              <Box className={styles.nightlyLimitImageBox}>
                <Box className="nightlyLimitImageSubBox">
                  <Icon name={'moonImage'} />
                </Box>
              </Box>
            </Box>
          }
          main={
            <Box className={styles.main}>
              <Box className={styles.inputBox}>
                <TextField
                  className={styles.input}
                  type="text"
                  variant="outlined"
                  value={valueInput}
                  onChange={onValueChange}
                />
                <span className={styles.spanText}>
                  {CurrencyFormatter.format(Math.floor(availableValue))}
                  &nbsp;disponível para uso hoje
                </span>
              </Box>
              <Box className={styles.sliderBox}>
                <Box className={styles.slider}>
                  <Slider
                    minValue={0}
                    maxValue={permittedLimitNumber}
                    onValueChange={setValueInput}
                    value={casting(valueInput)}
                    step={50}
                  />
                </Box>
              </Box>

              {/* <Box>
                <Typography className={styles.nightlyTime}>
                  Horário noturno: 20h às 06h
                </Typography>
              </Box>
              <Box className={styles.adjustTime}>
                <Button palette="primary" size="medium">
                  Ajustar horários
                </Button>
              </Box> */}
              <Box className={styles.raiseButtonBox}>
                <Button
                  palette="primary"
                  size="medium"
                  startIcon={<Add />}
                  onClick={limitIncreaseOnClickButton}
                >
                  Pedir aumento
                </Button>
              </Box>
            </Box>
          }
        />
      </Box>
    </PageContainer>
  )
}
