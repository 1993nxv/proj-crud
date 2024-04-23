import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRed]'
})
export class RedDirective {

  constructor(private elemento: ElementRef) { 
    elemento.nativeElement.style.color = 'red';
  }
}
