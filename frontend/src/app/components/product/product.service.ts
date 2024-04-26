import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/produtos";

  constructor(private snackbBar: MatSnackBar, private httpClient: HttpClient) { }

  showMessaage(msg: string, color: string): void {
    this.snackbBar.open(msg, 'Ok', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
  });
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product);
  }
  
}
