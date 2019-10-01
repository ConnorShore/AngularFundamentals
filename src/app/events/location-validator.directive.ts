import { Directive } from "@angular/core";
import { Validator, FormGroup, NG_VALIDATORS } from '@angular/forms'

@Directive({
    selector: '[validateLocation]',
    //Add LocationValidator to NG_VALIDATORS list (if multi:true wans't there, it would replace NG_VALIDATORS, not add to it)
    providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi:true}]
})
export class LocationValidator implements Validator {

    validate(formGroup: FormGroup): { [key: string]: any} {
        let addressControl = formGroup.controls['address'];
        let cityControl = formGroup.controls['city'];
        let countryControl = formGroup.controls['country'];
        let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

        if((addressControl && addressControl.value &&
            cityControl && cityControl.value &&
            countryControl && countryControl.value) || 
            (onlineUrlControl && onlineUrlControl.value)) {
                return null;
        } else {
            //Need to validate
            return { validateLocation: false };
        }
    }
}