import { FormControl, ValidationErrors } from "@angular/forms"

export class CustomValidators {
    
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {

        if ((control.value != null) && (control.value.trim().length === 0)) {
            //invalid, return eror obj
            return {'notOnlyWhiteSpace': true}
        }else{
            //valid, return null
            return null
        }
    }
}
