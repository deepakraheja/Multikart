import { Component, OnInit, TemplateRef } from '@angular/core';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { Router } from '@angular/router';
import { BillingAddressService } from 'src/app/Service/billing-address.service';
import { OrderService } from 'src/app/Service/order.service';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/Service/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public ProductImage = environment.ProductImage;
  public openDashboard: boolean = false;
  public ShowTabName: string = "AccountInfor";
  public LoggedInUser: any[] = [];
  public lstBillingAddress: any[] = [];
  public lstOrder: any[] = [];
  public checkoutForm: FormGroup;
  public Submitted: boolean = false;
  public SelectedBillingAddressId: number = 0;
  public ChangePwdForm: FormGroup;
  constructor(
    private _SharedDataService: SharedDataService,
    private router: Router,
    private _BillingAddressService: BillingAddressService,
    private _OrderService: OrderService,
    public productService: ProductService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private _userService: UsersService
  ) {

  }

  ngOnInit(): void {
    this._SharedDataService.currentUser.subscribe(a => {
      this.LoggedInUser = a;
      this.checkoutForm = this.fb.group({
        billingAddressId: [0],
        userID: this.LoggedInUser[0].userID,
        fName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
        lName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
        companyName: [''],
        phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        emailId: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required, Validators.maxLength(200)]],
        country: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required],
      });

      this.ChangePwdForm = this.fb.group({
        userID: this.LoggedInUser[0].userID,
        password: ['', [Validators.required]],
        NewPassword: ['', [Validators.required, Validators.minLength(8)]],
        ConfirmPwd: ['', [Validators.required, Validators.minLength(8)]],
      });

      this.LoadBillingAddress();
      this.LoadAllOrder();
    });
  }

  LoadBillingAddress() {
    let obj = {
      UserID: this.LoggedInUser[0].userID
    };
    this._BillingAddressService.GetBillingAddress(obj).subscribe(res => {
      this.lstBillingAddress = res;
    });
  }

  LoadAllOrder() {
    let obj = {
      UserID: this.LoggedInUser[0].userID
    };
    this._OrderService.GetOrderByUserId(obj).subscribe(res => {
      this.lstOrder = res;
      console.log(res);
    });
  }

  OrderTrackingListByOrderId(OrderId) {
    //debugger
    let res = this.lstOrder[0].orderDetails;
    return res.filter(x => (x.orderId == null || x.orderId == OrderId));
  }

  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }

  Logout() {
    sessionStorage.removeItem('LoggedInUser');
    this._SharedDataService.AssignUser(null);
    this.router.navigate(['/home/fashion']);
  }

  NewBillingAddress(template: TemplateRef<any>) {
    this.Submitted = false;
    this.checkoutForm = this.fb.group({
      billingAddressId: [0],
      userID: this.LoggedInUser[0].userID,
      fName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lName: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      companyName: [''],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      emailId: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
    this.modalService.open(template, {
      size: 'lg',
      //ariaLabelledBy: 'Cart-Modal',
      centered: true,
      //windowClass: 'theme-modal cart-modal CartModal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.modalService.dismissAll();
    });
  }

  EditBillingAddress(template: TemplateRef<any>, lst) {
    this.Submitted = false;
    this.checkoutForm = this.fb.group({
      billingAddressId: [lst.billingAddressId],
      userID: this.LoggedInUser[0].userID,
      fName: [lst.fName, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lName: [lst.lName, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      companyName: [lst.companyName],
      phone: [lst.phone, [Validators.required, Validators.pattern('[0-9]+')]],
      emailId: [lst.emailId, [Validators.required, Validators.email]],
      address: [lst.address, [Validators.required, Validators.maxLength(200)]],
      country: [lst.country, Validators.required],
      city: [lst.city, Validators.required],
      state: [lst.state, Validators.required],
      zipCode: [lst.zipCode, Validators.required],
    });
    this.modalService.open(template, {
      size: 'lg',
      //ariaLabelledBy: 'Cart-Modal',
      centered: true,
      //windowClass: 'theme-modal cart-modal CartModal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.modalService.dismissAll();
    });
  }

  DeleteBillingAddress(template: TemplateRef<any>, lst) {
    this.SelectedBillingAddressId = lst.billingAddressId;
    this.modalService.open(template, {
      size: 'md',
      //ariaLabelledBy: 'Cart-Modal',
      centered: true,
      //windowClass: 'theme-modal cart-modal CartModal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.modalService.dismissAll();
    });
  }

  DelBillingAddress() {
    let obj = {
      billingAddressId: this.SelectedBillingAddressId,
      userID: Number(this.LoggedInUser[0].userID,),
    }
    debugger
    this._BillingAddressService.DeleteBillingAddress(obj).subscribe(res => {
      debugger
      this.lstBillingAddress = res;
      this.toastr.success("Billing Address has been deleted successfully.");
      this.modalService.dismissAll();
    });
  }

  SaveBillingAddress() {
    this.Submitted = true;
    if (this.checkoutForm.invalid) {
      this.toastr.error("All fields are mandatory.");
      return;
    }
    else {
      let obj = {
        billingAddressId: Number(this.checkoutForm.value.billingAddressId),
        userID: Number(this.LoggedInUser[0].userID,),
        fName: this.checkoutForm.value.fName,
        lName: this.checkoutForm.value.lName,
        companyName: this.checkoutForm.value.companyName,
        phone: this.checkoutForm.value.phone,
        emailId: this.checkoutForm.value.emailId,
        address: this.checkoutForm.value.address,
        country: this.checkoutForm.value.country,
        city: this.checkoutForm.value.city,
        state: this.checkoutForm.value.state,
        zipCode: this.checkoutForm.value.zipCode,
      }
      debugger
      this._BillingAddressService.SaveBillingAddress(obj).subscribe(res => {
        debugger
        this.lstBillingAddress = res;
        this.toastr.success("Billing Address has been saved successfully.");
        this.modalService.dismissAll();
        //this.LoadBillingAddress();
      });
    }
  }

  ChangePassword(template: TemplateRef<any>) {
    this.Submitted = false;
    this.ChangePwdForm = this.fb.group({
      userID: this.LoggedInUser[0].userID,
      password: ['', [Validators.required]],
      NewPassword: ['', [Validators.required, Validators.minLength(8)]],
      ConfirmPwd: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.modalService.open(template, {
      size: 'md',
      //ariaLabelledBy: 'Cart-Modal',
      centered: true,
      //windowClass: 'theme-modal cart-modal CartModal'
    }).result.then((result) => {
      `Result ${result}`
    }, (reason) => {
      this.modalService.dismissAll();
    });
  }

  UpdatePassword() {
    this.Submitted = true;
    if (this.ChangePwdForm.invalid) {
      this.toastr.error("All fields are mandatory.");
      return;
    }
    else {
      let obj = {
        userID: this.LoggedInUser[0].userID,
        password: this.ChangePwdForm.value.password,
        NewPassword: this.ChangePwdForm.value.NewPassword
      }
      this._userService.UpdatePwd(obj).subscribe(res => {
        if (Number(res) > 0) {
          this.toastr.success("Password has been saved successfully.");
          this.modalService.dismissAll();
        }
        else
          this.toastr.error("Old Password is invalid.");
      });
    }
  }
}