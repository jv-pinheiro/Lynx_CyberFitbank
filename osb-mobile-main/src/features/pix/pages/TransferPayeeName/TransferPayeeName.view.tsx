import React from "react";
import { AppBar } from "components/AppBar";
import { PageContainer } from "components/PageContainer";
import { ProcessPageLayout } from "components/ProcessPageLayout";
import { Button } from "components/Button";
import { ProcessDescriptionHeader } from "components/ProcessDescriptionHeader";
import { Close, KeyboardArrowRight } from "@material-ui/icons";
import { cancelLabel, nextLabel } from "constants/buttons/labels";
import { Box } from "@material-ui/core";
import { PixRoutes } from "features/pix/constants/routes";
import { ProcessPageFooter, ProcessPageFooterButton, TextField } from "components";

  interface TransferPayeeNameViewProps {
    onSubmit: VoidFunction;
    onCancelButtonClick: VoidFunction;
    onToNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
  }

  export const TransferPayeeNameView: React.FC<TransferPayeeNameViewProps> = ({
    onSubmit,
    onCancelButtonClick,
    onToNameChange,
    value,
  }) => { 

  return (
    <PageContainer>
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
        header={
          <ProcessDescriptionHeader
            title="Transferência com Pix"
            subtitle="Você pode fazer um PIX inserindo os dados bancários completos"
            description="Primeiro, qual o nome de quem receberá seu Pix?"
          />
        }
        main={
          <Box component="form" onSubmit={onSubmit}>
            <TextField
              label="Nome completo"
              placeholder="Digite aqui"
              value={value}
              onChange={onToNameChange}
            />
          </Box>
        }
        footer={
          <ProcessPageFooter
            primaryButton={
              <ProcessPageFooterButton
                primary
                disabled={!value}
                endIcon={<KeyboardArrowRight color="secondary" />}
                onClick={onSubmit}
              >
                {nextLabel}
              </ProcessPageFooterButton>
            }
          />
        }
      />
    </PageContainer>
  );
};
