import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-part',
  templateUrl: './new-part.component.html',
  styleUrls: ['./new-part.component.scss'],
})
export class NewPartComponent {
  requiredMessage = 'This field is required';
  partForm: FormGroup;
  constructor() {
    this.partForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cost: new FormControl(0, [Validators.required, Validators.min(0)]),
      partNumber: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      notes: new FormControl(''),
      image: new FormControl(''),
      isActive: new FormControl(true),
      id: new FormControl(0),
    });
  }

  getCostError() {
    if (this.partForm.get('cost')?.hasError('required')) {
      return this.requiredMessage;
    }
    return this.partForm?.get('cost')?.hasError('min')
      ? 'Cost must be greater than 0.'
      : '';
  }
}
