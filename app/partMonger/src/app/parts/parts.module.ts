import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartsComponent } from './parts/parts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PartsListComponent } from './parts-list/parts-list.component';
import { PartComponent } from './part/part.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PartFormComponent } from './part-form/part-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ManagePartsComponent } from './manage-parts/manage-parts.component';
import { NewPartComponent } from './new-part/new-part.component';
import { EditPartComponent } from './edit-part/edit-part.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PartsComponent,
    PartsListComponent,
    PartComponent,
    PartFormComponent,
    ManagePartsComponent,
    NewPartComponent,
    EditPartComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    RouterModule,
  ],
})
export class PartsModule {}
