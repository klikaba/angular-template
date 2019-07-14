import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { LoginComponent } from './login/login.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HomePageRoutingModule,
        SharedModule
    ],
    declarations: [
        HomePageComponent,
        LoginComponent
    ]
})
export class HomePageModule { }
