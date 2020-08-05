import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Service/users.service';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private toastr: ToastrService,
    private _SharedDataService: SharedDataService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      LoginId: ['', Validators.required],
      password: ['', Validators.required],
      userType: 2
    });
  }

  get f1() { return this.LoginForm.controls; }

  Register() {
    this.router.navigate(['/pages/register']);
    this.modalService.dismissAll();
  }

  close() {
    this.modalService.dismissAll();

  }

  Login() {
    if (this.LoginForm.invalid) {
      this.toastr.error('All the * marked fields are mandatory');
      return;
    }
    else {
      this.userService.ValidLogin(this.LoginForm.value).subscribe(res => {
        if (res.length > 0) {

          sessionStorage.setItem('LoggedInUser', JSON.stringify(res));
          sessionStorage.setItem('Token', res[0].token);

          this._SharedDataService.AssignUser(res);
          this._SharedDataService.UserCart(res);
          // debugger
          // this.route.paramMap.subscribe((params: ParamMap) => {
          //   if (params.get('cart') != "" && params.get('cart') != null && params.get('cart') != undefined) {
          //     this.router.navigate(['/shop/cart']);
          //   }
          //   else {
          //     this.router.navigate(['/home/fashion']);
          //   }
          // });
          this.modalService.dismissAll();
          //this.toastr.error('You approval is pending.');
        }
        else {
          this.toastr.error('Invalid email address and password');
          return;
        }
      });
    }
  }
}
