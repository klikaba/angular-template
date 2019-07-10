import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeAgoPipe } from 'src/app/shared/pipes/time-ago.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        TimeAgoPipe
    ],
    providers: [],
})
export class SharedModule { }
