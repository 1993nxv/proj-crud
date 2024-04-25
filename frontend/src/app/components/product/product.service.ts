import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private snackbBar: MatSnackBar) { }

  showMessaage(msg: string, color: string): void {
    this.snackbBar.open(msg, 'Ok', {
      duration: 30000,
      horizontalPosition: "right",
      verticalPosition: "top"
  })
  }
  
}
