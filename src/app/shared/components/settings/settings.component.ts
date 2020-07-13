import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../classes/product";
import { productSizeColor } from '../../classes/productsizecolor';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/Service/shared-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  
  public ProductImage = environment.ProductImage;


  public products: Product[] = []
  public productSizeColor: productSizeColor[] = [];

  public languages = [{
    name: 'English',
    code: 'en'
  }, {
    name: 'French',
    code: 'fr'
  }];

 public currencies = [
    {
      name: 'Rupees',
      currency: 'INR',
      price: 70.93 // price of inr
    }
    // , {
    //   name: 'Euro',
    //   currency: 'EUR',
    //   price: 0.90 // price of euro
    // }, {
    //   name: 'Pound',
    //   currency: 'GBP',
    //   price: 0.78 // price of euro
    // }, {
    //   name: 'Dollar',
    //   currency: 'USD',
    //   price: 1 // price of usd
    // }
  ]
  // constructor(@Inject(PLATFORM_ID) private platformId: Object,
  //   private translate: TranslateService,
  //   public productService: ProductService) {
  //   this.productService.cartItems.subscribe(response => this.products = response);
  // }


  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public productService: ProductService,
      private router: Router,
    private _SharedDataService: SharedDataService) {
    this.productService.ProductcartItems.subscribe(response => {
      this.productSizeColor = response
      debugger;
    });
  }

  ngOnInit(): void {
  }

  changeLanguage(code) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
    }
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }

  ProceedToCheckout() {
    debugger
    this._SharedDataService.currentUser.subscribe(res => {
      debugger
      if (res == null || res == undefined) {
        this.router.navigate(['/pages/login/cart']);
      }
      else {
        if (res.length > 0) {
          this.router.navigate(['/shop/checkout']);
        }
        else {
          this.router.navigate(['/pages/login/cart']);
        }
      }
    });
  }
}
