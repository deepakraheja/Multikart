import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Service/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
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

    let message, status;
    if (this.RegistrationForm.invalid) {
      this.toastr.error('All the * marked fields are mandatory');
      return;
    }
    else {
      this.userService.UserRegistration(this.RegistrationForm.value).subscribe(res => {
        if (res > 0)
          this.router.navigate(['/home/fashion']);
        else {
          this.toastr.error("email address already exists");
          return;
        }
      });
    }
  }

}
