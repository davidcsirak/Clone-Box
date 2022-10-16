import { Item } from './item.model';

export class CalculationResult {
  constructor(
    public quantity: number,
    public price: number,
    public materialArea: number,
    public boxArea: number,
    public boxVolume: number,
    public items?: Item[]
  ) {}
}
