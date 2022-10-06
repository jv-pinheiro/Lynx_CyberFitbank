export interface ChangeAccountOperationLimitResponse {
    message: string;
    previousMinLimit: number;
    previousMaxLimit: number;
    newMinLimit: number;
    newMaxLimit: number;
}