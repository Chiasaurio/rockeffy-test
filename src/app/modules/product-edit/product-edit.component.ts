import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/core/models/product';
import { ProductService } from 'src/app/core/services/product.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  constructor(
    private _fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    // private _coreService: CoreService
  ) {
    this.prodForm = this._fb.group({
      _id: '',
      nombre: '',
      descripcion: '',
      stock: '',
      imagen: '',
      sku: '',
      etiquetas: [],
      nuevaEtiquetaValue:'',
    });
  
}
  prodForm: FormGroup;
  nuevaEtiqueta : boolean = false;

ngOnInit(): void {
  this.prodForm.patchValue(this.data);
}
getEtiquetas() {
  return  this.prodForm.get('etiquetas')?.value ?? [];
}


habilitarCampoEtiqueta(){
  this.nuevaEtiqueta = true;
}

addEtiqueta(){
  let nueva = this.prodForm.get('nuevaEtiquetaValue')!.value;
  let items = this.prodForm.get('etiquetas') as FormArray;
  this.prodForm.get('etiquetas')?.patchValue([...items.value ?? [], nueva]);
  this.prodForm.get('nuevaEtiquetaValue')!.setValue('');
}

onFormSubmit() {
  if (this.prodForm.valid) {
    if (this.data) {
      this.productService
        .updateProduct(this.prodForm.value)
        .subscribe({
          next: (val: any) => {
            // this._coreService.openSnackBar('Employee detail updated!');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    } else {
      this.productService.addProduct(this.prodForm.value).subscribe({
        next: (val: any) => {
          // this._coreService.openSnackBar('Employee added successfully');
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}


}
