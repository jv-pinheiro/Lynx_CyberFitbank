import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { TransferenceRoutes } from '../../constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { PageContainer } from 'components/PageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { useHistory } from 'react-router-dom'

import { updateTransferenceData } from 'features/transference/redux/actions'
import { TextField } from 'components/TextField'

import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon/ButtonWithFloatingIcon'
import { TagEditPopUp } from 'components/TagEditPopUp'

import { useStyles } from './TransferDescription.style'
import { Box } from '@material-ui/core'
import { Loader } from 'components/Loader'
import { TransferType } from 'features/transference/redux/models/enum'

export const TransferDescription: React.FC = () => {
  const [description, setDescription] = React.useState('')
  const [openTagEditPopUp, setOpenTagEditPopUp] = React.useState(false)

  const loading = useSelector((state: StoreState) => state.tags.loading)

  const dispatch = useDispatch()
  const history = useHistory()
  const styles = useStyles()

  const { transferenceTags, transferType } = useSelector(
    (state: StoreState) => ({
      transferenceTags: state.transference.transference?.tags,
      transferType: state.transference.transference?.transferType,
    }),
  )

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value)

  const onEditTagsButtonClick = () => {
    setOpenTagEditPopUp(true)
  }

  const onEditTagsClose = () => {
    setOpenTagEditPopUp(false)
  }

  const onCancelButtonClick = () => {
    dispatch(updateTransferenceData())
    history.go(transferType === TransferType.InternalTransfer ? -6 : -10)
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (openTagEditPopUp) {
      event.preventDefault()
      history.replace(TransferenceRoutes.description)
    } else history.push(TransferenceRoutes.summary)

    dispatch(
      updateTransferenceData({
        description: description,
        tags: transferenceTags,
      }),
    )
    history.push(TransferenceRoutes.summary)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={TransferenceRoutes.transference}
            action={
              <Button
                palette="secondary"
                size="small"
                startIcon={<Close color="primary" />}
                onClick={onCancelButtonClick}
                data-test-id="cancel-button"
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Transferência"
            subtitle="Deseja identificar sua transferência no extrato?"
            description="Adicione uma descrição, arquivo, foto ou mesmo um vídeo para identificar melhor essa transferência em seu histórico."
          />
        }
        main={
          <React.Fragment>
            <Box component="form" onSubmit={onSubmit}>
              <TextField
                label="Descreva em uma frase"
                placeholder="Escreva sua frase"
                value={description}
                onChange={onDescriptionChange}
                data-test-id="change-description"
              />
              {/*               <div className={styles.titleAndDescriptionFilter}>
                <ProcessDescriptionHeader
                  subtitle="Tags"
                  description="Insira marcações para identificar seus gastos. 
                             Use nossa sugestão ou personalize as tags."
                />
              </div>
              <div className={styles.tagsFilterStyle}>
                <TagChip
                  label="Crédito"
                  disabled={!pageTags.includes("Crédito")}
                  onClick={() => onTagClick("Crédito")}
                />
                <div className={styles.tagsFilterStyleChildren}>
                  <TagChip
                    label="Débito"
                    disabled={!pageTags.includes("Débito")}
                    onClick={() => onTagClick("Débito")}
                  />
                </div>
                <div className={styles.tagsFilterStyleChildren}>
                  <TagChip
                    label="Escola"
                    disabled={!pageTags.includes("Escola")}
                    onClick={() => onTagClick("Escola")}
                  />
                </div>
              </div> */}
              <div className={styles.buttonTagFloating}>
                <ButtonWithFloatingIcon
                  onClick={onEditTagsButtonClick}
                  data-test-id="edit-button"
                >
                  Editar TAG
                </ButtonWithFloatingIcon>
              </div>
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
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
                data-test-id="submit-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
      <Loader open={loading} />
    </PageContainer>
  )
}
