import React from "react";
import { Box } from "@material-ui/core";
import { Button } from "components/Button";
import { useStyles } from "./RecentFavoredCard.style";

interface RecentFavoredCardProps {
  name: string;
  taxId: string;
  bank: string;
}

export const RecentFavoredCard: React.FC<RecentFavoredCardProps> = ({name, taxId, bank}) => {
  const styles = useStyles();

  return (
    <Box className={styles.eachPixRecent}>
      <Button onClick={() => {}} palette={"secondary"}>
        <Box className="expressionsWrapper">
          <span className="name">
            <strong>{name}</strong>
          </span>
          <span className="cpf">{taxId}</span>
          <span className="bank">{bank}</span>
        </Box>
      </Button>
    </Box>
  );
};