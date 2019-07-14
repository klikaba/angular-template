import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register.component';

const registerRoutes: Routes = [
    { path: '', component: RegisterComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(registerRoutes),
  ],
  exports: [RouterModule],
  providers: []
})
export class RegisterRoutingModule {}
