import { Banks } from './models/banks'
import { PixTransfer } from './models/pixTransfer'
import { PixData } from './models/pixData'
import { OperationLimits } from './models/operationLimits'
import { AccountOperationLimitList } from './models/accountOperationLimitList'
import { PixKeys } from './models/PixKey'
import { PixCashChangeWithdraw } from './models/pixCashChangeWithdraw'
import { PixKeysDetails } from './models/response/pixKeysDetailsResponse'
import { PixQRCodeResponse } from './models/response/pixQrCodeResponse'
import { Pix } from './models/pixQrCodeStatic'
import { SelectPixKey } from './models/selectPixKey'
import { InfosPixQRCode } from './models/response/getInfoPixQRCodeResponse'

export enum PixActions {
  CANCEL_PIX_KEY_START = 'CANCEL_PIX_KEY_START',
  CANCEL_PIX_KEY_SUCCESS = 'CANCEL_PIX_KEY_SUCCESS',
  CANCEL_PIX_KEY_FAIL = 'CANCEL_PIX_KEY_FAIL',

  CREATE_PIX_TRANSFER_START = 'CREATE_PIX_TRANSFER_START',
  CREATE_PIX_TRANSFER_SUCCESS = 'CREATE_PIX_TRANSFER_SUCCESS',
  CREATE_PIX_TRANSFER_FAIL = 'CREATE_PIX_TRANSFER_FAIL',

  LIST_BANKS_START = 'LIST_BANKS_START',
  LIST_BANKS_SUCCESS = 'LIST_BANKS_SUCCESS',
  LIST_BANKS_FAIL = 'LIST_BANKS_FAIL',

  UPDATE_PIX_TRANSFER = 'UPDATE_PIX_TRANSFER',

  CREATE_PIX_KEY_START = 'CREATE_PIX_KEY_START',
  CREATE_PIX_KEY_SUCCESS = 'CREATE_PIX_KEY_SUCCESS',
  CREATE_PIX_KEY_FAIL = 'CREATE_PIX_KEY_FAIL',

  RESEND_PIX_KEY_TOKEN_START = 'RESEND_PIX_KEY_TOKEN_START',
  RESEND_PIX_KEY_TOKEN_SUCCESS = 'RESEND_PIX_KEY_TOKEN_SUCCESS',
  RESEND_PIX_KEY_TOKEN_FAIL = 'RESEND_PIX_KEY_TOKEN_FAIL',

  CONFIRM_PIX_KEY_HOLD_START = 'CONFIRM_PIX_KEY_HOLD_START',
  CONFIRM_PIX_KEY_HOLD_SUCCESS = 'CONFIRM_PIX_KEY_HOLD_SUCCESS',
  CONFIRM_PIX_KEY_HOLD_FAIL = 'CONFIRM_PIX_KEY_HOLD_FAIL',

  UPDATE_PIX = 'UPDATE_PIX',

  FIND_PIX_KEY_LIST_START = 'FIND_PIX_KEY_LIST_START',
  FIND_PIX_KEY_LIST_SUCCESS = 'FIND_PIX_KEY_LIST_SUCCESS',
  FIND_PIX_KEY_LIST_FAIL = 'FIND_PIX_KEY_LIST_FAIL',
  UPDATE_ACCOUNT_LIMIT_LIST = ' UPDATE_ACCOUNT_LIMIT_LIST',

  UPDATE_PIX_KEY_VALUE = 'UPDATE_PIX_KEY_VALUE',

  GET_PIX_KEY_DETAILS_START = 'GET_PIX_KEY_DETAILS_START',
  GET_PIX_KEY_DETAILS_SUCCESS = 'GET_PIX_KEY_DETAILS_SUCCESS',
  GET_PIX_KEY_DETAILS_FAIL = 'GET_PIX_KEY_DETAILS_FAIL',

