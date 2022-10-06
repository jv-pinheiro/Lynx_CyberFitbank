import { PixAction, PixActions } from './actionTypes'
import {
  PixState,
  InitialPixState,
  LoadingPixState,
  SuccessPixState,
  FailPixState,
} from './state'

const initialState: PixState = new InitialPixState()

export const pixReducer = (state = initialState, action: PixAction) => {
  switch (action.type) {
    case PixActions.RESEND_PIX_KEY_TOKEN_START:
    case PixActions.CONFIRM_PIX_KEY_HOLD_START:
    case PixActions.CREATE_PIX_TRANSFER_START:
    case PixActions.LIST_BANKS_START:
    case PixActions.CANCEL_PIX_KEY_START:
    case PixActions.FIND_PIX_KEY_LIST_START:
    case PixActions.GET_PIX_KEY_DETAILS_START:
    case PixActions.GENERATE_PIX_QR_CODE_START:
    case PixActions.CREATE_PIX_KEY_START:
    case PixActions.GET_INFO_PIX_QRCODE_START:
    case PixActions.GET_ACCOUNT_OPERATION_LIMIT_START:
    case PixActions.FIND_ACCOUNT_OPERATION_LIMIT_LIST_START:
    case PixActions.CHANGE_ACCOUNT_OPERATION_LIMIT_START:
    case PixActions.CREATE_PIX_OUT_START:
      return new LoadingPixState(
        state.pix,
        state.banks,
        state.pixKeys,
        state.pixTransfer,
        state.pixKeyDetails,
        state.pixQRCode,
        state.pixQrCodeStatic,
        state.selectPix,
        state.infosPixQRCode,
        state.operationLimits,
        state.changeOperationLimitSuccessMessage,
        state.accountOperationLimitList,
        state.pixCashChangeWithdraw,
      )

    case PixActions.RESEND_PIX_KEY_TOKEN_SUCCESS:
    case PixActions.CONFIRM_PIX_KEY_HOLD_SUCCESS:
    case PixActions.CANCEL_PIX_KEY_SUCCESS:
    case PixActions.CREATE_PIX_TRANSFER_SUCCESS:
    case PixActions.CREATE_PIX_KEY_SUCCESS:
      return new SuccessPixState(
        state.pix,
        state.banks,
        state.pixTransfer,
        state.pixKeys,
        state.pixKeyDetails,
        state.pixQRCode,
        state.pixQrCodeStatic,
        state.selectPix,
        state.operationLimits,
      )

    case PixActions.GET_INFO_PIX_QRCODE_SUCCESS:
      return new SuccessPixState(
        state.pix,
        state.banks,
        state.pixTransfer,
        state.pixKeys,
        state.pixKeyDetails,
        state.pixQRCode,
        state.pixQrCodeStatic,
        state.selectPix,
        state.operationLimits,
        state.changeOperationLimitSuccessMessage,
        state.accountOperationLimitList,
        action.payload,
      )

    case PixActions.GENERATE_PIX_QR_CODE_SUCCESS:
      return new SuccessPixState(
        state.pix,
        state.banks,
        state.pixTransfer,
        state.pixKeys,
        state.pixKeyDetails,
        action.payload,
        { ...state.pixQrCodeStatic },
        state.selectPix,
      )

    case PixActions.CREATE_PIX_OUT_SUCCESS:
      return new SuccessPixState(
        state.pix,
        state.banks,
        state.pixTransfer,
        state.pixKeys,
        state.pixKeyDetails,
        state.pixQRCode,
        state.pixQrCodeStatic,
        state.selectPix,
        state.operationLimits,
        state.changeOperationLimitSuccessMessage,
        state.accountOperationLimitList,
        state.infosPixQRCode,
        state.pixCashChangeWithdraw,
      )

    case PixActions.FIND_PIX_KEY_LIST_SUCCESS:
      return new SuccessPixState(
        state.pix,
        state.banks,
        state.pixTransfer,
        action.payload,
        state.pixKeyDetails,
        state.pixQRCode,
        state.pixQrCodeStatic,
        state.selectPix,
      )

    case PixActions.CHANGE_ACCOUNT_OPERATION_LIMIT_SUCCESS:
      return new SuccessPixState(
        state.pix,
        state.banks,
        state.pixTransfer,
        state.pixKeys,
        state.pixKeyDetails,
        state.pixQRCode,
        state.pixQrCodeStatic,
        state.selectPix,
        state.operationLimits,
        action.payload,
      )

    case PixActions.GET_ACCOUNT_OPERATION_LIMIT_SUCCESS:
      return new SuccessPixState(
        state.pix,
        state.banks,
        state.pixTransfer,
        state.pixKeys,
        state.pixKeyDetails,
        state.pixQRCode,
        state.pixQrCodeStatic,
        state.selectPix,
        { ...action.payload },
      )

    case PixActions.FIND_ACCOUNT_OPERATION_LIMIT_LIST_SUCCESS:
      return new SuccessPixState(
        state.pix,
        state.banks,
        state.pixTransfer,
        state.pixKeys,
        state.pixKeyDetails,
        state.pixQRCode,
        state.pixQrCodeStatic,
        state.selectPix,
        state.operationLimits,
        state.changeOperationLimitSuccessMessage,
        action.payload,
      )

    case PixActions.GET_PIX_KEY_DETAILS_SUCCESS:
      return new SuccessPixState(
        state.pix,
        state.banks,
        state.pixTransfer,
        state.pixKeys,
        { ...action.payload },
        state.pixQRCode,
        state.selectPix,
      )

    case PixActions.LIST_BANKS_SUCCESS:
      return new SuccessPixState(
        state.pix,
        action.payload,
        state.pixTransfer,
        state.pixKeys,
        state.pixKeyDetails,
        state.pixQRCode,
        state.pixQrCodeStatic,
        state.selectPix,
      )

    case PixActions.RESEND_PIX_KEY_TOKEN_FAIL:
    case PixActions.LIST_BANKS_FAIL:
    case PixActions.CANCEL_PIX_KEY_FAIL:
    case PixActions.CREATE_PIX_KEY_FAIL:
    case PixActions.FIND_PIX_KEY_LIST_FAIL:
    case PixActions.GET_PIX_KEY_DETAILS_FAIL:
    case PixActions.CREATE_PIX_TRANSFER_FAIL:
    case PixActions.CONFIRM_PIX_KEY_HOLD_FAIL:
    case PixActions.GENERATE_PIX_QR_CODE_FAIL:
    case PixActions.GET_INFO_PIX_QRCODE_FAIL:
    case PixActions.GET_ACCOUNT_OPERATION_LIMIT_FAIL:
    case PixActions.FIND_ACCOUNT_OPERATION_LIMIT_LIST_FAIL:
    case PixActions.CHANGE_ACCOUNT_OPERATION_LIMIT_FAIL:
      return new FailPixState(
        action.payload!,
        state.pix,
        state.banks,
        state.pixKeys,
        state.pixTransfer,
        state.pixKeyDetails,
        state.pixQRCode,
        state.pixQrCodeStatic,
        state.selectPix,
        state.operationLimits,
        state.infosPixQRCode,
        state.changeOperationLimitSuccessMessage,
        state.accountOperationLimitList,
      )

    case PixActions.UPDATE_PIX_QR_CODE:
      return new InitialPixState(
        undefined,
        state.banks,
        state.pixKeys,
        state.pixTransfer,
        state.pixKeyDetails,
        { ...state.pix, ...action.payload! },
        state.pixQRCode,
        state.selectPix,
      )

    case PixActions.UPDATE_INFO_PIX_QR_CODE:
      return new InitialPixState(
        undefined,
        state.banks,
        state.pixKeys,
        state.pixTransfer,
        state.pixKeyDetails,
        state.pixQrCodeStatic,
        state.pixQRCode,
        state.selectPix,
        { ...state.infosPixQRCode, ...action.payload! },
      )

    case PixActions.UPDATE_PIX:
      return new InitialPixState(
        state.pix,
        state.banks,
        state.pixKeys,
        state.pixTransfer,
        state.pixKeyDetails,
        state.pixQrCodeStatic,
        state.pixQRCode,
        {
          ...state.selectPix,
          ...action.payload!,
        },
      )

    case PixActions.UPDATE_ACCOUNT_LIMIT_LIST:
      if (!action.payload) return new InitialPixState()
      return new InitialPixState(
        state.pix,
        state.banks,
        state.pixKeys,
        state.pixTransfer,
        state.pixKeyDetails,
        state.pixQrCodeStatic,
        state.pixQRCode,
        state.selectPix,
        state.infosPixQRCode,
        { ...state.operationLimits, ...action.payload! },
        state.changeOperationLimitSuccessMessage,
        state.accountOperationLimitList,
      )

    case PixActions.UPDATE_PIX_TRANSFER:
      if (!action.payload) return new InitialPixState()

      return new InitialPixState(
        state.pix,
        state.banks,
        state.pixKeys,
        {
          ...state.pixTransfer,
          ...action.payload!,
        },
        state.pixKeyDetails,
        state.selectPix,
        state.pixQRCode,
        state.pixQrCodeStatic,
        state.infosPixQRCode,
      )

    case PixActions.UPDATE_PIX_OUT:
      return new InitialPixState(
        state.pix,
        state.banks,
        state.pixKeys,
        state.pixTransfer,
        state.pixKeyDetails,
        state.pixQrCodeStatic,
        state.pixQRCode,
        state.selectPix,
        state.infosPixQRCode,
        state.operationLimits,
        state.changeOperationLimitSuccessMessage,
        state.accountOperationLimitList,
        action.payload,
      )
    default:
      return state
  }
}
