import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../lib/models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products$: Observable<IProduct[]> = new Observable();

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  AllProducts() {
    return this.http.get<IProduct[]>(this.baseUrl + 'api/products');
  }

  SearchProducts(searchText: string) {
    return this.http.get<IProduct[]>(this.baseUrl + `api/products/search/${encodeURIComponent(searchText)}`);
  }

}
