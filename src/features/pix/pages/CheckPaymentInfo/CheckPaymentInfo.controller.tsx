import React from "react";
import { useHistory } from "react-router-dom";
import { PixRoutes } from "features/pix";
import { CheckPaymentInfoView } from "./CheckPaymentInfo.view";

export const CheckPaymentInfo: React.FC = () => { 
    const history = useHistory();

    const onBackButtonClick = React.useCallback(() => {
        history.push(PixRoutes.qrCodeTransfer);
      }, []);

    const onNextButtonClick = React.useCallback(() => {
        history.push(PixRoutes.home);
      }, []);

    const onCancelButtonClick = React.useCallback(() => {
        history.push(PixRoutes.home);
      }, []);

    return (
        <CheckPaymentInfoView
        onCancelButtonClick = {onCancelButtonClick}
        onBackButtonClick = {onBackButtonClick}
        onNextButtonClick = {onNextButtonClick}
        />
        );
}; 