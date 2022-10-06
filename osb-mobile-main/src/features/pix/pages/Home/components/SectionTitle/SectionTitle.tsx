import React from "react";
import { Typography } from "@material-ui/core";
import { useStyles } from "./SectionTitle.style";

interface SectionTitleProps {}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  const styles = useStyles();

  return (
    <Typography variant="subtitle1" className={styles.title}>
      {children}
    </Typography>
  );
};
