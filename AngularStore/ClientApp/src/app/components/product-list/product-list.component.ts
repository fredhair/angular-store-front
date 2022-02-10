import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../lib/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: IProduct[] = [];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit(): void {
    this.assignProductsFromAPI();
  }

  private assignProductsFromAPI() {
    this.http.get<IProduct[]>(this.baseUrl + 'api/products').subscribe(res => this.products = res, err => console.error(err));
    console.log(this.baseUrl);
  }

}
