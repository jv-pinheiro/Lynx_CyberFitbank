import { ApiResponse } from '_config/api'
import { CreatePixKeyResponse } from './models/response/CreatePixKeyResponse'
import { CreatePixKeyRequest } from './models/request/createPixKeyRequest'
import { ResendPixKeyToken } from './models/request/resendPixKeyToken'
import { getBaseRequestData } from '_utils/http'
import {
  CreatePixKeyStart,
  PixActions,
  CreatePixKeyFail,
  CreatePixKeySuccess,
  CloseAlertAction,
  UpdatePixAction,
  ConfirmPixKeyHoldStart,
  ConfirmPixKeyHoldFail,
  ConfirmPixKeyHoldSuccess,
  FindPixKeyListStartAction,
  FindPixKeyListSuccessAction,
  FindPixKeyListFailAction,
  UpdatePixKeyValue,
  PixKeyDetailsStart,
  PixKeyDetailsSuccess,
  PixKeyDetailsFail,
  CreatePixTransferStart,
  ListBanksFailAction,
  ListBanksSuccessAction,
  ListBanksStartAction,
  UpdatePixTransfer,
  CreatePixTransferFail,
  CreatePixTransferSuccess,
  GeneratePixQRCodeStart,
  GeneratePixQRCodeSuccess,
  GeneratePixQRCodeFail,
  UpdatePixQRCode,
  CancelPixKeyFailAction,
  CancelPixKeyStartAction,
  CancelPixKeySuccessAction,
  ResendPixKeyTokenSuccess,
  ResendPixKeyTokenStart,
  ResendPixKeyTokenFail,
  FindAccountLimitOperationStart,
  FindAccountLimitOperationSuccess,
  FindAccountLimitOperationFail,
  FindAccountOperationLimitListStart,
  FindAccountOperationLimitListSuccess,
  FindAccountOperationLimitListFail,
  ChangeAccountOperationLimitStart,
  ChangeAccountOperationLimitSuccess,
  ChangeAccountOperationLimitFail,
  GetInfoPixQRCodeFailAction,
  GetInfoPixQRCodeStartAction,
  GetInfoPixQRCodeSuccessAction,
  UpdateInfoPixQRCode,
  UpdateAccountLimitList,
  UpdatePixOutState,
  CreatePixOutStart,
  CreatePixOutSuccess,
  CreatePixOutFail,
} from './actionTypes'
import { GetState } from 'redux/state'
import { HttpClient } from '_config/http'
import { ConfirmPixKeyHoldRequest } from './models/request/confirmPixKeyHoldRequest'
import { ConfirmPixKeyHoldResponse } from './models/response/confirmPixKeyHoldResponse'
import { Dispatch } from 'redux'
import { PixKeysListRequest } from './models/request/pixKeysListRequest'
import { PixKeysListResponse } from './models/response/pixKeysListResponse'
import { PixKeyDetailsRequest } from './models/request/pixKeyDetailsRequest'
import { PixKeysDetails } from './models/response/pixKeysDetailsResponse'
import { KeyType } from 'features/pix/redux/models/keyType'
import { PixTransfer } from './models/pixTransfer'
import { CreatePixTransferRequest } from './models/request/createPixTransferRequest'
import { PixAddress } from './models/response/PixAddress'
import { ListBanksResponse } from './models/response/listBankResponse'
import { ListBanksRequest } from './models/request/listBanksRequest'
import { CreatePixTransferResponse } from './models/response/createPixTransfer'
import { GenerateDynamicPixQRCodeRequest } from './models/request/generateDynamicPixQrCodeRequest'
import { GenerateStaticPixQRCodeRequest } from './models/request/generateStaticPixQrCodeRequest'
import { PixQRCodeResponse } from './models/response/pixQrCodeResponse'
import { Pix } from './models/pixQrCodeStatic'
import { CancelPixKeyRequest } from './models/request/cancelPixKey'
import { SelectPixKey } from './models/selectPixKey'
import { GetAccountOperationLimit } from './models/request/getAccountOperationLimitRequest'
import { AccountOperationLimitType } from 'features/account/redux/models/accountOperationLimitType'
import { AccountOperationLimitSubType } from 'features/account/redux/models/accountOperationLimitSubType'
import { OperationType } from 'features/account/redux/models/operationType'
import { GetAccountOperationLimitResponse } from './models/response/getAccountOperationLimitResponse'
import { GetAccountOperationLimitListResponse } from './models/response/getAccountOperationLimitListResponse'
import { OperationLimits } from './models/operationLimits'
import { ChangeAccountOperationLimitRequest } from './models/request/changeAccountOperationLimitRequest'
import { ChangeAccountOperationLimitResponse } from './models/response/changeAccountOperationLimitResponse'
import { GetInfoPixQRCodeRequest } from './models/request/getInfoPixQRCodeRequest'
import { InfosPixQRCode } from './models/response/getInfoPixQRCodeResponse'
import { PixCashChangeWithdraw } from './models/pixCashChangeWithdraw'
import { CreatePixOutRequest } from './models/request/createPixOutRequest'
import { casting } from '_utils/masks/money'

