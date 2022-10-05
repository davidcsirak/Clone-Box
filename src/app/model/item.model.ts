import { Box } from './box.model';
import { Structure } from './structure.model';

export class Item {
  constructor(
    public box: Box,
    public structure: Structure,
    public length: number,
    public width: number,
    public height: number,
    public quantity: number
  ) {}
}
