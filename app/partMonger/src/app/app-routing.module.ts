import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePartsComponent } from './parts/manage-parts/manage-parts.component';
import { NewPartComponent } from './parts/new-part/new-part.component';
import { PartsComponent } from './parts/parts/parts.component';

const routes: Routes = [
  {
    path: 'parts',
    component: PartsComponent,
  },
  {
    path: 'manage',
    component: ManagePartsComponent,
    children: [
      { path: 'new', component: NewPartComponent },
      { path: '', redirectTo: 'new', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/parts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
