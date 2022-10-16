import { Injectable } from '@angular/core';
import { CalculationResult } from '../../model/calculationResult.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  calcResultValue = new Subject<CalculationResult>();

  constructor() {}

  setCalcResult(value: CalculationResult) {
    localStorage.setItem('calcResult', JSON.stringify(value));
    this.calcResultValue.next(value);
  }

  getCalcResult() {
    return JSON.parse(localStorage.getItem('calcResult'));
  }

  removeCalcResult() {
    localStorage.removeItem('calcResult');
    this.calcResultValue.next(null);
  }
}
