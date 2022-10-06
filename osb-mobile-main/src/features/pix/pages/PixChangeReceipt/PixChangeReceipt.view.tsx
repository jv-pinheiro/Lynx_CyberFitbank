import React from "react";
import { AppBar } from "components/AppBar";
import { PageContainer } from "components/PageContainer";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { Button } from "components/Button";
import { closeLabel, saveLabel, shareLabel } from "constants/buttons/labels";
import { Close } from "@material-ui/icons";
import { useStyles } from "./PixChangeReceipt.style";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { Box } from "@material-ui/core";
import { ButtonWithFloatingIcon } from "components/ButtonWithFloatingIcon";
import { LabelWithValue } from "components/LabelWithValue";
import { TransactionSummary } from "components/TransactionSummary";

interface PixChangeReceiptViewProps {
  onCloseButtonClick: VoidFunction;
}

export const PixChangeReceiptView: React.FC<PixChangeReceiptViewProps> = ({
    onCloseButtonClick,
  }) => {
    const styles = useStyles(); 

  return (
    <PageContainer>
      <Box className={styles.wrapper}>
        <ProcessPageLayout
          appBar={
            <AppBar
              homeRoute="#"
              action={
                <Button
                  palette="secondary"
                  size="small"
                  startIcon={<Close color="primary" />}
                  onClick={onCloseButtonClick}
                >
                  {closeLabel}
                </Button>
              }
            />
          }
          header={
            <Box className={styles.header}>
              <ProcessDescriptionHeader title="Comprovante" />
            </Box>
          }
          main={
            <React.Fragment>
              <Box>
              <LabelWithValue
                name="José da Silva"
                totalValue={90.00}
                taxPayer="000.xxx.xxx-00"
                bank="Banco ABC"
                keypix="Email: fulano@gmail.com"
                datePix="23 de Novembro de 2020 às 10:20:05"
                description="Serviços Prestados"
              />
              </Box>
              <Box className={styles.separator}>
              <TransactionSummary
              idTransaction="44B8-4B9324-2398721"
              internalProtocol="44B8-439324C-2398721320AB"
              />
              </Box>
            </React.Fragment>
          }
          footer={
            <Box className={styles.buttons}>
              <ButtonWithFloatingIcon size="large">
                {saveLabel}
              </ButtonWithFloatingIcon>
              <ButtonWithFloatingIcon size="large">
                {shareLabel}
              </ButtonWithFloatingIcon>
            </Box>
          }
        />
      </Box>
    </PageContainer>
  );
};
