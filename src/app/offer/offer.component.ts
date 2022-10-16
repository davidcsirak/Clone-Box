import { Component, OnInit } from '@angular/core';
import { CalculationResult } from '../model/calculationResult.model';
import { CalculatorService } from '../shared/services/calculator.service';
import { GlobalService } from '../shared/services/global.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
})
export class OfferComponent implements OnInit {
  calculationResult: CalculationResult;

  constructor(
    private calcService: CalculatorService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.calculationResult = this.globalService.getCalcResult();
    this.globalService.calcResultValue.subscribe(() => {
      this.calculationResult = this.globalService.getCalcResult();
    });
  }
}
