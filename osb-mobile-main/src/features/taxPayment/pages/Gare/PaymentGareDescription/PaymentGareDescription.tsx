import React from 'react'
import { AppBar } from 'components/AppBar'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { TaxPaymentRoutes } from '../../../constants/routes'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { PageContainer } from 'components/PageContainer'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from 'redux/state'
import { useHistory } from 'react-router-dom'
import { TextField } from 'components/TextField'

import { ButtonWithFloatingIcon } from 'components/ButtonWithFloatingIcon/ButtonWithFloatingIcon'
import { TagEditPopUp } from 'components/TagEditPopUp'

import { useStyles } from './PaymentGareDescription.style'
import { Box } from '@material-ui/core'
import { Loader } from 'components/Loader'
import { AccountRoutes } from 'features/account/constants/routes'
import { updateGarePaymentData } from 'features/taxPayment/redux/actions'

export const PaymentGareDescription: React.FC = () => {
  const [description, setDescription] = React.useState('')
  //const [openTagEditPopUp, setOpenTagEditPopUp] = React.useState(false);

  const loading = useSelector((state: StoreState) => state.tags.loading)

  const dispatch = useDispatch()
  const history = useHistory()
  const styles = useStyles()

  // const { gareTags } = useSelector(
  //   (state: StoreState) => ({
  //     gareTags: state.taxPayment.gare?.tags,
  //   })
  // );

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(event.target.value)

  // const onEditTagsButtonClick = () => {
  //   setOpenTagEditPopUp(true);
  // };

  // const onEditTagsClose = () => {
  //   setOpenTagEditPopUp(false);
  // };

  const onCancelButtonClick = () => {
    dispatch(updateGarePaymentData())
    history.replace(AccountRoutes.home)
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    history.push(TaxPaymentRoutes.paymentGareSummary)

    dispatch(
      updateGarePaymentData({
        description: description,
        //tags: gareTags,
      }),
    )
    history.push(TaxPaymentRoutes.paymentGareSummary)
  }

  return (
    <PageContainer>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={TaxPaymentRoutes.paymentGare}
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
            title="Pagamento"
            subtitle="Deseja identificar seu pagamento no extrato?"
            description="Adicione uma descrição para identificar melhor esse pagamento em seu histórico."
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
                data-test-id="description-change"
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
              {/* <div className={styles.buttonTagFloating}>
                <ButtonWithFloatingIcon onClick={onEditTagsButtonClick} data-test-id="edit-button">
                  Editar TAG
                </ButtonWithFloatingIcon>
              </div>
              <TagEditPopUp
                open={openTagEditPopUp}
                onClose={onEditTagsClose}
                onSaveTags={() => { }}
            />*/}
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
