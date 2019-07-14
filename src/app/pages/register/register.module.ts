import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        RegisterRoutingModule,
        SharedModule
    ],
    declarations: [
        RegisterComponent
    ]
})
export class RegisterModule { }
