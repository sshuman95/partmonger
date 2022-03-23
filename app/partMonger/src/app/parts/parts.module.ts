import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartsComponent } from './parts/parts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PartsListComponent } from './parts-list/parts-list.component';
import { PartComponent } from './part/part.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PartsComponent, PartsListComponent, PartComponent],
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatButtonModule],
})
export class PartsModule {}
