import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Part } from 'src/app/types/parts';

@Component({
  selector: 'app-part-form',
  templateUrl: './part-form.component.html',
  styleUrls: ['./part-form.component.scss'],
})
export class PartFormComponent implements OnInit {
  @Input() part?: Part;
  requiredMessage = 'This field is required';
  partForm: FormGroup;

  constructor() {
    this.partForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cost: new FormControl(0, [Validators.required, Validators.min(0)]),
      partNumber: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      notes: new FormControl(''),
      inStock: new FormControl(0, [Validators.required, Validators.min(0)]),
      image: new FormControl(''),
      isActive: new FormControl(true),
      id: new FormControl(0),
    });
  }

  ngOnInit(): void {
    if (this.part) {
      this.partForm.setValue({
        name: this.part.name,
        cost: this.part.cost,
        partNumber: this.part.partNumber,
        description: this.part.description,
        notes: this.part.notes,
        inStock: this.part.inStock,
        image: this.part.image,
        isActive: this.part.isActive,
        id: this.part.id,
      });
    }
  }

  getCostError() {
    if (this.partForm.get('cost')?.hasError('required')) {
      return this.requiredMessage;
    }
    return this.partForm?.get('cost')?.hasError('min')
      ? 'Cost must be greater than 0.'
      : '';
  }

  getInStockError() {
    if (this.partForm.get('inStock')?.hasError('required')) {
      return this.requiredMessage;
    }
    return this.partForm?.get('inStock')?.hasError('min')
      ? 'Stock quantity must be greater than 0.'
      : '';
  }
}
