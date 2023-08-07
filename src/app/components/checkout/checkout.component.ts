import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { State } from 'src/app/common/state';
import { Country } from 'src/app/common/country';
import { DropdownFormService } from 'src/app/services/dropdown-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  billingAddressStates: State[] = [];
  shippingAddressStates: State[] = [];

  creditCardMonths: number[] = []
  creditCardYears: number[] = []

  countries :Country [] = [];

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
      //get data countries
    this._dropDownService.getCountries().subscribe(
      data =>{
        this.countries = data;
      }
    )
  }


    handleMonthAndYears(){
      const creditCardFormGroup = this.checkoutFormGroup.get('creditCard')

      const currentYear: number = new Date().getFullYear()
      const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear)

      //if this year == selected year then start value month with current month
      //else, start value month with first month
      let startMonth: number;
      if(currentYear == selectedYear){
        startMonth = new Date().getMonth() + 1
      } else{
        startMonth = 1
      }

      this._dropDownService.getCreditCardMonths(startMonth).subscribe(
        data =>{
          console.log("Retrieved credit card month: "+ JSON.stringify(data))
          this.creditCardMonths = data
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
        this.billingAddressStates = this.shippingAddressStates;
      } else {
        this.checkoutFormGroup.controls['billingAddress'].reset();
        this.billingAddressStates = [];
      }
    }
  }

  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const  countryCode = formGroup?.value.country.iso2;
    const  countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`)
    console.log(`${formGroupName} country code: ${countryName}`)

    this._dropDownService.getStates(countryCode).subscribe(
      data =>{
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        } else{
          this.billingAddressStates = data
        }
        //chose first item as default
        formGroup?.get('state')?.setValue(data[0]);
      }
    )
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
    console.log('----');
    console.log("The shipping addres country is "+ this.checkoutFormGroup.get('shippingAddress')?.value.country.name)
    console.log("The billing addres country is "+ this.checkoutFormGroup.get('shippingAddress')?.value.state.name)
  }
}