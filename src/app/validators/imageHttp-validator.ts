import { ValidatorFn } from '@angular/forms';

export function imageValidator(): ValidatorFn {
    const regExp = new RegExp(`^(http|https)://`);

    return (control) => {
        const formControl = regExp.test(control.value)

        return formControl ? null : { imageValidator: true };
    };
}