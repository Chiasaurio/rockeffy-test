import { Injectable } from '@angular/core';
import { PRODUCTS } from 'src/app/mocks/mock_products';
import { Product } from 'src/app/core/models/product';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private productsUrl = 'api/products';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getProducts(): Observable<Product[]> {
    /** GET products from the server */
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(_ => this.log('fetched products')),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  /** GET product by id. Will 404 if id not found */
  getProduct(id: string): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }

  private snackBar(message: string) {
    this.messageService.openSnackBar(`${message}`, 'Ok');
  }


  /** PUT: update the hero on the server */
  updateProduct(product: Product): Observable<any> {
    const url = `${this.productsUrl}/${product._id}`;
    console.log(product);
    return this.http.put(url, product, this.httpOptions).pipe(
      tap(_ => {
        this.log(`updated product id=${product._id}`);
        this.snackBar('Producto actualizado con exito');
      }),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  /** POST: add a new product to the server */
  addProduct(product: Product): Observable<Product> {
    const { _id, ...productWithoutID } = product;
    return this.http.post<Product>(this.productsUrl, productWithoutID, this.httpOptions).pipe(
      tap((newProduct: Product) => {
        this.log(`added product w/ id=${newProduct._id}`);
        this.snackBar('Producto registrado con exito');
      }),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  /** DELETE: delete the product from the server */
  deleteProduct(id: string): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(_ => {
        this.log(`deleted product id=${id}`);
        this.snackBar('Producto eliminado con exito');
      }),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  /* GET products whose name contains search term */
  searchProducts(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found products matching "${term}"`) :
        this.log(`no products matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
