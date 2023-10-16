import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/models/product';
import { ProductService } from 'src/app/core/services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService) {}
  products : Product[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
} 


