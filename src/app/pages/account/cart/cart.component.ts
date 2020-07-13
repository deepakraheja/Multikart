import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/Service/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private router: Router,
    private _SharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
  }

  ProceedToCheckout() {
    debugger
    this._SharedDataService.currentUser.subscribe(res => {
      debugger
      if (res == null || res == undefined) {
        this.router.navigate(['/pages/login']);
      }
      else {
        if (res.length > 0) {
          this.router.navigate(['/shop/checkout']);
        }
        else {
          this.router.navigate(['/pages/login']);
        }
      }
    });
  }
}
