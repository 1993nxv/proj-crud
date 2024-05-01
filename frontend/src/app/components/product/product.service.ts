import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
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
    return this.httpClient.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
  
  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.httpClient.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: HttpErrorResponse): Observable<any> {
    this.msgService.openAlert(e.message, 'alert-danger');
    return EMPTY;
  }

}
