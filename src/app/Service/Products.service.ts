import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Products } from '../modals/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public currency: string = 'Rs';
  public catalogMode: boolean = false;

  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Product/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};

  constructor(private _http: HttpClient) { }



  BindProductByPopular(): Observable<Products[]> {
 
    this._methodName = "GetProductByPopular";
    return this._http.post<Products[]>(
      this._url + this._methodName, this._param
    );
  }

  getProductByCategory(_categoryObj: any): Observable<any[]> {
 
    this._methodName = "GetProductBySubcatecode";
    this._param = _categoryObj;
    return this._http.post<any[]>(
      this._url + this._methodName, this._param
    );
  }

  getProductById(_productObj: any): Observable<Products[]> {
    this._methodName = "GetProductByRowID"; 
    this._param = _productObj;
    return this._http.post<Products[]>(
      this._url + this._methodName, this._param
    );
  }

  GetBannerProduct(): Observable<Products[]> {
    this._methodName = "GetBannerProduct"; 
    return this._http.post<Products[]>(
      this._url + this._methodName, this._param
    );
  }


}
