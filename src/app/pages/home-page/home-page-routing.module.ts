import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';

const homePageRoutes: Routes = [
    { path: '', component: HomePageComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(homePageRoutes),
  ],
  exports: [RouterModule],
  providers: []
})
export class HomePageRoutingModule {}
