import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownFormService } from 'src/app/services/dropdown-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  billingAddressState: any;
  shippingAddressState: any;

  creditCardMonths: number[] = []
  creditCardYears: number[] = []

  constructor(private _formBuilder: FormBuilder,
    private _dropDownService: DropdownFormService) {

  }

  ngOnInit(): void {
    this.checkoutFormGroup = this._formBuilder.group({
      customer: this._formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        phone: ['']
      }),
      shippingAddress: this._formBuilder.group({
        country: [''],
        state: [''],
        city: [''],
        zipCode: [''],
        street: ['']
      }),
      billingAddress: this._formBuilder.group({
        country: [''],
        state: [''],
        city: [''],
        zipCode: [''],
        street: ['']
      }),
      creditCard: this._formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMotnh: [''],
        expirationYear: ['']
      })
    })
    //get credit card month datas
    const startMonth: number = new Date().getMonth() + 1
    console.log("Start Month: " + startMonth)

    this._dropDownService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data))
        this.creditCardMonths = data
      }
    )

    //get credit card year
    this._dropDownService.getCreditYears().subscribe(
      data => {
        console.log("Retrieved credit card years: "+ JSON.stringify(data))
        this.creditCardYears = data
      }
    )
  }

  //copyToBillingAddress Method
  copyToBillingAddress(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.checked) {
        console.log('Checked . . .');
        this.checkoutFormGroup.controls['billingAddress'].setValue(
          this.checkoutFormGroup.controls['shippingAddress'].value
        );
        this.billingAddressState = this.shippingAddressState;
      } else {
        this.checkoutFormGroup.controls['billingAddress'].reset();
        this.billingAddressState = [];
      }
    }
  }

  //submitMethod
  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value);
    console.log('----');
    console.log(this.checkoutFormGroup.get('shippingAddress')?.value);
    console.log('----');
    console.log(this.checkoutFormGroup.get('billingAddress')?.value);
    console.log('----');
    console.log(this.checkoutFormGroup.get('creditCard')?.value)
  }
}