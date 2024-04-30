import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component } from '@angular/core';
import { Product } from '../product.model';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent {

  products!: Product[];
  displayedColumns = ['id', 'nome', 'preco', 'action'];

  constructor(
    private productService: ProductService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.updteTableProducts();
  }

  openDialogDeleteProduct(id: string): void {
    this.productService.openDialog(id, 'Tem certeza que deseja remover o produto?')
            .subscribe(result => {
              if(result){
                this.productService.delete(id).subscribe(product => {
                  this.productService.msgService.openAlert('Produto excluido com sucesso!', 'alert-warning');
                  this.updteTableProducts();
                });
              }
            });
  }

  updteTableProducts(): void {
    this.productService.read().subscribe( 
      products => {
      this.products = products;
    });
  }
}
