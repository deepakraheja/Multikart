import { Component, OnInit, AfterViewInit } from '@angular/core';
//import { OrderService } from '../../../shared/services/order.service';
import { OrderService } from 'src/app/Service/order.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss']
})
export class OrderInvoiceComponent implements OnInit {
  public ProductImage = environment.ProductImage;
  public orderDetails: any[] = [];
  user: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _OrderService: OrderService,
    private spinner: NgxSpinnerService,
    public productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      //this.GetOrderById(Number(params.get('orderId')));
      var GUID = params.get('id');
      //if (GUID != null) {
        let obj = {
          GUID: GUID
        };
        this.spinner.show();
        this._OrderService.GetSuccessPrintOrderByGUID(obj).subscribe(res => {
          this.spinner.hide();

          //if (res > 0)
          this.orderDetails = res;
          //console.log(res);
          setTimeout(() => {
            //window.print();
          }, 1000);
          
        });
      //}
    });
  }

  getTotal() {
    var TotalAmount = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalAmount += (element.salePrice * element.quantity) + element.gstAmount
    });
    return TotalAmount;
  }

  getQty() {
    var TotalQty = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalQty += element.quantity
    });
    return TotalQty;
  }

  getTotalAmountWithOutGST() {
    var TotalAmountWithOutGST = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalAmountWithOutGST += (element.salePrice * element.quantity)
    });
    return TotalAmountWithOutGST;
  }


  getTotalGSTAmount() {
    var TotalGSTAmount = 0;
    (this.orderDetails[0].orderDetails).forEach(element => {
      TotalGSTAmount += element.gstAmount
    });
    return TotalGSTAmount;
  }
}
