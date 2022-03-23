import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartsComponent } from './parts/parts/parts.component';

const routes: Routes = [
  { path: 'parts', component: PartsComponent },
  { path: '', redirectTo: '/parts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
