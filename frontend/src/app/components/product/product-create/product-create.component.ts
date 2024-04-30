
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit{

  product: Product = {
    nome: '',
    preco: null!
  }

  constructor(
    private produtoService: ProductService,
    private route: Router
  ) { }

  ngOnInit(): void { }

  createProduct(): void {
    this.produtoService.create(this.product)
          .subscribe(() => {
            this.route.navigate(['/produtos']);
            this.produtoService.msgService.openAlert('Produto criado com sucesso!', 'alert-success');
          });
  }

  cancel(): void {
    this.route.navigate(['/produtos']);
  }
}
