
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
    nome: 'Produto de Teste',
    preco: 125.38
  }

  constructor(
    private produtoService: ProductService,
    private route: Router
  ) { }

  ngOnInit(): void { }

  createProduct(): void {
    this.produtoService.create(this.product)
          .subscribe(() => {
            this.produtoService.showMessaage('Produto criado com sucesso!', 'msg-success');
            this.route.navigate(['/produtos']);
          });
    
  }

  cancel(): void {
    this.route.navigate(['/produtos']);
  }
}
