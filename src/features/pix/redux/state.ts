import { Banks } from './models/banks'
import { PixTransfer } from './models/pixTransfer'
import { PixData } from './models/pixData'
import { OperationLimits } from './models/operationLimits'
import { PixKeys } from './models/PixKey'
import { PixKeysDetails } from './models/response/pixKeysDetailsResponse'
import { Pix } from './models/pixQrCodeStatic'
import { PixQRCode } from './models/pixQrCode'
import { InfoPixQRCode } from './models/infoPixQRCode'
import { InfosPixQRCode } from './models/response/getInfoPixQRCodeResponse'
import { SelectPixKey } from './models/selectPixKey'
import { AccountOperationLimitList } from './models/accountOperationLimitList'
import { PixCashChangeWithdraw } from './models/pixCashChangeWithdraw'
export interface PixState {
  pix?: PixData
  banks?: Banks[]
  pixKeys?: PixKeys[]
  pixTransfer?: PixTransfer
  pixKeyDetails?: PixKeysDetails
  pixQRCode?: PixQRCode
  pixQrCodeStatic?: Pix
  selectPix?: SelectPixKey
  infosPixQRCode?: InfosPixQRCode
  operationLimits?: OperationLimits
  changeOperationLimitSuccessMessage?: string
  accountOperationLimitList?: AccountOperationLimitList[]
  pixCashChangeWithdraw?: PixCashChangeWithdraw
  loading: boolean
  errorMessage?: string
}

export class InitialPixState implements PixState {
  public errorMessage?: string
  public loading: boolean = false

  constructor(
    public pix?: PixData,
    public banks?: Banks[],
    public pixKeys?: PixKeys[],
    public pixTransfer?: PixTransfer,
    public pixKeyDetails?: PixKeysDetails,
    public pixQrCodeStatic?: Pix,
    public pixQRCode?: PixQRCode,
    public selectPix?: SelectPixKey,
    public infosPixQRCode?: InfoPixQRCode,
    public operationLimits?: OperationLimits,
    public changeOperationLimitSuccessMessage?: string,
    public accountOperationLimitList?: AccountOperationLimitList[],
    public pixCashChangeWithdraw?: PixCashChangeWithdraw,
  ) {}
}

export class LoadingPixState implements PixState {
  loading: boolean = true
  errorMessage?: string

  constructor(
    public pix?: PixData,
    public banks?: Banks[],
    public pixKeys?: PixKeys[],
    public pixTransfer?: PixTransfer,
    public pixKeyDetails?: PixKeysDetails,
    public pixQRCode?: PixQRCode,
    public pixQrCodeStatic?: Pix,
    public selectPix?: SelectPixKey,
    public infosPixQRCode?: InfoPixQRCode,
    public operationLimits?: OperationLimits,
    public changeOperationLimitSuccessMessage?: string,
    public accountOperationLimitList?: AccountOperationLimitList[],
    public pixCashChangeWithdraw?: PixCashChangeWithdraw,
  ) {}
}

export class SuccessPixState implements PixState {
  loading: boolean = false
  errorMessage?: string

  constructor(
    public pix?: PixData,
    public banks?: Banks[],
    public pixTransfer?: PixTransfer,
    public pixKeys?: PixKeys[],
    public pixKeyDetails?: PixKeysDetails,
    public pixQRCode?: PixQRCode,
    public pixQrCodeStatic?: Pix,
    public selectPix?: SelectPixKey,
    public operationLimits?: OperationLimits,
    public changeOperationLimitSuccessMessage?: string,
    public accountOperationLimitList?: AccountOperationLimitList[],
    public infosPixQRCode?: InfoPixQRCode,
    public pixCashChangeWithdraw?: PixCashChangeWithdraw,
  ) {}
}

export class FailPixState implements PixState {
  loading: boolean = false

  constructor(
    public errorMessage: string,
    public pix?: PixData,
    public banks?: Banks[],
    public pixKeys?: PixKeys[],
    public pixTransfer?: PixTransfer,
    public pixKeyDetails?: PixKeysDetails,
    public pixQRCode?: PixQRCode,
    public pixQrCodeStatic?: Pix,
    public selectPix?: SelectPixKey,
    public operationLimits?: OperationLimits,
    public infosPixQRCode?: InfoPixQRCode,
    public changeOperationLimitSuccessMessage?: string,
    public accountOperationLimitList?: AccountOperationLimitList[],
    public pixCashChangeWithdraw?: PixCashChangeWithdraw,
  ) {}
}
export class UpdatePixKeyState implements PixState {
  loading: boolean = false
  errorMessage?: string
  infoPixQRcode?: InfoPixQRCode

  constructor(public pix: PixData | undefined) {}
}
