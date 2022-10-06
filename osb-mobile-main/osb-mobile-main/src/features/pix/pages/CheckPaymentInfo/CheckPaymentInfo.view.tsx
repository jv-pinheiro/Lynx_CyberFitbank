import React from "react";
import { AppBar } from "components/AppBar";
import { PageContainer } from "components/PageContainer";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { ProcessPageFooter } from "components/ProcessPageFooter";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { Button } from "components/Button";
import { Close, KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { cancelLabel, nextLabel, returnLabel } from "constants/buttons/labels";
import { PixRoutes } from "features/pix/constants/routes";
import { useStyles } from "./CheckPaymentInfo.style";

interface CheckPaymentInfoViewProps {
  onCancelButtonClick: VoidFunction;
  onNextButtonClick: VoidFunction;
  onBackButtonClick: VoidFunction;
}

export const CheckPaymentInfoView: React.FC<CheckPaymentInfoViewProps> = ({
  onCancelButtonClick,
  onNextButtonClick,
  onBackButtonClick,
}) => {
  const styles = useStyles(); 

  return (
    <PageContainer className={styles.page}>
      <ProcessPageLayout
        appBar={
          <AppBar
            homeRoute={PixRoutes.home}
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
        header={<ProcessDescriptionHeader title="Pagamento PIX" />}
        main={<React.Fragment></React.Fragment>}
        footer={
          <div className={styles.footer}>
            <ProcessPageFooter
              primaryButton={
                <Button
                  endIcon={<KeyboardArrowRight color="secondary" />}
                  onClick={onNextButtonClick}            
                >
                  {nextLabel}
                </Button>
              }
            />
          </div>
        }
      />
    </PageContainer>
  );
};
