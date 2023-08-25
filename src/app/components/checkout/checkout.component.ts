import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { State } from 'src/app/common/state';
import { Country } from 'src/app/common/country';
import { DropdownFormService } from 'src/app/services/dropdown-form.service';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  billingAddressStates: State[] = [];
  shippingAddressStates: State[] = [];

  totalQuantity: number = 0
  totalPrice: number = 0

  creditCardMonths: number[] = []
  creditCardYears: number[] = []

  countries: Country[] = [];

  constructor(private _formBuilder: FormBuilder,
    private _dropDownService: DropdownFormService,
    private _cartService: CartService,
    private _checkoutService: CheckoutService,
    private _route: Router) {
  }

  ngOnInit(): void {
    this.updateCartTotal()

    this.checkoutFormGroup = this._formBuilder.group({
      customer: this._formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('', [
          Validators.required, Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace]),
        email: new FormControl('', [
          Validators.required,
          CustomValidators.notOnlyWhiteSpace]),
        phone: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(14)])
      }),
      shippingAddress: this._formBuilder.group({
        country: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          CustomValidators.notOnlyWhiteSpace]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          CustomValidators.notOnlyWhiteSpace]),
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          CustomValidators.notOnlyWhiteSpace
        ])
      }),

      // optional to use validation in billing address
      billingAddress: this._formBuilder.group({
        country: [''],
        state: [''],
        city: [''],
        zipCode: [''],
        street: ['']
      }),
      creditCard: this._formBuilder.group({
        cardType: new FormControl('', Validators.required),
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          CustomValidators.notOnlyWhiteSpace
        ]),
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
        console.log("Retrieved credit card years: " + JSON.stringify(data))
        this.creditCardYears = data
      }
    )
    //get data countries
    this._dropDownService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    )
  }

  

  handleMonthAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard')

    const currentYear: number = new Date().getFullYear()
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear)

    //if this year == selected year then start value month with current month
    //else, start value month with first month
    let startMonth: number;
    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1
    } else {
      startMonth = 1
    }

    this._dropDownService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card month: " + JSON.stringify(data))
        this.creditCardMonths = data
      }
    )
  }

  //get validated data customer
  get firstName() { return this.checkoutFormGroup.get('customer.firstName') }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName') }
  get email() { return this.checkoutFormGroup.get('customer.email') }
  get phone() { return this.checkoutFormGroup.get('customer.phone') }

  // get validated data shipping address
  get countryName() { return this.checkoutFormGroup.get('shippingAddress.country') }
  get stateName() { return this.checkoutFormGroup.get('shippingAddress.state') }
  get cityName() { return this.checkoutFormGroup.get('shippingAddress.city') }
  get zipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode') }
  get streetName() { return this.checkoutFormGroup.get('shippingAddress.street') }

  //get validated data credit card
  get cardType() { return this.checkoutFormGroup.get('creditCard.cardType') }
  get creditCardOwner() { return this.checkoutFormGroup.get('creditCard.nameOnCard') }
  //as FormControl used to remove safe navigation '?' when calling the get() on html 
  get cardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber') as FormControl }
  get cardSecurityCode()  { return this.checkoutFormGroup.get('creditCard.securityCode') }

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

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.iso2;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`)
    console.log(`${formGroupName} country code: ${countryName}`)

    this._dropDownService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data
        }
        //chose first item as default
        formGroup?.get('state')?.setValue(data[0]);
      }
    )
  }

  updateCartTotal(){
    //subscribe into cart totalPrice
    this._cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    //subscribe into cart totalQuantity
    this._cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
  }

  //submitMethod
  onSubmit() {
    console.log("Handling the submit button");
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    //set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart item
    const cartItems = this._cartService.cartItems;

    //create orderItems from cartItems
    let orderItems: OrderItem[] = cartItems.map(
      tempCartItem => new OrderItem(tempCartItem)
    )

    //set up purchase
      let purchase = new Purchase();

    //populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;

    //popoulate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    //for parsing JSON into string
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state))

    purchase.shippingAddress.country = shippingCountry.name;
    purchase.shippingAddress.state = shippingState.name

    //populate purchase - billing address

    //populate purchase - order & orderItems

    //get REST API from checkoutServices
  }
}