import { ProductService } from './../product.service';
import { Component } from '@angular/core';
import { Product } from '../product.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from '../../dialog-confirmation/dialog-confirmation.component';

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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService.read().subscribe( 
      products => {
      this.products = products;
      });
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: 'Tem certeza que deseja remover o produto?',
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result){
        console.log('clicou sim')
        this.productService.delete(id).subscribe(
          product => {
            this.productService.showMessaage('Produto excluido com sucesso!')
          });
      }
    });
  }
}
