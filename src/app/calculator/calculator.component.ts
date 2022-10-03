import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  calcForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.calcForm = new FormGroup({
      items: new FormArray([this.initialItemFormGroup]),
    });
  }

  onAddItem() {
    (<FormArray>this.calcForm.get('items')).push(this.initialItemFormGroup);
  }

  onSubmit() {}

  get controls() {
    return (<FormArray>this.calcForm.get('items')).controls;
  }

  get initialItemFormGroup(): FormGroup {
    return new FormGroup({
      boxType: new FormControl(null, Validators.required),
      structure: new FormControl(null, Validators.required),
      length: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      width: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      height: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      quantity: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });
  }

  onDeleteItem(itemIndex: number) {
    (<FormArray>this.calcForm.get('items')).removeAt(itemIndex);
  }
}
