import React from 'react'
import { ProcessPageLayout } from 'components/ProcessPageLayout'
import { AppBar } from 'components/AppBar'
import { Button } from 'components/Button'
import { Close, KeyboardArrowRight } from '@material-ui/icons'
import { cancelLabel, nextLabel } from 'constants/buttons/labels'
import { AccountRoutes } from 'features/account/constants/routes'
import { ProcessDescriptionHeader } from 'components/ProcessDescriptionHeader'
import { PageContainer } from 'components/PageContainer'
import { ProcessPageFooter } from 'components/ProcessPageFooter'
import { Grid } from '@material-ui/core'
// import { useStyles } from "features/taxPayment/pages/Darj/PaymentDarjDescription/PaymentDarjDescription.style";
import { TextField } from 'components/TextField'
import { TaxPaymentRoutes } from 'features/taxPayment/constants/routes'
import { useHistory } from 'react-router-dom'
import { updateDarjPaymentData } from 'features/taxPayment/redux/actions'
import { useDispatch, useSelector } from 'react-redux'
// import { StoreState } from "redux/state";
// import { ButtonWithFloatingIcon } from "components/ButtonWithFloatingIcon";
// import { TagEditPopUp } from "components/TagEditPopUp";
// import { TagChip } from "features/tags/components/TagChip";

export const PaymentDarjDescription: React.FC = () => {
  // const tags = useSelector((store: StoreState) => store.tags.tags);
  const [toDescriptionDarj, setToDescriptionDarj] = React.useState('')
  // const [openTagEditPopUp, setOpenTagEditPopUp] = React.useState(false);
  // const [pageTags, setPageTags] = React.useState<string[]>(tags || []);

  const history = useHistory()
  const dispatch = useDispatch()
  // const styles = useStyles();

  const onNextButtonClick = () => {
    history.push(TaxPaymentRoutes.paymentDarjSummary)
    dispatch(
      updateDarjPaymentData({
        description: toDescriptionDarj,
        //tags: pageTags,
      }),
    )
  }

  const onCancelButtonClick = () => {
    history.replace(AccountRoutes.home)
  }

  const onDescriptionDarj = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDescriptionDarj(event.target.value)
  }

  // const onEditTagsButtonClick = () => {
  //   setOpenTagEditPopUp(true);
  // };

  // const onEditTagsClose = () => {
  //   setOpenTagEditPopUp(false);
  // };

  // const onTagClick = (tag: string) => {
  //   let newTags = [...pageTags];
  //   if (pageTags.includes(tag)) newTags = newTags.filter((x) => x !== tag);
  //   else newTags.push(tag);

  //   setPageTags(newTags);
  // };

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
                data-test-id="cancel-button"
              >
                {cancelLabel}
              </Button>
            }
          />
        }
        header={
          <ProcessDescriptionHeader
            title="Impostos - DARJ"
            subtitle="Deseja identificar seu pagamento no extrato?"
            description="Adicione uma descrição para identificar melhor esse pagamento em seu histórico."
          />
        }
        main={
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                label="Descrição (opcional)"
                value={toDescriptionDarj}
                onChange={onDescriptionDarj}
                data-test-id="description-darj"
              />
            </Grid>
            {/* <Grid item>
              <ProcessDescriptionHeader
                subtitle="Tags (opcional)"
                description="Insira marcações para identificar seus gastos. 
                             Use nossa sugestão ou personalize as tags."
              />
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <TagChip
                      label="Crédito"
                      selected={pageTags.includes("Crédito")}
                      onClick={() => onTagClick("Crédito")}
                    />
                  </Grid>
                  <Grid item>
                    <TagChip
                      label="Débito"
                      selected={pageTags.includes("Débito")}
                      onClick={() => onTagClick("Débito")}
                    />
                  </Grid>
                  <Grid item>
                    <TagChip
                      label="Escola"
                      selected={pageTags.includes("Escola")}
                      onClick={() => onTagClick("Escola")}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                justifyContent="center"
                className={styles.scheduleButton}
              >
                <ButtonWithFloatingIcon onClick={onEditTagsButtonClick} data-test-id="edit-button">
                  Editar TAG
                </ButtonWithFloatingIcon>

                <TagEditPopUp
                  open={openTagEditPopUp}
                  onClose={onEditTagsClose}
                  onSaveTags={() => {}}
                />
              </Grid>
            </Grid> */}
          </Grid>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <Button
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onNextButtonClick}
                data-test-id="next-button"
              >
                {nextLabel}
              </Button>
            }
          />
        }
      />
    </PageContainer>
  )
}
