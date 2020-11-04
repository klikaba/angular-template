import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

// Pipes
import { TimeAgoPipe } from 'src/app/shared/pipes/time-ago.pipe';

// Directives
import { FormControlErrorsDirective } from './directives/form-control-error.directive';

const directives = [
    FormControlErrorsDirective
];

const pipes = [
    TimeAgoPipe
];
  
@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        ...directives,
        ...pipes
    ],
    declarations: [
        ...directives,
        ...pipes
    ],
    providers: [],
})
export class SharedModule { }
