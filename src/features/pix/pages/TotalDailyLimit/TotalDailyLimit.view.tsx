import React from 'react'
import { Add, Close } from '@material-ui/icons'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { CurrencyFormatter } from '_translate'
import { Slider } from 'features/pix/components'
import { useStyles } from './TotalDailyLimit.style'
import { cancelLabel } from 'constants/buttons/labels'
import { PageContainer } from 'components/PageContainer'
import DailyLimitImage from '_assets/img/DailyLimitImage.svg'
import { Box, TextField, Typography } from '@material-ui/core'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { Icon } from 'components/Icon'
import { casting } from '_utils/masks/money'

interface TotalDailyLimitProps {
  onCloseButtonClick: VoidFunction
  setValueInput: (value: string) => void
  limitIncreaseOnClickButton: VoidFunction
  onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  valueInput: string
  availableValue: number
  permittedLimitNumber: number
}

export const TotalDailyLimitView: React.FC<TotalDailyLimitProps> = ({
  setValueInput,
  onValueChange,
  onCloseButtonClick,
  limitIncreaseOnClickButton,
  valueInput,
  availableValue,
  permittedLimitNumber,
}) => {
  const style = useStyles()

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
                  onClick={onCloseButtonClick}
                >
                  {cancelLabel}
                </Button>
              }
            />
          }
          header={
            <Box className={style.header}>
              <ProcessDescriptionHeader title="Ajuste de limite diário" />
              <Box className={style.dailyLimitImageBox}>
                <Box className="dailyLimitImageSubBox">
                  <Icon name={'dailyLimitImage'} />
                </Box>
              </Box>
            </Box>
          }
          main={
            <Box className={style.main}>
              <Box className={style.inputBox}>
                <TextField
                  className={style.input}
                  type="text"
                  variant="outlined"
                  value={valueInput}
                  onChange={onValueChange}
                />
                <Typography className={style.spanText}>
                  {CurrencyFormatter.format(availableValue)}
                  &nbsp;disponível para uso hoje
                </Typography>
              </Box>
              <Box className={style.sliderBox}>
                <Box className={style.slider}>
                  <Slider
                    minValue={0}
                    maxValue={permittedLimitNumber}
                    onValueChange={setValueInput}
                    value={casting(valueInput)}
                    step={50}
                  />
                </Box>
              </Box>
              <Box className={style.raiseButtonBox}>
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
