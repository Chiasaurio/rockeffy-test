import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { Product } from '../../core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ShareDataProductsService } from 'src/app/core/services/share-data-products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private sharedDataService: ShareDataProductsService, public dialog: MatDialog) { }

  @Input() input?: string;

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'stock', 'descripcion', 'imagen', 'sku', 'etiquetas', 'action',];
  dataSource = new MatTableDataSource<Product>([]);
  searchText: string = '';

  ngOnInit(): void {
    this.sharedDataService.getProducts().subscribe((products) => {
      this.products = products;
      // Update the MatTableDataSource with the new products if needed
      this.dataSource = new MatTableDataSource<Product>(products);
    });

    // Initialize or fetch the products from the shared service
    this.getProducts();
  }

  updateFilter(searchText: string): void {
    this.searchText = searchText;
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.dataSource = new MatTableDataSource<Product>(products);
    });
  }

  delete(product: Product): void {
    this.products = this.products.filter(p => p !== product);
    this.productService.deleteProduct(product._id).subscribe();
  }

  openImage(data: Product) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '800px',
      width: '800px',
      data: data.imagen,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openAddEditProdForm() {
    const dialogRef = this.dialog.open(ProductEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProducts();
        }
      },
    });
  }

  openEditForm(data: Product) {
    console.log('data', data);
    const dialogRef = this.dialog.open(ProductEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.getProducts();
      },
    });
  }
}


@Component({
  selector: 'image-product-dialog',
  templateUrl: './image-product-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}