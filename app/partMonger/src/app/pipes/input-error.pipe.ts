import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'inputError',
})
export class InputErrorPipe implements PipeTransform {
  transform(value: ValidationErrors | null | undefined, key = 'Field'): string {
    if (value && value['min']) {
      return `${key} must be greater than 0.`;
    }
    if (value && value['required']) {
      return 'This field is required.';
    }
    return '';
  }
}
