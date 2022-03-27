import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { EditPartComponent } from './edit-part/edit-part.component';
import { ManagePartsComponent } from './manage-parts/manage-parts.component';
import { NewPartComponent } from './new-part/new-part.component';
import { PartComponent } from './part/part.component';
import { PartsListComponent } from './parts-list/parts-list.component';
import { PartsComponent } from './parts/parts.component';

@NgModule({
  declarations: [
    PartsComponent,
    PartsListComponent,
    PartComponent,
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
