import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  constructor(private _snackBar: MatSnackBar) {}

  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}