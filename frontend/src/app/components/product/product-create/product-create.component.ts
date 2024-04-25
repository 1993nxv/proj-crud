
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit{

  constructor(
    private produtoService: ProductService,
    private route: Router
  ) { }

  ngOnInit(): void { }

  createProduct(): void {
    this.produtoService.showMessaage('Produto criado com sucesso!', 'msg-success');
  }

  cancel(): void {
    this.route.navigate(['/produtos']);
  }
}
