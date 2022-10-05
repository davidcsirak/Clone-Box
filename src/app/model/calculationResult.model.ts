export class CalculationResult {
  constructor(
    public quantity: number,
    public price: number,
    public materialArea: number,
    public boxArea?: number,
    public boxVolume?: number
  ) {}
}
