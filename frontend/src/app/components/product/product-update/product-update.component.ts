import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    id: null!,
    nome: '',
    preco: null!
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.productService.readById(id!).subscribe(
      product => {
        this.product = product;
      });

  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(
      product => {
        this.router.navigate(['/produtos']);
        this.productService.msgService.openAlert('Produto alterado com sucesso!', 'alert-success');
      });
  }

  cancel(): void {
    this.router.navigate(['/produtos']);
  }

}