  GET_ACCOUNT_OPERATION_LIMIT_START = 'GET_ACCOUNT_OPERATION_LIMIT_START',
  GET_ACCOUNT_OPERATION_LIMIT_SUCCESS = 'GET_ACCOUNT_OPERATION_LIMIT_SUCCESS',
  GET_ACCOUNT_OPERATION_LIMIT_FAIL = 'GET_ACCOUNT_OPERATION_LIMIT_FAIL',

  FIND_ACCOUNT_OPERATION_LIMIT_LIST_START = 'FIND_ACCOUNT_OPERATION_LIMIT_LIST_START',
  FIND_ACCOUNT_OPERATION_LIMIT_LIST_SUCCESS = 'FIND_ACCOUNT_OPERATION_LIMIT_LIST_SUCCESS',
  FIND_ACCOUNT_OPERATION_LIMIT_LIST_FAIL = 'FIND_ACCOUNT_OPERATION_LIMIT_LIST_FAIL',

  CHANGE_ACCOUNT_OPERATION_LIMIT_START = 'CHANGE_ACCOUNT_OPERATION_LIMIT_START',
  CHANGE_ACCOUNT_OPERATION_LIMIT_SUCCESS = 'CHANGE_ACCOUNT_OPERATION_LIMIT_SUCCESS',
  CHANGE_ACCOUNT_OPERATION_LIMIT_FAIL = 'CHANGE_ACCOUNT_OPERATION_LIMIT_FAIL',

  GENERATE_PIX_QR_CODE_START = 'GENERATE_PIX_QR_CODE_START',
  GENERATE_PIX_QR_CODE_SUCCESS = 'GENERATE_PIX_QR_CODE_SUCCESS',
  GENERATE_PIX_QR_CODE_FAIL = 'GENERATE_PIX_QR_CODE_FAIL',

  GET_INFO_PIX_QRCODE_START = 'GET_INFO_PIX_QRCODE_START',
  GET_INFO_PIX_QRCODE_SUCCESS = 'GET_INFO_PIX_QRCODE_SUCCESS',
  GET_INFO_PIX_QRCODE_FAIL = 'GET_INFO_PIX_QRCODE_FAIL',

  CREATE_PIX_OUT_START = 'CREATE_PIX_OUT_START',
  CREATE_PIX_OUT_SUCCESS = 'CREATE_PIX_OUT_SUCCESS',
  CREATE_PIX_OUT_FAIL = 'CREATE_PIX_OUT_FAIL',
  UPDATE_PIX_OUT = 'UPDATE_PIX_OUT',

  UPDATE_PIX_QR_CODE = 'UPDATE_PIX_QR_CODE',

  UPDATE_INFO_PIX_QR_CODE = 'UPDATE_INFO_PIX_QR_CODE',

  CLOSE_ALERT = 'CLOSE_ALERT',
}
export interface GeneratePixQRCodeStart {
  type: PixActions.GENERATE_PIX_QR_CODE_START
}
export interface GeneratePixQRCodeSuccess {
  type: PixActions.GENERATE_PIX_QR_CODE_SUCCESS
  payload: PixQRCodeResponse
}
export interface GeneratePixQRCodeFail {
  type: PixActions.GENERATE_PIX_QR_CODE_FAIL
  payload?: string
}

export interface UpdatePixQRCode {
  type: PixActions.UPDATE_PIX_QR_CODE
  payload?: Pix
}

export interface UpdateInfoPixQRCode {
  type: PixActions.UPDATE_INFO_PIX_QR_CODE
  payload?: InfosPixQRCode
}
export interface CancelPixKeyStartAction {
  type: PixActions.CANCEL_PIX_KEY_START
}

export interface CancelPixKeySuccessAction {
  type: PixActions.CANCEL_PIX_KEY_SUCCESS
}

