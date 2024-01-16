import {AbstractControl, ValidatorFn} from '@angular/forms';

export function oneOfValueValidator(value: number[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>{
    if(control.value==null) return null;
    if (!control.value.toString().match("^[-+]?[0-9]*.?[0-9]+$")){
      return {NotANumber: true};
    }
    if(!value.includes(control.value)){
      return {NotInValues: true}
    }
    return null;
  }
}
