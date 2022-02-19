import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
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
  private items$: BehaviorSubject<CartEntry[]> = new BehaviorSubject(this.items);

  productsTotal$: BehaviorSubject<number> = new BehaviorSubject(0);
  entries$: Observable<CartEntry[]> = this.items$.asObservable();
  //Dont think I actually needed this in the end but meh
  productsOnly$: Observable<IProduct[]> = this.items$.pipe(map(arr => arr.map(entry => entry.product)));

  constructor() { }

  addTo(product: IProduct, count: number = 1) {
    if (count <= 0) {
      return;
    }

    const foundIndex = this.items.findIndex(item => item.product.id === product.id);
    if (foundIndex < 0) {
      this.items.push({ product, count });
    } else {
      this.items.splice(foundIndex, 1, { product, count: this.items[foundIndex].count + count });
    }
    this.items$.next(this.items);
    this.productsTotal$.next(this.calculateTotalValue());
  }

  removeFrom(productID: number, count: number): void;
  removeFrom(product: IProduct, count: number): void;
  removeFrom(productID: number): void;
  removeFrom(product: IProduct): void;

  removeFrom(product: IProduct | number, count?: number): void {
    if (count && count <= 0) {
      return;
    }

    let id: number = typeof product === "number" ? product : product.id;

    const foundIndex = this.items.findIndex(item => item.product.id === id);
    if (foundIndex >= 0) {
      this.items[foundIndex].count -= count ?? this.items[foundIndex].count;
      if (this.items[foundIndex].count <= 0) {
        this.removeItemAt(foundIndex);
      }
    }
    this.items$.next(this.items);
    this.productsTotal$.next(this.calculateTotalValue());
  }

  setCount(product: IProduct, count: number) {
    const foundIndex = this.items.findIndex(item => item.product.id === product.id);
    if (foundIndex >= 0) {
      count === 0 ? this.removeItemAt(foundIndex) : this.items[foundIndex].count = count;
    } else if(count > 0) {
      this.items.push({ product, count });
    }
    this.items$.next(this.items);
    this.productsTotal$.next(this.calculateTotalValue());
  }

  empty(): void {
    this.items = [];
    this.items$.next(this.items);
    this.productsTotal$.next(this.calculateTotalValue());
  }

  hasItem(productID: number): boolean;
  hasItem(product: IProduct): boolean;

  hasItem(product: IProduct | number): boolean {
    return typeof product === 'number' ?
      this.items.some(el => el.product.id === product):
      this.items.some(el => el.product === product);
  }

  private calculateTotalValue(): number {
    return this.items.reduce<number>((runningTotal, cartEntry) => {
      return runningTotal + cartEntry.count * cartEntry.product.price;
    }, 0);
  }

  private removeItemAt(index: number): void {
    this.items.splice(index, 1);
  }
}