export interface CancelPixKeyFailAction {
  type: PixActions.CANCEL_PIX_KEY_FAIL
  payload?: string
}
export interface CreatePixTransferStart {
  type: PixActions.CREATE_PIX_TRANSFER_START
}
export interface CreatePixTransferSuccess {
  type: PixActions.CREATE_PIX_TRANSFER_SUCCESS
}
export interface CreatePixTransferFail {
  type: PixActions.CREATE_PIX_TRANSFER_FAIL
  payload?: string
}
export interface UpdatePixTransfer {
  type: PixActions.UPDATE_PIX_TRANSFER
  payload?: PixTransfer
}

export interface ListBanksStartAction {
  type: PixActions.LIST_BANKS_START
}

export interface ListBanksSuccessAction {
  type: PixActions.LIST_BANKS_SUCCESS
  payload: Banks[]
}

export interface ListBanksFailAction {
  type: PixActions.LIST_BANKS_FAIL
  payload: string
}

export interface CreatePixKeyStart {
  type: PixActions.CREATE_PIX_KEY_START
}

export interface CreatePixKeySuccess {
  type: PixActions.CREATE_PIX_KEY_SUCCESS
  payload: PixData
}

export interface CreatePixKeyFail {
  type: PixActions.CREATE_PIX_KEY_FAIL
  payload?: string
}

export interface ResendPixKeyTokenStart {
  type: PixActions.RESEND_PIX_KEY_TOKEN_START
}

export interface ResendPixKeyTokenSuccess {
  type: PixActions.RESEND_PIX_KEY_TOKEN_SUCCESS
  payload: string
}

export interface ResendPixKeyTokenFail {
  type: PixActions.RESEND_PIX_KEY_TOKEN_FAIL
  payload?: string
}

export interface ConfirmPixKeyHoldStart {
  type: PixActions.CONFIRM_PIX_KEY_HOLD_START
}

export interface ConfirmPixKeyHoldSuccess {
  type: PixActions.CONFIRM_PIX_KEY_HOLD_SUCCESS
  payload: PixData
}

export interface ConfirmPixKeyHoldFail {
  type: PixActions.CONFIRM_PIX_KEY_HOLD_FAIL
  payload?: string
}

export interface UpdatePixAction {
  type: PixActions.UPDATE_PIX
  payload?: SelectPixKey
}

export interface CloseAlertAction {
  type: PixActions.CLOSE_ALERT
}

export interface FindPixKeyListStartAction {
  type: PixActions.FIND_PIX_KEY_LIST_START
}

export interface FindPixKeyListSuccessAction {
  type: PixActions.FIND_PIX_KEY_LIST_SUCCESS
  payload?: PixKeys[]
}

export interface FindPixKeyListFailAction {
  type: PixActions.FIND_PIX_KEY_LIST_FAIL
  payload: string
}

export interface PixKeyDetailsStart {
  type: PixActions.GET_PIX_KEY_DETAILS_START
}
export interface PixKeyDetailsSuccess {
  type: PixActions.GET_PIX_KEY_DETAILS_SUCCESS
  payload?: PixKeysDetails
}
export interface UpdatePixKeyValue {
  type: PixActions.UPDATE_PIX_KEY_VALUE
  payload?: PixKeysDetails
}

export interface PixKeyDetailsFail {
  type: PixActions.GET_PIX_KEY_DETAILS_FAIL
  payload: string
}

export interface GetInfoPixQRCodeStartAction {
  type: PixActions.GET_INFO_PIX_QRCODE_START
}

export interface GetInfoPixQRCodeSuccessAction {
  type: PixActions.GET_INFO_PIX_QRCODE_SUCCESS
  payload?: InfosPixQRCode
}

export interface GetInfoPixQRCodeFailAction {
  type: PixActions.GET_INFO_PIX_QRCODE_FAIL
  payload?: string
}

export interface FindAccountLimitOperationStart {
  type: PixActions.GET_ACCOUNT_OPERATION_LIMIT_START
}

