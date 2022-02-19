import { Component } from '@angular/core';
import { IProduct } from '../../lib/models/Product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
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

}
