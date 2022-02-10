import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from '../lib/models/Product';

export interface CartEntry {
  product: IProduct,
  count: number,
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartEntry[] = [];

  constructor() { }

  addTo(product: IProduct, count: number) {
    const foundIndex = this.items.findIndex(item => item.product.id === product.id);
    if (foundIndex < 0) {
      this.items.push({ product, count });
    } else {
      this.items.splice(foundIndex, 1, { product, count });
    }
  }

  removeFrom(productID: number, count: number): void;
  removeFrom(product: IProduct, count: number): void;
  removeFrom(productID: number): void;
  removeFrom(product: IProduct): void;

  removeFrom(product: IProduct | number, count?: number): void {
    let id: number = typeof product === "number" ? product : product.id;

    const foundIndex = this.items.findIndex(item => item.product.id === id);
    if (foundIndex > 0) {
      this.items[foundIndex].count -= count ?? this.items[foundIndex].count;
      if (this.items[foundIndex].count < 0) {
        this.items.splice(foundIndex, 1);
      }
    }
  }

  itemsOnly(): Observable<IProduct[]> {
    return of(this.items.map(item => item.product));
  }

  itemsWithCounts(): Observable<CartEntry[]> {

    return of(this.items);

    //Production version:
    //Get product array from server's session data
    //return http.get<CartEntry[]>(productsUrl)
  }

  removeAll(): void {
    this.items = [];
  }

  //TS function overloading declarations
  hasItem(productID: number): boolean;
  hasItem(product: IProduct): boolean;

  hasItem(product: IProduct | number): boolean {
    return typeof product === 'number' ?
      this.items.some(el => el.product.id === product):
      this.items.some(el => el.product === product);
  }

}
