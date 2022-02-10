import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../lib/models/Product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product!: IProduct;
  productCount: number = 1;

  constructor(private cart: CartService) { }

  ngOnInit(): void {
  }

  //Could have made increment and decrement a single function
  //but I like this explicit functionality and hiding direct value access.
  incrementCount() {
    this.productCount++;
  }

  decrementCount() {
    if (this.productCount > 1)
      this.productCount--;
  }

  addToBasket() {
    this.cart.addTo(this.product, this.productCount);
  }



}
