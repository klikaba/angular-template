import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const dashboardRoutes: Routes = [
    { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes),
  ],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule {}
