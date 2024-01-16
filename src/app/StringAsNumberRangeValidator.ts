import {AbstractControl, ValidatorFn} from '@angular/forms';

export function stringAsNumberRangeValidator(min:number, max:number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>{
        if(control.value==null) return null;
        if (!control.value.toString().match("^[-+]?[0-9]*.?[0-9]+$")){
            return {NotANumber: true};
        }
        if (!(min<+control.value && max>+control.value)){
            return {NotInRange: true}
        }
        return null;
    }
}