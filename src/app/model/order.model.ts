import { CalculationResult } from './calculationResult.model';

export class Order {
  constructor(
    public calcResult: CalculationResult,
    public companyName: string,
    public contactPerson: string,
    public email: string,
    public phone: string,
    public address: string,
    public orderedAt: number
  ) {}
}