export const createPixKey =
  (pixKeyType: number, pixKey?: string) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CreatePixKeyStart>({
      type: PixActions.CREATE_PIX_KEY_START,
    })

    try {
      const state = getState()
      const { account } = state
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData('/Pix/CreatePixKey', state)

      const data: CreatePixKeyRequest = {
        userId: userId!,
        accountId: accountId!,
        taxId: state.account.account!.taxId!,
        pixKey: pixKey!,
        pixKeyType: pixKeyType,
        SPBBank: account.account!.spbBank,
        SPBBankAccount: account.account!.spbBankAccount,
        SPBBankBranch: account.account!.spbBankBranch,
        SPBBankAccountDigit: account.account!.spbBankAccountDigit,
      }

      const response = await HttpClient.post<CreatePixKeyResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      const responseData = response.data.data
      dispatch<CreatePixKeySuccess>({
        type: PixActions.CREATE_PIX_KEY_SUCCESS,
        payload: {
          key: responseData.key,
        },
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreatePixKeyFail>({
        type: PixActions.CREATE_PIX_KEY_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const resendPixKeyToken =
  (pixKeyType: number, pixKey?: string) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ResendPixKeyTokenStart>({
      type: PixActions.RESEND_PIX_KEY_TOKEN_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData('/Pix/ResendPixKeyToken', state)

      const data: ResendPixKeyToken = {
        userId: userId!,
        accountId: accountId!,
        taxId: state.account.account!.taxId!,
        pixKey: pixKey!,
        pixKeyType: pixKeyType,
      }

      const response = await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      const responseData = response.data
      dispatch<ResendPixKeyTokenSuccess>({
        type: PixActions.RESEND_PIX_KEY_TOKEN_SUCCESS,
        payload: responseData.message,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<ResendPixKeyTokenFail>({
        type: PixActions.RESEND_PIX_KEY_TOKEN_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const confirmPixKeyHold =
  (pixKey: string, pixKeyType: number, confirmationCode: string) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ConfirmPixKeyHoldStart>({
      type: PixActions.CONFIRM_PIX_KEY_HOLD_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData('/Pix/ConfirmPixKeyHold', state)

      const data: ConfirmPixKeyHoldRequest = {
        userId: userId!,
        accountId: accountId!,
        taxId: state.account.account!.taxId!,
        confirmationCode,
        pixKey,
        pixKeyType,
      }

      const response = await HttpClient.post<ConfirmPixKeyHoldResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const responseData = response.data

      if (!responseData.success) throw new Error(responseData.message)

      dispatch<ConfirmPixKeyHoldSuccess>({
        type: PixActions.CONFIRM_PIX_KEY_HOLD_SUCCESS,
        payload: {
          key: pixKey,
        },
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.message) response = error.response?.data

      dispatch<ConfirmPixKeyHoldFail>({
        type: PixActions.CONFIRM_PIX_KEY_HOLD_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const updatePix = (pix?: SelectPixKey) => (dispatch: Dispatch) => {
  dispatch<UpdatePixAction>({
    type: PixActions.UPDATE_PIX,
    payload: pix,
  })
}

export const updateAccountLimitList =
  (accountOperationLimitList?: OperationLimits) => (dispatch: Dispatch) => {
    dispatch<UpdateAccountLimitList>({
      type: PixActions.UPDATE_ACCOUNT_LIMIT_LIST,
      payload: accountOperationLimitList,
    })
  }

export const updateQrCodePix =
  (pix?: InfosPixQRCode) => (dispatch: Dispatch) => {
    dispatch<UpdateInfoPixQRCode>({
      type: PixActions.UPDATE_INFO_PIX_QR_CODE,
      payload: pix!,
    })
  }

export const updatePixKeyValue =
  (pixKeyValue?: PixKeysDetails) => (dispatch: Dispatch) => {
    dispatch<UpdatePixKeyValue>({
      type: PixActions.UPDATE_PIX_KEY_VALUE,
      payload: pixKeyValue,
    })
  }

export const getPixKeys =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<FindPixKeyListStartAction>({
      type: PixActions.FIND_PIX_KEY_LIST_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData('/Pix/FindPixKeyList', state)

      const data: PixKeysListRequest = {
        accountId: accountId!,
        userId: userId!,
        TaxId: state.account.account?.taxId!,
        Bank: state.account.account?.spbBank!,
        BankBranch: state.account.account?.spbBankBranch!,
        BankAccount: state.account.account?.spbBankAccount,
        BankAccountDigit: state.account.account?.spbBankAccountDigit,
      }

      const response = await HttpClient.post<PixKeysListResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      const responseData = response.data.data
      const pixKeyList = responseData.pixKeyList

      dispatch<FindPixKeyListSuccessAction>({
        type: PixActions.FIND_PIX_KEY_LIST_SUCCESS,
        payload: pixKeyList,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<FindPixKeyListFailAction>({
        type: PixActions.FIND_PIX_KEY_LIST_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const getPixKeyDetails =
  (pixKeyValue?: string, pixKeyType?: number) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<PixKeyDetailsStart>({
      type: PixActions.GET_PIX_KEY_DETAILS_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/Pix/FindInfosPixKey', state)

      const _pixKeyType =
        pixKeyType === KeyType.random.value
          ? 4
          : pixKeyType === KeyType.email.value
          ? 2
          : pixKeyType === KeyType.phone.value
          ? 3
          : pixKeyType === KeyType.taxId.value && pixKeyValue!.length === 14
          ? 0
          : 1

      const data: PixKeyDetailsRequest = {
        accountId: accountId!,
        userId: userId!,
        PixKeyType: _pixKeyType,
        pixKey: pixKeyValue,
        TaxNumber: state.account.account?.taxId!,
      }

      const response = await HttpClient.post<PixKeysDetails>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      const responseData = response.data.data
      const pixKeyDetails = responseData

      dispatch<PixKeyDetailsSuccess>({
        type: PixActions.GET_PIX_KEY_DETAILS_SUCCESS,
        payload: pixKeyDetails,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<PixKeyDetailsFail>({
        type: PixActions.GET_PIX_KEY_DETAILS_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const createPixTransfer =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CreatePixTransferStart>({
      type: PixActions.CREATE_PIX_TRANSFER_START,
    })

    try {
      const state = getState()
      const pixKey: PixKeysDetails = state.pix.pixKeyDetails!
      const pixTransferData: PixTransfer = state.pix.pixTransfer!

      const { url, defaultHeaders, token, userId, accountId } =
        await getBaseRequestData('/Pix/CreatePixOut', state)

      const data: CreatePixTransferRequest = {
        userId: userId!,
        accountId: accountId!,
        toName: pixKey.payeeName!,
        toTaxId: pixKey.payeeTaxNumber!,
        toBank: pixKey.payeeBank!,
        toBankBranch: pixKey.payeeBankBranch!,
        toBankAccount: pixKey.payeeBankAccount!,
        toBankAccountDigit: pixKey.payeeBankAccountDigit!,
        accountType: 0,
        value: pixTransferData.value!,
        paymentDate: pixTransferData.paymentDate!,
        description: pixTransferData.description!,
        customerMessage: pixTransferData.customerMessage!,
        pixKey: pixKey.pixKeyValue!,
        pixKeyType: pixKey.pixKeyType!,
      }

      await HttpClient.post<CreatePixTransferResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<CreatePixTransferSuccess>({
        type: PixActions.CREATE_PIX_TRANSFER_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreatePixTransferFail>({
        type: PixActions.CREATE_PIX_TRANSFER_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const createPixDataBankTransfer =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CreatePixTransferStart>({
      type: PixActions.CREATE_PIX_TRANSFER_START,
    })

    try {
      const state = getState()
      const pixTransferData: PixTransfer = state.pix.pixTransfer!

      const { url, defaultHeaders, token, userId, accountId } =
        await getBaseRequestData('/Pix/CreatePixOut', state)

      const data: CreatePixTransferRequest = {
        userId: userId!,
        accountId: accountId!,
        toName: pixTransferData.toName!,
        toTaxId: pixTransferData.toTaxId!,
        toBank: pixTransferData.toBank!,
        toBankBranch: pixTransferData.toBankBranch!,
        toBankAccount: pixTransferData.toBankAccount!,
        toBankAccountDigit: pixTransferData.toBankAccountDigit!,
        accountType: pixTransferData.accountType ?? 0,
        value: pixTransferData.value!,
        paymentDate: pixTransferData.paymentDate!,
        description: pixTransferData.description!,
        customerMessage: pixTransferData.customerMessage!,
      }

      await HttpClient.post<CreatePixTransferResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<CreatePixTransferSuccess>({
        type: PixActions.CREATE_PIX_TRANSFER_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreatePixTransferFail>({
        type: PixActions.CREATE_PIX_TRANSFER_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const createQrCodePixTransfer =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CreatePixTransferStart>({
      type: PixActions.CREATE_PIX_TRANSFER_START,
    })

    try {
      const state = getState()
      const infosQrCode: InfosPixQRCode = state.pix.infosPixQRCode!

      const { url, defaultHeaders, token, userId, accountId } =
        await getBaseRequestData('/Pix/CreatePixOut', state)

      const data: CreatePixTransferRequest = {
        userId: userId!,
        accountId: accountId!,
        toName: infosQrCode.receiverName!,
        toTaxId: infosQrCode.receiverTaxNumber!,
        toBank: infosQrCode.receiverBank!,
        toBankBranch: infosQrCode.receiverBankBranch!,
        toBankAccount: infosQrCode.receiverBankAccount!,
        toBankAccountDigit: infosQrCode.receiverBankAccountDigit!,
        accountType: parseFloat(infosQrCode.receiverAccountType!),
        value: parseFloat(infosQrCode.originalValue!),
        paymentDate: infosQrCode.paymentDate!,
        description: infosQrCode.description,
        pixKey: infosQrCode.pixKeyValue!,
      }

      await HttpClient.post<CreatePixTransferResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<CreatePixTransferSuccess>({
        type: PixActions.CREATE_PIX_TRANSFER_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreatePixTransferFail>({
        type: PixActions.CREATE_PIX_TRANSFER_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const updatePixTransfer =
  (pix?: PixTransfer) => (dispatch: Dispatch) => {
    dispatch<UpdatePixTransfer>({
      type: PixActions.UPDATE_PIX_TRANSFER,
      payload: pix,
    })
  }

export const listBanksPix =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ListBanksStartAction>({
      type: PixActions.LIST_BANKS_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/Bank/FindBanks', state)

      const data: ListBanksRequest = {
        accountId: accountId!,
        userId: userId!,
      }

      const response = await HttpClient.post<ListBanksResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      const responseData = response.data.data
      responseData.banks = responseData.banks.filter(
        (v, i, a) => a.findIndex(t => t.code === v.code) === i,
      )

      dispatch<ListBanksSuccessAction>({
        type: PixActions.LIST_BANKS_SUCCESS,
        payload: responseData.banks,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<ListBanksFailAction>({
        type: PixActions.LIST_BANKS_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const updatePixOut =
  (pixOut?: PixCashChangeWithdraw) => (dispatch: Dispatch) => {
    dispatch<UpdatePixOutState>({
      type: PixActions.UPDATE_PIX_OUT,
      payload: pixOut,
    })
  }

export const createPixOut =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CreatePixOutStart>({
      type: PixActions.CREATE_PIX_OUT_START,
    })

    try {
      const state = getState()

      const { url, defaultHeaders, token, accountId, userId } =
        await getBaseRequestData('/Pix/CreatePixOut', state)

      const valueCasting = casting(state.pix.pixCashChangeWithdraw?.value!)

      const data: CreatePixOutRequest = {
        accountId: accountId!,
        userId: userId!,
        toName: state.pix.infosPixQRCode?.receiverName!,
        toTaxId: state.pix.infosPixQRCode?.receiverTaxNumber!,
        toBank: state.pix.infosPixQRCode?.receiverBank!,
        toBankBranch: state.pix.infosPixQRCode?.receiverBankBranch!,
        toBankAccount: state.pix.infosPixQRCode?.receiverBankAccount!,
        toBankAccountDigit: state.pix.infosPixQRCode?.receiverBankAccountDigit!,
        value: valueCasting,
        paymentDate: new Date().toISOString(),
        pixKey: state.pix.pixKeyDetails?.pixKeyValue!,
        pixKeyType: state.pix.pixKeyDetails?.pixKeyType?.value!,
      }

      await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch<CreatePixOutSuccess>({
        type: PixActions.CREATE_PIX_OUT_SUCCESS,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<CreatePixOutFail>({
        type: PixActions.CREATE_PIX_OUT_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const generateStaticPixQRCode =
  (pix?: Pix) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GeneratePixQRCodeStart>({
      type: PixActions.GENERATE_PIX_QR_CODE_START,
    })
    try {
      const state = getState()
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData('/Pix/GenerateStaticPixQRCode', state)
      const data: GenerateStaticPixQRCodeRequest = {
        userId: userId!,
        accountId: accountId!,
        principalValue: pix?.principalValue,
        pixKey: state.pix.selectPix?.pixKeyValue!,
        address: {
          addressLine1: state.auth?.user?.street!,
          addressLine2: '',
          zipCode: state.auth?.user?.zipCode!,
          neighborhood: '',
          cityName: state.auth?.user?.city!,
          state: state.auth?.user?.state!,
          addressType: 1,
          country: '',
          complement: state.auth?.user?.complement!,
        },
        pixTransactionPurpose: state.pix.selectPix?.pixTransactionPurpose,
        additionalData: pix?.additionalData,
        pixKeyType: state.pix.selectPix?.pixKeyType!,
      }
      const response = await HttpClient.post<PixQRCodeResponse>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      let generateStaticPixQRCode = response.data.data
      generateStaticPixQRCode.hashCode = atob(generateStaticPixQRCode.hashCode!)
      dispatch<GeneratePixQRCodeSuccess>({
        type: PixActions.GENERATE_PIX_QR_CODE_SUCCESS,
        payload: generateStaticPixQRCode,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data
      dispatch<GeneratePixQRCodeFail>({
        type: PixActions.GENERATE_PIX_QR_CODE_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const updateStaticPixQRCode = (pix?: Pix) => (dispatch: Dispatch) => {
  dispatch<UpdatePixQRCode>({
    type: PixActions.UPDATE_PIX_QR_CODE,
    payload: pix,
  })
}

export const closeAlert = () => (dispatch: Dispatch) => {
  dispatch<CloseAlertAction>({
    type: PixActions.CLOSE_ALERT,
  })
}

export const cancelPixKey =
  (pixKey: string, pixKeyType: number) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<CancelPixKeyStartAction>({
      type: PixActions.CANCEL_PIX_KEY_START,
    })
    try {
      const state = getState()
      const { account } = state
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData('/Pix/CancelPixKey', state)
      const data: CancelPixKeyRequest = {
        userId: userId!,
        accountId: accountId!,
        pixKey: pixKey,
        pixKeyType: pixKeyType,
        taxId: state.account.account!.taxId!,
        SPBBank: account.account!.spbBank,
        SPBBankAccount: account.account!.spbBankAccount,
        SPBBankBranch: account.account!.spbBankBranch,
        SPBBankAccountDigit: account.account!.spbBankAccountDigit,
      }
      const response = await HttpClient.post(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch<CancelPixKeySuccessAction>({
        type: PixActions.CANCEL_PIX_KEY_SUCCESS,
      })
    } catch (error: any) {
      dispatch<CancelPixKeyFailAction>({
        type: PixActions.CANCEL_PIX_KEY_FAIL,
        payload: error.message,
      })
    }
  }

export const getAccountOperationLimits =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<FindAccountLimitOperationStart>({
      type: PixActions.GET_ACCOUNT_OPERATION_LIMIT_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData('/Account/FindAccountOperationLimit', state)

      const data: GetAccountOperationLimit = {
        accountId: accountId!,
        userId: userId!,
        TaxId: state.account.account?.taxId!,
        Bank: state.account.account?.spbBank!,
        BankBranch: state.account.account?.bank!,
        BankAccount: state.account.account?.bankAccount!,
        BankAccountDigit: state.account.account?.bankAccountDigit!,
        OperationType: OperationType.pixOut,
        AccountOperationLimitType: AccountOperationLimitType.daily,
        AccountOperationLimitSubType: AccountOperationLimitSubType.amount,
      }

      const response = await HttpClient.post<GetAccountOperationLimitResponse>(
        url,
        data,
        {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        },
      )

      const operationLimits: OperationLimits = {
        daily: response.data.data,
        overNight: response.data.data,
        singleTransaction: response.data.data,
      }

      dispatch<FindAccountLimitOperationSuccess>({
        type: PixActions.GET_ACCOUNT_OPERATION_LIMIT_SUCCESS,
        payload: operationLimits,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<FindAccountLimitOperationFail>({
        type: PixActions.GET_ACCOUNT_OPERATION_LIMIT_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const getAccountOperationLimitList =
  () => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<FindAccountOperationLimitListStart>({
      type: PixActions.FIND_ACCOUNT_OPERATION_LIMIT_LIST_START,
    })
    try {
      const state = getState()
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData(
          '/Account/FindAccountOperationLimitList',
          state,
        )
      const data: GetAccountOperationLimit = {
        accountId: accountId!,
        userId: userId!,
        TaxId: state.account.account?.taxId!,
        Bank: state.account.account?.bank!,
        BankBranch: state.account.account?.bankBranch!,
        BankAccount: state.account.account?.bankAccount!,
        BankAccountDigit: state.account.account?.bankAccountDigit!,
        OperationType: OperationType.pixOut,
      }

      const response =
        await HttpClient.post<GetAccountOperationLimitListResponse>(url, data, {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        })

      const responseData = response.data.data
      const accountOperationLimitList = responseData.limits

      dispatch<FindAccountOperationLimitListSuccess>({
        type: PixActions.FIND_ACCOUNT_OPERATION_LIMIT_LIST_SUCCESS,
        payload: accountOperationLimitList,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<FindAccountOperationLimitListFail>({
        type: PixActions.FIND_ACCOUNT_OPERATION_LIMIT_LIST_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const changeAccountOperationLimit =
  (operation: AccountOperationLimitType, maxLimit: number) =>
  async (dispatch: Dispatch, getState: GetState) => {
    dispatch<ChangeAccountOperationLimitStart>({
      type: PixActions.CHANGE_ACCOUNT_OPERATION_LIMIT_START,
    })

    try {
      const state = getState()
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData('/Account/ChangeAccountOperationLimit', state)

      const data: ChangeAccountOperationLimitRequest = {
        accountId: accountId!,
        userId: userId!,
        TaxId: state.account.account?.taxId!,
        Bank: state.account.account?.bank,
        BankBranch: state.account.account?.bankBranch,
        BankAccount: state.account.account?.bankAccount,
        BankAccountDigit: state.account.account?.bankAccountDigit,
        CompanyId: state.account.account?.companyId!,
        OperationType: OperationType.pixOut,
        AccountOperationLimitType: operation,
        AccountOperationLimitSubType: AccountOperationLimitSubType.amount,
        MinLimitValue: 0,
        MaxLimitValue: Math.floor(maxLimit),
      }

      const response =
        await HttpClient.post<ChangeAccountOperationLimitResponse>(url, data, {
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${token}`,
          },
        })

      if (!response.data.data.newMaxLimit)
        throw new Error(response.data.data.message)

      const result = response.data.data.message

      dispatch<ChangeAccountOperationLimitSuccess>({
        type: PixActions.CHANGE_ACCOUNT_OPERATION_LIMIT_SUCCESS,
        payload: result,
      })
    } catch (error: any) {
      let response: ApiResponse | undefined
      if (error.response) response = error.response?.data

      dispatch<ChangeAccountOperationLimitFail>({
        type: PixActions.CHANGE_ACCOUNT_OPERATION_LIMIT_FAIL,
        payload: response?.message ?? error.message,
      })
    }
  }

export const GetInfoPixQRCode =
  (hash: string) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch<GetInfoPixQRCodeStartAction>({
      type: PixActions.GET_INFO_PIX_QRCODE_START,
    })

    try {
      const state = getState()
      const taxId = state.account.account?.taxId
      const { url, defaultHeaders, accountId, token, userId } =
        await getBaseRequestData('/Pix/FindInfoPixQRCode', state)

      const data: GetInfoPixQRCodeRequest = {
        userId: userId!,
        accountId: accountId!,
        taxId: taxId!,
        hash,
      }

      const response = await HttpClient.post<InfosPixQRCode>(url, data, {
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        },
      })

      const responseData = response.data.data

      dispatch<GetInfoPixQRCodeSuccessAction>({
        type: PixActions.GET_INFO_PIX_QRCODE_SUCCESS,
        payload: responseData,
      })
    } catch (error: any) {
      dispatch<GetInfoPixQRCodeFailAction>({
        type: PixActions.GET_INFO_PIX_QRCODE_FAIL,
        payload: error.message,
      })
    }
  }
