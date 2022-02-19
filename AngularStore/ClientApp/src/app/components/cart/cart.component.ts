import { Component } from '@angular/core';
import { IProduct } from '../../lib/models/Product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {

  products$ = this.cart.entries$;
  totalValue$ = this.cart.productsTotal$;
  cartTotal = 0;

  constructor(private cart: CartService) { }

  removeItem(product: IProduct): void {
    this.cart.removeFrom(product.id);
  }

  changeItemCount(product: IProduct, count: string | number): void {
    this.cart.setCount(product, typeof(count) === "string" ? parseInt(count) : count);
  }

  placeOrder(): void {
    //TODO: Make cart service call endpoint and simulate an order,
    // -> route to order confirmation with order details from endpoint.
    // (generate an order Id, list details etc)
    alert('Thank you for ordering!');
    this.cart.empty();
  }

}
