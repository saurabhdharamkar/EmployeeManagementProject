import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ShowEmployeeComponent } from './show-employee/show-employee.component';

const routes: Routes = [
  {path:'showEmployee', component: ShowEmployeeComponent},
  {path:'addEmployee', component: AddEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