export interface FindAccountOperationLimitListStart {
  type: PixActions.FIND_ACCOUNT_OPERATION_LIMIT_LIST_START
}
export interface FindAccountOperationLimitListSuccess {
  type: PixActions.FIND_ACCOUNT_OPERATION_LIMIT_LIST_SUCCESS
  payload?: AccountOperationLimitList[]
}
export interface FindAccountOperationLimitListFail {
  type: PixActions.FIND_ACCOUNT_OPERATION_LIMIT_LIST_FAIL
  payload: string
}
export interface FindAccountLimitOperationSuccess {
  type: PixActions.GET_ACCOUNT_OPERATION_LIMIT_SUCCESS
  payload?: OperationLimits
}
export interface FindAccountLimitOperationFail {
  type: PixActions.GET_ACCOUNT_OPERATION_LIMIT_FAIL
  payload: string
}

export interface UpdateAccountLimitList {
  type: PixActions.UPDATE_ACCOUNT_LIMIT_LIST
  payload?: OperationLimits
}

export interface ChangeAccountOperationLimitStart {
  type: PixActions.CHANGE_ACCOUNT_OPERATION_LIMIT_START
}
export interface ChangeAccountOperationLimitSuccess {
  type: PixActions.CHANGE_ACCOUNT_OPERATION_LIMIT_SUCCESS
  payload: string
}
export interface ChangeAccountOperationLimitFail {
  type: PixActions.CHANGE_ACCOUNT_OPERATION_LIMIT_FAIL
  payload: string
}
export interface CreatePixOutStart {
  type: PixActions.CREATE_PIX_OUT_START
}

export interface CreatePixOutSuccess {
  type: PixActions.CREATE_PIX_OUT_SUCCESS
}

export interface CreatePixOutFail {
  type: PixActions.CREATE_PIX_OUT_FAIL
  payload: string
}
export interface UpdatePixOutState {
  type: PixActions.UPDATE_PIX_OUT
  payload?: PixCashChangeWithdraw
}

export type PixAction =
  | CreatePixKeyStart
  | CreatePixKeySuccess
  | CreatePixKeyFail
  | ResendPixKeyTokenStart
  | ResendPixKeyTokenSuccess
  | ResendPixKeyTokenFail
  | CancelPixKeyStartAction
  | CancelPixKeySuccessAction
  | CancelPixKeyFailAction
  | ConfirmPixKeyHoldStart
  | ConfirmPixKeyHoldSuccess
  | ConfirmPixKeyHoldFail
  | UpdatePixAction
  | CloseAlertAction
  | FindPixKeyListStartAction
  | FindPixKeyListSuccessAction
  | FindPixKeyListFailAction
  | PixKeyDetailsStart
  | PixKeyDetailsSuccess
  | PixKeyDetailsFail
  | UpdatePixKeyValue
  | CreatePixTransferStart
  | CreatePixTransferSuccess
  | CreatePixTransferFail
  | UpdatePixTransfer
  | GeneratePixQRCodeStart
  | GeneratePixQRCodeSuccess
  | GeneratePixQRCodeFail
  | UpdatePixQRCode
  | GetInfoPixQRCodeStartAction
  | GetInfoPixQRCodeSuccessAction
  | GetInfoPixQRCodeFailAction
  | CloseAlertAction
  | ListBanksStartAction
  | ListBanksSuccessAction
  | ListBanksFailAction
  | FindAccountLimitOperationStart
  | FindAccountLimitOperationSuccess
  | FindAccountLimitOperationFail
  | FindAccountOperationLimitListStart
  | FindAccountOperationLimitListSuccess
  | FindAccountOperationLimitListFail
  | ChangeAccountOperationLimitStart
  | ChangeAccountOperationLimitSuccess
  | ChangeAccountOperationLimitFail
  | UpdateInfoPixQRCode
  | UpdateAccountLimitList
  | CreatePixOutStart
  | CreatePixOutSuccess
  | CreatePixOutFail
  | UpdatePixOutState
