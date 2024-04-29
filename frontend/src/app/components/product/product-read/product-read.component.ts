import { ProductService } from './../product.service';
import { Component } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent {

  products!: Product[];
  displayedColumns = ['id', 'nome', 'preco', 'action'];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.read().subscribe( 
      products => {
      this.products = products;
      });
  }
}
