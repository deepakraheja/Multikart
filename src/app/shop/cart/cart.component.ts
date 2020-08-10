import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
import { Productkart } from 'src/app/shared/classes/productkart';
import { productSizeColor } from 'src/app/shared/classes/productsizecolor';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { CartService } from 'src/app/Service/cart.service';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: Product[] = [];

  public productSizeColor: productSizeColor[] = [];

  public ProductImage = environment.ProductImage;
  user: any[] = null;
  //commented on 13 july 2020
  // constructor(public productService: ProductService) {
  //   this.productService.cartItems.subscribe(response => this.products = response);
  // }

  constructor(public productService: ProductService,
    private router: Router,
    private _SharedDataService: SharedDataService,
    private _cartService: CartService,
    private toastrService: ToastrService
  ) {

    // this.productService.ProductcartItems.subscribe(response => {
    //   this.productSizeColor = response
    //   // debugger;
    // });
  }

  ngOnInit(): void {
    this._SharedDataService.lstCart.subscribe(res => {
      this.LoadCart();
    });
  }

  getTotal() {
    var TotalAmount = 0;
    this.productSizeColor.forEach(element => {
      TotalAmount += element.salePrice * element.quantity
    });
    return TotalAmount;
  }

  // public get getTotal(): Observable<number> {
  //   return this.productService.productcartTotalAmount();
  // }

  LoadCart() {
    this.user = JSON.parse(sessionStorage.getItem('LoggedInUser'));
    if (this.user != null) {
      let obj = {
        UserID: this.user[0].userID
      };
      this._cartService.GetCartById(obj).subscribe(response => {
        // debugger
        this.productSizeColor = response
      });
    }
    else {
      this.productSizeColor = [];
    }

  }

  // Increament
  increment(product, qty = 1) {
    // debugger
    let obj = [{
      UserID: Number(this.user[0].userID),
      ProductSizeId: Number(product.productSizeId),
      Quantity: qty,
      SetNo:Number(product.setNo)
    }];
    this._cartService.UpdateToCart(obj).subscribe(res => {
      this.toastrService.success("Product quantity has been successfully updated in cart.");
      this.LoadCart();
      this._SharedDataService.UserCart(this.productSizeColor);
    });
    this.productService.updateCartQuantity(product, qty);
  }

  // Decrement
  decrement(product, qty = -1) {
    // debugger
    if (product.quantity > 1) {
      let obj = [{
        UserID: Number(this.user[0].userID),
        ProductSizeId: Number(product.productSizeId),
        Quantity: qty,
        SetNo:Number(product.setNo)
      }];
      this._cartService.UpdateToCart(obj).subscribe(res => {
        this.toastrService.success("Product quantity has been successfully updated in cart.");
        this.LoadCart();
        this._SharedDataService.UserCart(this.productSizeColor);
      });
    }
    this.productService.updateCartQuantity(product, qty);
  }

  public removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  ProceedToCheckout() {
    // debugger
    this.router.navigate(['/shop/checkout']);

    // this._SharedDataService.currentUser.subscribe(res => {
    //   // debugger
    //   if (res == null || res == undefined) {
    //     this.router.navigate(['/pages/login/cart']);
    //   }
    //   else {
    //     if (res.length > 0) {
    //       this.router.navigate(['/shop/checkout']);
    //     }
    //     else {
    //       this.router.navigate(['/pages/login/cart']);
    //     }
    //   }
    // });
  }
}
