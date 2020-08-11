import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Service/users.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/Service/shared-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegistrationForm: FormGroup;
  phoneMask = null;
  showMask: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private _SharedDataService:SharedDataService
  ) { }

  ngOnInit(): void {
    this.RegistrationForm = this.formBuilder.group({
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      mobileNo: ['', Validators.required]
    });
  }
  get f() { return this.RegistrationForm.controls; }

  CreateRegistration() {
    if (this.RegistrationForm.invalid) {
      this.toastr.error('All the * marked fields are mandatory');
      return;
    }
    else {
      this.userService.UserRegistration(this.RegistrationForm.value).subscribe(res => {
        if (res > 0) {
          this.toastr.success("Thank you for registering. We will inform you when your account will be approved.");
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

}
