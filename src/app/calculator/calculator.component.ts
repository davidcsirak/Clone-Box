import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalculatorService } from '../shared/services/calculator.service';
import { Box } from '../model/box.model';
import { Structure } from '../model/structure.model';
import { Item } from '../model/item.model';
import { CalculationResult } from '../model/calculationResult.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  calcForm: FormGroup;
  boxTypes: Box[];
  structureTypes: Structure[];
  box: Box;
  structure: Structure;
  items: Item[] = [];
  calculationResult: CalculationResult = null;

  constructor(private calcService: CalculatorService) {}

  ngOnInit(): void {
    this.initForm();
    this.getBoxTypes();
    this.getStructureTypes();
  }

  private initForm() {
    this.calcForm = new FormGroup({
      items: new FormArray([this.initialItemFormGroup]),
    });
    this.itemsFormArray.get('length');
  }

  onAddItem() {
    (<FormArray>this.calcForm.get('items')).push(this.initialItemFormGroup);
  }

  onSubmit() {
    console.log(this.calcForm.value);
    this.calculationResult = null;
    this.items = [];
    this.calcForm.value.items.map((itemData) => {
      const newItem = this.calcService.createItem(
        this.getBoxByType(itemData.boxType),
        this.getStructureByType(itemData.structure),
        itemData.length,
        itemData.width,
        itemData.height,
        itemData.quantity
      );
      this.items.push(newItem);
    });

    this.calculationResult = this.calcService.getCalculationResult(this.items);
  }

  get controls() {
    return (<FormArray>this.calcForm.get('items')).controls;
  }
  get itemsFormArray() {
    return this.calcForm.get('items') as FormArray;
  }

  getBoxTypes() {
    this.calcService.getBoxes().subscribe((boxTypes) => {
      this.boxTypes = boxTypes;
    });
  }

  getStructureTypes() {
    this.calcService.getStructures().subscribe((structureTypes) => {
      this.structureTypes = structureTypes;
    });
  }

  getBoxByType(boxType: string) {
    const box = this.boxTypes.find((box) => box.type == boxType);
    return new Box(box.type, box.name);
  }

  getStructureByType(structureType: string) {
    const structure = this.structureTypes.find(
      (structure) => structure.type == structureType
    );
    return new Structure(
      structure.price,
      structure.thickness,
      structure.type,
      structure.name
    );
  }

  get initialItemFormGroup(): FormGroup {
    return new FormGroup({
      boxType: new FormControl(null, Validators.required),
      structure: new FormControl(null, Validators.required),
      length: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
        Validators.min(100),
      ]),
      width: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
        Validators.min(100),
      ]),
      height: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
        Validators.min(100),
      ]),
      quantity: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
        Validators.min(1),
      ]),
    });
  }

  onDeleteItem(itemIndex: number) {
    (<FormArray>this.calcForm.get('items')).removeAt(itemIndex);
  }

  onReset() {
    this.calcForm.reset();
    this.calculationResult = null;
  }
}
