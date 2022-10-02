import React from 'react'
import { Button } from 'components/Button'
import {
  PageContainer,
  ProcessPageFooterButton,
  ProcessPageLayout,
} from 'components'
import { useStyles } from './FirstAccessMyKeys.styles'
import { nextLabel, skipLabel } from 'constants/buttons/labels'
import { Box, Toolbar, Typography } from '@material-ui/core'
import { FirstSlide, SlideIndicator, SecondSlide } from './components'
import { KeyboardArrowRight } from '@material-ui/icons'
import { Redirect, useHistory } from 'react-router-dom'
import { PixRoutes } from 'features/pix/constants/routes'

const localStorageKey = 'firstAccessToKeys'

export const FirstAccessMyKeys: React.FC = () => {
  const history = useHistory()
  const slides = React.useMemo(() => {
    return [<FirstSlide />, <SecondSlide />]
  }, [])
  const [slideIndex, setSlideIndex] = React.useState(0)
  const styles = useStyles()
  const isLastIndex = slideIndex === 1

  const onSkipClick = () => {
    setSlideIndex(slides.length - 1)
  }

  const onReturnClick = () => {
    setSlideIndex(slideIndex - 1)
  }

  const onNextClick = () => {
    if (isLastIndex) {
      localStorage.setItem(localStorageKey, 'false')
      setSlideIndex(slideIndex)
      history.push(PixRoutes.keys)
      return
    }

    setSlideIndex(slideIndex + 1)
  }

  if (localStorage.getItem(localStorageKey) === 'false')
    return <Redirect to={PixRoutes.home} push={false} />

  return (
    <PageContainer className={styles.container}>
      <ProcessPageLayout
        appBar={
          <Toolbar component="header" className={styles.toolbar}>
            <Typography variant="h6" id="title">
              Minhas Chaves
            </Typography>
            {!isLastIndex && (
              <Button
                palette="secondary"
                size="small"
                onClick={onSkipClick}
                id="skip-button"
              >
                {skipLabel}
              </Button>
            )}
          </Toolbar>
        }
        main={
          <Box display="flex" flexDirection="column">
            {slides[slideIndex]}
            <SlideIndicator length={slides.length} currentIndex={slideIndex} />
          </Box>
        }
        footer={
          <Box
            display="grid"
            gridColumnGap="16px"
            gridTemplateColumns="1fr 1fr"
            gridTemplateRows="1fr"
          >
            <Box>
              {slideIndex > 0 && (
                <ProcessPageFooterButton onClick={onReturnClick} />
              )}
            </Box>

            <Box>
              <ProcessPageFooterButton
                primary
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextClick}
              >
                {isLastIndex ? 'Entendi' : nextLabel}
              </ProcessPageFooterButton>
            </Box>
          </Box>
        }
      />
    </PageContainer>
  )
}
