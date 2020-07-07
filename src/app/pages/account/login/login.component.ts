import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      LoginId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  get f1() { return this.LoginForm.controls; }

  Login() {
    if (this.LoginForm.invalid) {
      this.toastr.error('All the * marked fields are mandatory');
      return;
    }
    else {
      this.userService.ValidLogin(this.LoginForm.value).subscribe(res => {
        if (res.length > 0) {

          sessionStorage.setItem('LoggedInUser', JSON.stringify(res));
          //this._SharedDataService.AssignUser(res);
          debugger
          this.route.paramMap.subscribe((params: ParamMap) => {
            if (params.get('cart') != "" && params.get('cart') != null && params.get('cart') != undefined) {
              this.router.navigate(['/shop/cart']);
            }
            else {
              this.router.navigate(['/home/fashion']);
            }
          });
        }
        else {
          this.toastr.error('Invalid email address and password');
          return;
        }
      });
    }
  }
}
