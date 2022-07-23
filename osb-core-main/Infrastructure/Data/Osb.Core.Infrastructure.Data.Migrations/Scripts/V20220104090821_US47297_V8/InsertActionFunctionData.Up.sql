INSERT INTO public."ActionFunction"(
	"Action", 
    "Controller", 
    "CreationDate", 
    "UpdateDate",      
    "CreationUserId", 
    "UpdateUserId"
    )
	VALUES 
    (
        'FindAccountDashboard', 
        'Account',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindAcountListByLogin', 
        'Account',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindAccountBalance', 
        'Account',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindBankStatement', 
        'Account',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindBankStatementDetails',
        'Account',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindTransactionReceipt',
        'Account',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindBankStatementMonthlySummary', 
        'Account',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindAccountListByTaxId', 
        'Account',
        now(), 
        now(), 
        0, 
        0
    ),
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    (
        'POST', 
        'AuthorizationToken',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'ValidateAuthorizationToken', 
        'AuthorizationToken',
        now(), 
        now(), 
        0, 
        0
    ),
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    (
        'FindBanks', 
        'Bank',
        now(), 
        now(), 
        0, 
        0
    ),
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    (
        'POST', 
        'BoletoPayment',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindInfosPaymentCIPByBarcode', 
        'BoletoPayment',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindInfosPaymentByBarcode', 
        'BoletoPayment',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'VerifiyBoletoCanBePaid', 
        'BoletoPayment',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindExpectedBoletoPaymentDate', 
        'BoletoPayment',
        now(), 
        now(), 
        0, 
        0
    ),
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    (
        'FindCardList', 
        'Card',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'Activate', 
        'Card',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'BindUnnamedCard', 
        'Card',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'Block', 
        'Card',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'Unblock', 
        'Card',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'InactivateAndReissue', 
        'Card',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'ChangePinCard', 
        'Card',
        now(), 
        now(), 
        0, 
        0
    ),
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    (
        'POST', 
        'Favored',
        now(), 
        now(), 
        0, 
        0
    ),  
    (
        'FindFavoredListByAccountId', 
        'Favored',
        now(), 
        now(), 
        0, 
        0
    ),
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    (
        'GenerateHashCode', 
        'HashCode',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'ReadHashCode', 
        'HashCode',
        now(), 
        now(), 
        0, 
        0
    ),
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    (
        'POST', 
        'InternalTransfer',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'PUT', 
        'InternalTransfer',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindPendingInternalTransfer', 
        'InternalTransfer',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'CancelInternalTransfer', 
        'InternalTransfer',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'CreatePendingInternalTransfer', 
        'InternalTransfer',
        now(), 
        now(), 
        0, 
        0
    ),
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    (
        'POST', 
        'MoneyTransfer',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindExpectedTransferDate', 
        'MoneyTransfer',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'PUT',
        'MoneyTransfer',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'CancelMoneyTransfer', 
        'MoneyTransfer',
        now(), 
        now(), 
        0, 
        0
    ),
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    (
        'FindSuggestionTagList', 
        'Tag',
        now(), 
        now(), 
        0, 
        0
    ),
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    (
        'FindTopUpProductList', 
        'TopUp',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'POST', 
        'TopUp',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindTopUpProductListByPhoneNumber', 
        'TopUp',
        now(), 
        now(), 
        0, 
        0
    ),
    ----------------------------------------------------------------------------------------------------------------------------------------------------------------
    (
        'POST', 
        'UserInformation',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'FindUserInformationByUserId', 
        'UserInformation',
        now(), 
        now(), 
        0, 
        0
    ),
    (
        'PUT', 
        'UserInformation',
        now(), 
        now(), 
        0, 
        0
    )