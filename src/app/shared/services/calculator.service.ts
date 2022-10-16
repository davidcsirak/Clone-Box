import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Box } from '../../model/box.model';
import { Structure } from '../../model/structure.model';
import { Item } from '../../model/item.model';
import { CalculationResult } from '../../model/calculationResult.model';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private boxesColl: AngularFirestoreCollection<Box>;
  private structuresColl: AngularFirestoreCollection<Structure>;
  public extra = 7;

  constructor(private afs: AngularFirestore) {
    this.boxesColl = afs.collection<Box>('boxes');
    this.structuresColl = afs.collection<Structure>('structures');
  }

  getBoxes() {
    return this.boxesColl.valueChanges();
  }

  getStructures() {
    return this.structuresColl.valueChanges();
  }

  createItem(
    box: Box,
    structure: Structure,
    length: number,
    width: number,
    height: number,
    quantity: number
  ): Item {
    return new Item(box, structure, length, width, height, quantity);
  }

  getCalculationResult(items: Item[]): CalculationResult {
    let finalCalculationResult = new CalculationResult(0, 0, 0, 0, 0, items);

    let addToSummary = (boxCalculation: CalculationResult) => {
      finalCalculationResult.materialArea += boxCalculation.materialArea;
      finalCalculationResult.boxArea += boxCalculation.boxArea;
      finalCalculationResult.boxVolume += boxCalculation.boxVolume;
      finalCalculationResult.price += boxCalculation.price;
      finalCalculationResult.quantity += boxCalculation.quantity;
    };

    items.forEach((item) => {
      switch (item.box.type) {
        case 'classic':
          addToSummary(this.getClassicBoxCalculation(item));
          break;
        case 'open':
          addToSummary(this.getOpenBoxCalculation(item));
          break;
      }
    });

    return this.roundWithTwoDecimals(finalCalculationResult);
  }

  private getClassicBoxCalculation(item: Item): CalculationResult {
    const materialArea =
      ((2 * item.width + 2 * item.length + this.extra) *
        (item.height + item.width) *
        item.quantity) /
      Math.pow(10, 6);
    const price = materialArea * item.structure.price;
    const boxArea =
      (item.length * item.width * item.quantity) / Math.pow(10, 6);
    const boxVolume =
      (item.length * item.width * item.height * item.quantity) /
      Math.pow(10, 6);

    return new CalculationResult(
      item.quantity,
      price,
      materialArea,
      boxArea,
      boxVolume
    );
  }

  private getOpenBoxCalculation(item: Item): CalculationResult {
    const materialArea =
      ((2 * item.width + 2 * item.length + this.extra) *
        (item.height + item.width / 2) *
        item.quantity) /
      Math.pow(10, 6);
    const price = materialArea * item.structure.price;
    const boxArea =
      (item.length * item.width * item.quantity) / Math.pow(10, 6);
    const boxVolume =
      (item.length * item.width * item.height * item.quantity) /
      Math.pow(10, 6);

    return new CalculationResult(
      item.quantity,
      price,
      materialArea,
      boxArea,
      boxVolume
    );
  }

  private roundWithTwoDecimals(
    calcResult: CalculationResult
  ): CalculationResult {
    calcResult.quantity = +calcResult.quantity.toFixed(2);
    calcResult.price = +calcResult.price.toFixed(2);
    calcResult.materialArea = +calcResult.materialArea.toFixed(2);
    calcResult.boxArea = +calcResult.boxArea.toFixed(2);
    calcResult.boxVolume = +calcResult.boxVolume.toFixed(2);

    return calcResult;
  }
}
