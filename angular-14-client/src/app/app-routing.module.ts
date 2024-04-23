import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesIntakeFormComponent } from './components/sales-intake-form/sales-intake-form.component';

const routes: Routes = [
  { path: 'salesintake', component: SalesIntakeFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }