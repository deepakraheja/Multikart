import { Component, OnInit, Input, HostListener } from '@angular/core';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { Router, NavigationEnd } from '@angular/router';
import { LoginComponent } from 'src/app/pages/account/login/login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { WishListService } from 'src/app/Service/wish-list.service';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  
  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/icon/logo.svg'; // Default Logo
  @Input() topbar: boolean = true; // Default True
  @Input() sticky: boolean = false; // Default false
  
  public stick: boolean = false;
  public LoggedInUser: any[] = [];
  public searchQuery: string;
  public CompareCount;
  public WishListCount;
  constructor(
    private router: Router,
    private _SharedDataService: SharedDataService,
    private modalService: NgbModal,
    public productService: ProductService,
    public _wishListService: WishListService
  ) { }

  ngOnInit(): void {
    this._SharedDataService.currentUser.subscribe(a => {
      this.LoggedInUser = a;
    });
    this._SharedDataService.lstcompare.subscribe(response => {
      debugger
      this.CompareCount = response.length;
    });
    this._SharedDataService.lstwishList.subscribe(response => {
      debugger
      this.WishListCount = response.length;
      this.LoadWishList();
    });
  }

  LoadWishList() {
    this.LoggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'));
    if (this.LoggedInUser != null) {
      this._wishListService.GetWishListById().subscribe(response => {
        this.WishListCount = response.length;
      });
    }
    else {
      this.WishListCount = 0;
    }
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  	if (number >= 300 && window.innerWidth > 400) { 
  	  this.stick = true;
  	} else {
  	  this.stick = false;
  	}
  }

  Logout() {
    localStorage.removeItem('LoggedInUser');
    localStorage.removeItem('Token');
    this.LoggedInUser = [];
    this._SharedDataService.AssignUser(null);
    this._SharedDataService.UserCart(null);
    this.router.navigate(['/home/fashion']);
  }
  Login() {
    this.modalService.open(LoginComponent, {
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
}
