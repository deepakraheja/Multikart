import { Component, OnInit, ViewChild, Renderer2, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Product } from '../../../../shared/classes/product';
import { ProductService } from '../../../../shared/services/product.service';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { Productkart } from 'src/app/shared/classes/productkart';
import { ProductsService } from 'src/app/Service/Products.service';
import { environment } from 'src/environments/environment';
import { productSizeColor } from 'src/app/shared/classes/productsizecolor';
import { CartService } from 'src/app/Service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';

declare var $;
declare function imageZoom(a, b): any; // just change here from arun answer.

export interface image {
  colorindex: number;
  color: string;
}

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {


  //public headers: any = ["", "COLOR", "SIZE", "QUANTITY", "STOCK"];
  public headers: any = ["COLOR", "SIZE", "QUANTITY"];
  public ProductImage = environment.ProductImage;

  index: number;
  bigProductImageIndex = 0;

  public product: Product = {};

  public productkart: Productkart[] = [];

  public productSizeColor: productSizeColor[] = [];

  //public counter: number[] = [1, 1, 1, 1, 1, 1, 1, 1, 1];
  public activeSlide: any = 0;

  activeSlide1: any = 0;
  public selectedSize: any;
  public mobileSidebar: boolean = false;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
  user: any[] = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private _prodService: ProductsService,
    private _CartService: CartService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) {
    this.activeSlide = 0;
    // this.route.data.subscribe(response => this.product = response.data );
  }

  ngAfterViewInit() {
    //setTimeout(() => imageZoom('zoom_01', 'myresult'), 2000);

    $(document).ready(function () {

      function scrollSticky() {
        if ($('.sticky-scroll').length) {

          var el = $('.sticky-scroll');
          var stickyTop = el.offset().top - 142;

          $(window).scroll(function () {

            var footerPosition = $('.unsticky').offset().top;
            var limit = footerPosition - 740 - 20;
            var windowTop = $(window).scrollTop();

            if (stickyTop < windowTop) {
              el.addClass('fixed-section');
              el.css({
                position: 'fixed',
                top: 142
              });
            } else {
              el.css('position', 'static');
              el.removeClass('fixed-section');
            }
            if (limit < windowTop) {
              var diff = limit - windowTop;
              el.css({
                top: diff + 142
              })
            }
          });
        }
      }
      if ($(window).width() >= 1024) {
        scrollSticky();
      }

      setTimeout(() => $("#zoom_01").ezPlus({
        zoomWindowWidth: 500,
        zoomWindowHeight: 500
      }), 3000);

    });
  }
  BindProduct(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      const productid = params['productId'];
      const productSizeId = params['productSizeId'];

      let productObj = {
        rowID: productid,
        productSizeId: Number(productSizeId)
      }
      this._prodService.GetWithoutSetProductByRowID(productObj).subscribe(product => {
        if (!product) { // When product is empty redirect 404
          this.router.navigateByUrl('/pages/404', { skipLocationChange: true });
        } else {

          this.productkart = product;

        }
        setTimeout(() => this.spinner.hide(), 1000);
      });
    });

  }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('LoggedInUser'));
    this.BindProduct();
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://cdn.rawgit.com/igorlino/elevatezoom-plus/1.1.6/src/jquery.ez-plus.js';
    //s.text = `imageZoom("zoom_01", "myresult");`;
    this.renderer2.appendChild(this._document.body, s);
  }

  ChangeImage() {
    debugger;
    //this.activeSlide = index;
    setTimeout(() => $("#zoom_01").ezPlus(

      {

        zoomWindowWidth: 500,
        zoomWindowHeight: 500
      }
    ), 500);

    //  ;
    debugger
    // this.bigProductImageIndex = Number(index);
    // this.activeSlide = Number(index);
    // this.SelectedColor = [];
    // this.SelectedColor.push({
    //   productSizeId: Number(lst.productSizeId)
    // });
  }
  changecolor(index: string) {
    //  ;
    this.bigProductImageIndex = Number(index);
    this.activeSlide = Number(index);
  }


  // Get Product Color
  Color(variants) {

    if (variants != null) {

      const uniqColor = []

      let imageColor: image[] = []

      for (let i = 0; i < Object.keys(variants).length; i++) {
        if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
          uniqColor.push(variants[i].color)

          imageColor.push({
            colorindex: i,
            color: variants[i].color

          })
        }
      }

      //console.log(imageColor);
      return imageColor
    }
  }

  // Get Product Size  commented on 23 july 2020
  // Size(variants) {
  //   if (variants != null) {
  //     const uniqSize = []
  //     for (let i = 0; i < Object.keys(variants).length; i++) {
  //       if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
  //         uniqSize.push(variants[i].size)
  //       }
  //     }
  //     return uniqSize
  //   }
  // }

  fnCheck(item: productSizeColor, evt: any, rdoId: string) {
    //  ;
    item.isSelected = evt;
  }

  selectSize(size) {
    this.selectedSize = size;
  }

  // Increament
  increment(myIndex, item: productSizeColor, qty: any) {
    //  ;
    if (item.selectedQty < qty--)
      item.selectedQty++;

    //this.counter[myIndex]++;
  }

  // Decrement
  decrement(myIndex, item: productSizeColor) {
    if (item.selectedQty > 1) item.selectedQty--;
  }

  // Add to cart
  async addToCart(type: Number) {




    //  
    //product.quantity = this.counter || 1;
    //product.productname = productname;

    var obj: any[] = [];
    var array: any[] = this.productkart[0].productSizeColor;
    (array).forEach(element => {

      if (element.isSelected) {

        obj.push({
          UserID: Number(this.user[0].userID),
          ProductSizeId: Number(element.productSizeId),
          Quantity: Number(element.selectedQty)
        })

      }
    });
    //  ;
    if (Number(obj.length) > 0) {
      const status = await this.productService.addToCartProduct(obj);

      if (status) {
        // $("#zoom_01").remove();

        // setTimeout(function(){ 
        //   $("#zoom_01").css("display", "none");
        // }, 500);

        // setTimeout(function () {
        //   $.removeData($('img'), 'elevateZoom');
        //   $('.zoomContainer').remove();
        // }, 100);

        if (type == 1)
          this.router.navigate(['/shop/cart']);
        else
          this.router.navigate(['/shop/checkout']);
      }
    }
    else {

      this.toastr.error("Please select an item.");
    }
  }

  // Buy Now
  // async buyNow(product: any) {
  //   product.quantity = this.counter || 1;
  //   const status = await this.productService.addToCart(product);
  //   if (status)
  //     this.router.navigate(['/shop/checkout']);
  // }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

}
