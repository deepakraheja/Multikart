import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { UsersService } from 'src/app/Service/users.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  RegistrationForm: FormGroup;


  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;

  phoneMask = null;
  showMask: boolean = false;
  public verified: boolean = false;
  public mobileverified: boolean = false;

  public validate: boolean = true;
  public counter;

  loginStart = false;
  submitted = false;

  public mvaldate: boolean = true;

  emailOTP: boolean = false;
  mobileOTP: boolean = false;
  mobileotpSendStart: boolean;
  errorShow: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private _SharedDataService: SharedDataService,
    private spinner: NgxSpinnerService
  ) {

    //this.RegistrationForm = this.toFormGroup(this.formInput);
  }
  // toFormGroup(elements) {
  //   const group: any = {};

  //   elements.forEach(key => { group[key] = new FormControl('', Validators.required); });
  //   return new FormGroup(group);
  // }

  get OTPFormArray() {
    return this.RegistrationForm.controls.OTPArray as FormArray;
  }

  keyUpEvent(event, index) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }

  }

  ngOnInit(): void {
    this.RegistrationForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.minLength(10)]],
      mobilecode: ['', [Validators.required]],
      OTPArray: new FormArray([]),
    });

    this.formInput.forEach(() => this.OTPFormArray.push(new FormControl('')));

  }


  get f() { return this.RegistrationForm.controls; }



  //*****************************Validate mobile && call checkMobileAlreadyExist function************/
  validateAndCheckMobile() {
    ;
    if (this.f.mobileNo.errors) {
      if (this.f.mobileNo.errors.required) {
        this.showMessage('Please enter a valid mobile number (10 digits)');
      } else {
        this.showMessage('Invalid mobile');
      }
    } else {

      this.checkMobileAlreadyExist();
    }
  }


  //*****************************Check mobile Already Exist in the database or not*********************/

  checkMobileAlreadyExist() {
    this.counter = 600;
    this.spinner.show();
    let obj = {
      "MobileNo": this.RegistrationForm.get('mobileNo').value
    }

      ;
    this.mobileotpSendStart = true;
    this.userService.CheckMobileAllReadyRegisteredOrNot(obj).subscribe((res: any) => {
      setTimeout(() => this.spinner.hide(), 500);

      if (res == 0) {
        this.sendMobileOtp();

      }
      else if (res > 0) {
        this.mobileotpSendStart = false;
        this.showMessage('This mobile already registered.');
      }
      else {
        this.showMessage('OTP sending to this number is denied - Contact customer care');
      }
    }, error => {
      this.mobileotpSendStart = false;
      this.toastr.error(error);
    });
  }

  //*****************************send mobile OTP************/
  sendMobileOtp() {

    this.toastr.success('OTP has been sent');
    this.mobileOTP = true;
    this.Set_Time();
    // let d = {
    //   "mobile": this.RegistrationForm.value.mobile
    // }
    // this.userService.sendmobileOtp(d).subscribe((res: any) => {
    //   if (res) {
    //     this.toastr.success('OTP has been sent');
    //     this.mobileOTP = true;
    //     //this.otpSendStart = false;
    //   } else {
    //     this.mobileotpSendStart = false;
    //     this.mobileOTP = false;
    //     //this.validate = true;
    //     this.showMessage('OTP has not been sent');
    //   }
    // }, error => {
    //   this.mobileotpSendStart = false;

    //   //this.validate = true;
    //   this.toastr.error(error);
    // });
  }
  /*****************************verify mobile OTP*********************/
  verifyMobileOtp() {
    debugger
    //this.submitted = true;

    const OTPArray: FormArray = this.RegistrationForm.get('OTPArray') as FormArray;

    OTPArray.controls.forEach((control, i) => {
      debugger
      if (control.value == "") {
        return;
      }
      else {
        this.errorShow = 1;
      }

    });

    if (this.errorShow == 0) {
      this.showMessage('mobile otp required');
    }
    else {
      let d = {
        "mobile": this.RegistrationForm.value.mobile,
        //"mobilecode": this.RegistrationForm.get('mobilecode').value

      }


      this.userService.verify_mobile_otp(d).subscribe((res: any) => {

        if (res == 0) {
          this.mobileverified = true;
          this.mobileOTP = false;
          this.mvaldate = false;
        } else if (res == 1) {
          this.toastr.error('OTP expired! Please try again');

        } else if (res == 2) {

          this.toastr.error('Invalid OTP');
        } else {
          this.toastr.error('Exception Error');
        }
      }, (err) => {
        this.toastr.error(err.error);
      });
    }


  }


  //******************************Show Error message*************//
  showMessage(str) {
    this.toastr.error(str);
  }

  //****************************** CreateRegistration*************//
  CreateRegistration() {
    this.submitted = true;
    if (this.RegistrationForm.invalid) {
      this.toastr.error('All the * marked fields are mandatory');
      return;
    }
    else {
      this.userService.UserRegistration(this.RegistrationForm.value).subscribe(res => {
        if (res > 0) {
          this.toastr.success("Thank you for registering. We will inform you as soon as account gets approved.");
          // let obj = {
          //   LoginId: this.RegistrationForm.value.email,
          //   password: this.RegistrationForm.value.password
          // };
          // this.userService.ValidLogin(obj).subscribe(res => {
          //   if (res.length > 0) {

          //     sessionStorage.setItem('LoggedInUser', JSON.stringify(res));
          //     this._SharedDataService.AssignUser(res);
          //     // debugger
          //     this.route.paramMap.subscribe((params: ParamMap) => {
          //       if (params.get('cart') != "" && params.get('cart') != null && params.get('cart') != undefined) {
          //         this.router.navigate(['/shop/cart']);
          //       }
          //       else {
          //         this.router.navigate(['/home/fashion']);
          //       }
          //     });
          //   }
          // });

          this.router.navigate(['/home/fashion']);
        }
        else {
          this.toastr.error("email address already exists");
          return;
        }
      });
    }
  }

  //******************************Show Resend OTP in*************//
  Set_Time() {

    if (this.counter != 0) {
      this.counter--;

    }
    else {
      clearTimeout();
    }

    setTimeout(() => {

      if (this.counter > 0) {
        this.Set_Time();
      }
      if (this.counter == 0) {
        this.mobileOTP = false;

      }

    }, 1000);

  }


}
