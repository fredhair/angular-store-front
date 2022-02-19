import { Component, OnInit, Inject } from '@angular/core';
import { IProduct } from '../../lib/models/Product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: IProduct[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  onProductSearched(searchTerm: string): void {
    if (searchTerm.trim() === "") {
      this.getAllProducts();
    } else {
      this.productsService.SearchProducts(searchTerm).subscribe((productSubset: IProduct[]) => { console.log(productSubset); this.products = productSubset; });
    }
  }

  private getAllProducts(): void {
    this.productsService.AllProducts().subscribe((allProducts: IProduct[]) => this.products = allProducts);
  }

}
