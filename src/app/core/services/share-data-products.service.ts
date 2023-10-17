import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShareDataProductsService {
  private products$!: Observable<Product[]>;

  setProducts(products$: Observable<Product[]>): void {
    this.products$ = products$;
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }
}
