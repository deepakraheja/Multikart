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

@Component({
  selector: 'app-product-left-sidebar-with-set',
  templateUrl: './product-left-sidebar-with-set.component.html',
  styleUrls: ['./product-left-sidebar-with-set.component.scss']
})
export class ProductLeftSidebarWithSetComponent implements OnInit {

  user: any[] = null;
  public ProductImage = environment.ProductImage;

  index: number;
  bigProductImageIndex = 0;

  public product: Product = {};

  public productkart: Productkart[] = [];

  public counter: number = 1;
  public activeSlide: any = 0;
  public activeColorSlide: any = 0;
  public selectedSize: any = 1;
  public mobileSidebar: boolean = false;
  public productId: any;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(private route: ActivatedRoute, private router: Router,
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
      this.productId = params['productId'];
      const productSizeId = params['productSizeId'];

      let productObj = {
        rowID: this.productId,
        productSizeId: Number(productSizeId)
      }
      this._prodService.GetWithSetProductByRowID(productObj).subscribe(product => {

        //  ;
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
    this.bigProductImageIndex = Number(index);
    this.activeColorSlide = Number(index);
    this.activeSlide = 0;
    this.ChangeImage();
  }

  // Get Product Color
  Color(variants) {

    if (variants != null) {

      const uniqColor = []
      for (let i = 0; i < Object.keys(variants).length; i++) {
        if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
          uniqColor.push(variants[i].color)
        }
      }
      return uniqColor
    }
  }


  //  // Get Product Size
  //  Size(variants) {
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


  // Get Product SET
  SetList(variants) {

    if (variants != null) {
      const uniqSize = []
      for (let i = 0; i < Object.keys(variants).length; i++) {
        if (uniqSize.indexOf(variants[i].setNo) === -1 && variants[i].setNo) {
          uniqSize.push(variants[i].setNo)
        }
      }
      return uniqSize
    }
  }

  selectSize(size) {

    this.selectedSize = size + 1;
    this.bigProductImageIndex = Number(size);

  }

  // Increament
  increment(myIndex, item: any, qty: any) {
    //  ;
    if (item.selectedQty < qty--)
      item.selectedQty++;

    //this.counter[myIndex]++;
  }

  // Decrement
  decrement(myIndex, item: any) {
    if (item.selectedQty > 1) item.selectedQty--;
  }


  // Add to cart
  // async addToCart(product: productSizeColor, productname: any) {
  //   //  
  //   product.quantity = this.counter || 1;
  //   product.productname = productname;
  //   const status = await this.productService.addToCartProduct(product);
  //   //  ;      
  //   // if (status)
  //   this.router.navigate(['/shop/cart']);
  // }

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if (status)
      this.router.navigate(['/shop/checkout']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }
  // Add to cart
  async addToCart(type: Number) {
    // setTimeout(function(){ 
    //   $("#zoom_01").css("display", "none");
    // }, 1000);

    //  
    //product.quantity = this.counter || 1;
    //product.productname = productname;

    var obj: any[] = [];
    var array: any[] = this.productkart[0].productSizeSet;
    (array).forEach(element => {

      if (element.isSelected) {

        obj.push({
          UserID: Number(this.user[0].userID),
          SetNo: Number(element.setNo),
          Quantity: Number(element.selectedQty),
          RowID: this.productId
        })

      }
    });
    //  ;
    if (Number(obj.length) > 0) {
      const status = await this.productService.addToCartProduct(obj);

      if (status) {
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
}
