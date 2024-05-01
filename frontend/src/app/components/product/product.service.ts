import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { MsgComponent } from '../msg/msg.component';
import { MsgService } from '../msg/msg.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/produtos";

  constructor(
    private snackbBar: MatSnackBar, 
    private httpClient: HttpClient,
    public dialog: MatDialog,
    public msgService: MsgService
  ) { }

  showMessaage(msg: string): void {
    this.snackbBar.open(msg, 'Ok', {
      duration: 300000,
      horizontalPosition: "right",
      verticalPosition: "top"
  });
  }

  openDialog(id: string, mensage: string): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: mensage,
    });

    return new Observable<boolean>(observer => {
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          observer.next(true);
        } else {
          observer.next(false); 
        }
        observer.complete();
      });
    });
  }

  read(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl);
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Product>(url);
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product);
  }
  
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.httpClient.put<Product>(url, product);
  }

  delete(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<Product>(url);
  }
}
