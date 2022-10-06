import React from "react";
import { useHistory } from "react-router-dom";
import { PixRoutes } from "features/pix";
import { PixPaymentDataView } from "./PixPaymentData.view";

export const PixPaymentData: React.FC = () => { 
    const history = useHistory();

    const onBackButtonClick = React.useCallback(() => {
      }, []);
    const onCancelButtonClick = () => {
        history.replace(PixRoutes.home);
      };
    const onNextButtonClick = React.useCallback(() => {
        history.push(PixRoutes.checkPaymentInfo);
      }, []);
      const onSchedulingButtonClick = () => {
        history.replace("#");
      };

    return (
        <PixPaymentDataView
        onBackButtonClick={onBackButtonClick}
        onCancelButtonClick = {onCancelButtonClick}
        onNextButtonClick = {onNextButtonClick}
        onSchedulingButtonClick = {onSchedulingButtonClick}
        />
    );
}; 