import { AbstractControl, ValidatorFn } from "@angular/forms";

// export function forbiddenNameValidator(control: AbstractControl): {[key: string]: any} | null{
//     const forbidden = /admin/.test(control.value) || 
//     /jusreiza/.test(control.value);
//     return forbidden ? { 'forbiddenName' : {value: control.value}} : null;
// }

export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any } | null => {
        const forbidden = forbiddenName.test(control.value);
        return forbidden ? { 'forbiddenName' : {value: control.value}} : null;
    };
}

export function validNameValidator(control: AbstractControl): {[key: string]: any} | null{
    const valid = /javiel/.test(control.value)
    return valid ? { 'validName' : {value: control.value}} : null;
}

