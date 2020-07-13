import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
import { Productkart } from 'src/app/shared/classes/productkart';
import { productSizeColor } from 'src/app/shared/classes/productsizecolor';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/Service/shared-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: Product[] = [];

  public productSizeColor: productSizeColor[] = [];

  public ProductImage = environment.ProductImage;

  //commented on 13 july 2020
  // constructor(public productService: ProductService) {
  //   this.productService.cartItems.subscribe(response => this.products = response);
  // }

  constructor(public productService: ProductService,
  private router: Router,
    private _SharedDataService: SharedDataService) {
    this.productService.ProductcartItems.subscribe(response => {
      this.productSizeColor = response
      debugger;
    });
  }


  ngOnInit(): void {
  }

  public get getTotal(): Observable<number> {
    return this.productService.productcartTotalAmount();
  }

  // Increament
  increment(product, qty = 1) {
    this.productService.updateCartQuantity(product, qty);
  }

  // Decrement
  decrement(product, qty = -1) {
    this.productService.updateCartQuantity(product, qty);
  }

  public removeItem(product: any) {
    this.productService.removeCartItem(product);
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
