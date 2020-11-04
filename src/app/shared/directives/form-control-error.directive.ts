import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { ValidationMessage } from '../helpers/validation-message.helper';

@Directive({
  selector: '[formControlErrors]'
})
export class FormControlErrorsDirective implements OnChanges {
    @Input() formControlErrors: any;
    @Input() control: any;
    constructor(private el: ElementRef) { }

    ngOnChanges(): void {
      if (this.formControlErrors) {
        const error = Object.keys(this.formControlErrors)[0];
        this.el.nativeElement.innerText = ValidationMessage[this.control][error];
      }
    }
}
