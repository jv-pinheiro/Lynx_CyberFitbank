import { Box, Typography } from "@material-ui/core";
import React from "react";
import { maskTaxId } from "_utils/masks/taxId";
import { useStyles } from "./CheckDate.style";

interface CheckDate {
  name: string;
  bank: string;
  taxId: string;
}

export const CheckDate: React.FC<CheckDate> = ({ name, bank, taxId }) => {
  const styles = useStyles();

  return (
    <Box>
      <Typography className={styles.componentName}>{name}</Typography>
      <Typography className={styles.componentBank}>Banco:{bank}</Typography>
      <Typography className={styles.componentCpf_Cnpj}>
        CPF/CNPJ:{maskTaxId(taxId)}
      </Typography>
    </Box>
  );
};
