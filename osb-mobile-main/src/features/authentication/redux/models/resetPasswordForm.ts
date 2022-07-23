export class ResetPasswordForm {
  constructor(
    public taxId?: string,
    public mail?: string,
    public phoneNumber?: string,
    public sendType?: number,
  ) {}
}
