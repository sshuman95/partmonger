import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { map, Observable, switchMap, tap } from 'rxjs';
import { Part } from '../../types/parts';
import { PartService } from '../parts.service';

@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.scss'],
})
export class EditPartComponent implements OnInit {
  requiredMessage = 'This field is required.';
  partForm$?: Observable<FormGroup>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partService: PartService
  ) {}

  ngOnInit(): void {
    this.partForm$ = this.route.params.pipe(
      switchMap((params) => {
        return this.partService.getPartById(this.formatId(params)).pipe(
          tap((data) => {
            if (!data.id) {
              this.router.navigateByUrl('manage/new');
            }
          }),
          map((data) => this.initForm(data))
        );
      })
    );
  }

  formatId(params: Params) {
    return !isNaN(+params['id']) ? +params['id'] : 0;
  }

  initForm(part: Part) {
    let partForm = new FormGroup({
      name: new FormControl(part.name, [Validators.required]),
      cost: new FormControl(part.cost, [
        Validators.required,
        Validators.min(0),
      ]),
      partNumber: new FormControl(part.partNumber, [Validators.required]),
      description: new FormControl(part.description, [Validators.required]),
      notes: new FormControl(part.notes ? part.notes : ''),
      image: new FormControl(part.image ? part.image : ''),
      isActive: new FormControl(part.isActive),
      id: new FormControl(part.id),
    });
    return partForm;
  }

  handleSubmit(event: SubmitEvent, form: FormGroup) {
    event.preventDefault();
    form.markAllAsTouched();
    if (form.valid) {
      this.partService.editPart({...form.value}).subscribe((res) => {
        this.partService.handleEditPart(res);
      });
    }
  }

  handleDeletePart(id: number) {
    this.partService.deletePart(id).subscribe((data) => {
      this.partService.handleDeletePart(data.id);
      this.router.navigateByUrl('manage/new');
    });
  }
}
