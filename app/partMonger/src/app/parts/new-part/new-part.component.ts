import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CreatePart } from 'src/app/types/parts';
import { PartService } from '../parts.service';

@Component({
  selector: 'app-new-part',
  templateUrl: './new-part.component.html',
  styleUrls: ['./new-part.component.scss'],
})
export class NewPartComponent {
  requiredMessage = 'This field is required.';
  partForm: FormGroup;
  @ViewChild('p') pForm?: NgForm;

  constructor(private partService: PartService) {
    this.partForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cost: new FormControl(0, [Validators.required, Validators.min(0)]),
      partNumber: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      notes: new FormControl(''),
      image: new FormControl(''),
      isActive: new FormControl(true),
      inStock: new FormControl(0, [Validators.required, Validators.min(0)]),
      id: new FormControl(0),
    });
  }

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.partForm.markAllAsTouched();
    if (this.partForm.valid) {
      let data: CreatePart = {
        name: this.partForm.get('name')!.value,
        partNumber: this.partForm.get('partNumber')!.value,
        description: this.partForm.get('description')!.value,
        notes: this.partForm.get('notes')!.value,
        image: this.partForm.get('image')!.value,
        cost: this.partForm.get('cost')!.value,
        isActive: this.partForm.get('isActive')!.value,
        inStock: this.partForm.get('inStock')!.value,
      };
      this.partService.addPart(data).subscribe((res) => {
        this.partService.handleAddPart(res);
        //Not sure why I need to do this
        //mat-form-field will display as invalid
        //when form is reset if not
        this.pForm?.resetForm();
      });
    }
  }
}
