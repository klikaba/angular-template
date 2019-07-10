import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenInterceptor } from 'src/app/core/services/token.interceptor';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    declarations: [],
    providers: [
        ApiService,
        AuthService,
        {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
        }
    ],
})
export class CoreModule { }
