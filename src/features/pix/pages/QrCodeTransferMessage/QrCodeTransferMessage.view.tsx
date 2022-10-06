import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { PageContainer } from 'components/PageContainer'
import { TextField } from 'components/TextField'
import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon/ButtonWithFloatingIcon'
import { TagEditPopUp } from 'components/TagEditPopUp'
import { Box, Typography } from '@material-ui/core'
import { ProcessPageFooterButton } from 'components'
import { AccountRoutes } from 'features/account/constants/routes'
import { TagChip } from 'features/tags/components/TagChip'
import { useStyles } from './QrCodeTransferMessage.style'
import { Loader } from 'components/Loader'

interface QrCodeTransferMessageViewProps {
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onEditTagsClose: VoidFunction
  onEditTagsButtonClick: VoidFunction
  onDefineClick: VoidFunction
  onCancelButtonClick: VoidFunction
  description: string
  openTagEditPopUp: boolean
  loading?: boolean
}

export const QrCodeTransferMessageView: React.FC<
  QrCodeTransferMessageViewProps
> = ({
  onDescriptionChange,
  onEditTagsClose,
  onEditTagsButtonClick,
  onDefineClick,
  onCancelButtonClick,
  description,
  openTagEditPopUp,
  loading,
}) => {
  const styles = useStyles()

  const tags = React.useMemo(() => {
    const suggestedTags = ['CRÉDITO', 'DÉBITO', 'ESCOLA']
    return suggestedTags.map(t => <TagChip label={t} key={t} />)
  }, [])

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
                startIcon={<Close color="inherit" />}
                onClick={onCancelButtonClick}
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Transferência com Pix"
            subtitle="Quer enviar uma mensagem?"
            description="Você pode inserir uma descrição ou mensagem para o recebedor"
          />
        }
        main={
          <React.Fragment>
            <Box component="form" onSubmit={onDefineClick}>
              <TextField
                label="Envie uma mensagem(opcional)"
                placeholder="Escreva sua mensagem"
                value={description}
                onChange={onDescriptionChange}
              />
              <Typography
                variant="subtitle1"
                className={styles.importantWarning}
              >
                <strong>Tags (opcional)</strong>
              </Typography>
              <Typography className={styles.txtalert}>
                Insira marcações para identificar seus gastos. Use nossa
                sugestão ou personalize as tags.
              </Typography>
              <Box
                id="tags"
                display="grid"
                gridAutoRows="1fr"
                gridColumnGap={4}
                gridTemplateColumns="repeat(5, 1fr)"
              >
                {tags}
              </Box>
              <Box className={styles.buttonTagFloating}>
                <ButtonWithFloatingIcon onClick={onEditTagsButtonClick}>
                  Editar TAG
                </ButtonWithFloatingIcon>
              </Box>
              <TagEditPopUp
                open={openTagEditPopUp}
                onClose={onEditTagsClose}
                onSaveTags={() => {}}
              />
            </Box>
          </React.Fragment>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <ProcessPageFooterButton
                primary
                endIcon={<KeyboardArrowRight />}
                onClick={onDefineClick}
              >
                {nextLabel}
              </ProcessPageFooterButton>
            }
          />
        }
      />
      <Loader open={loading!} />
    </PageContainer>
  )
}
