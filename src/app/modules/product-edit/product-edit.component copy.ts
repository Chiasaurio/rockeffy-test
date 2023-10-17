// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Product } from 'src/app/core/models/product';
// import { ProductService } from 'src/app/core/services/product.service';
// // import { CoreService } from '../core/core.service';
// // import { EmployeeService } from '../services/employee.service';
// @Component({
//   selector: 'app-product-edit',
//   templateUrl: './product-edit.component.html',
//   styleUrls: ['./product-edit.component.css']
// })
// export class ProductEditComponent {
//   constructor(
//     private _fb: FormBuilder,
//     private productService: ProductService,
//     private dialogRef: MatDialogRef<ProductEditComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: Product,
//     // private _coreService: CoreService
//   ) {
//     this.prodForm = this._fb.group({
//       id: '',
//       nombre: '',
//       descripcion: '',
//       stock: '',
//       imagen: '',
//       sku: '',
//       etiquetas: this._fb.array([]), // Initialize as a FormArray
//        nuevaEtiquetaValue:'',
//     });
  
// }
//   prodForm: FormGroup;
//   etiquetasList :Array<string> = [];
//   nuevaEtiqueta : boolean = false;

// ngOnInit(): void {
//   this.prodForm.patchValue(this.data);
//   this.etiquetasList = this.data.etiquetas;
//   this.initializeEtiquetasFormArray(this.data.etiquetas);
// }

// initializeEtiquetasFormArray(etiquetas: string[]) {
//   const etiquetasArray = this.prodForm.get('etiquetas') as FormArray;
//   etiquetas.forEach((etiqueta) => {
//     etiquetasArray.push(this._fb.control(etiqueta));
//   });
// }

// habilitarCampoEtiqueta(){
//   this.nuevaEtiqueta = true;
// }

// addEtiqueta() {
//   // Get the FormArray control for 'etiquetas'
//   const etiquetasControl = this.prodForm.get('etiquetas') as FormArray;

//   // Add the new value to the FormArray
//   etiquetasControl.push(this._fb.control(this.prodForm.get('nuevaEtiquetaValue')!.value));

//   // Clear the input field
//   this.prodForm.get('nuevaEtiquetaValue')!.setValue('');

//   // You can also update the etiquetasList to reflect the changes
//   this.etiquetasList = etiquetasControl.value;
// }

// onFormSubmit() {
//   if (this.prodForm.valid) {
//     if (this.data) {
//       this.productService
//         .updateProduct(this.prodForm.value)
//         .subscribe({
//           next: (val: any) => {
//             // this._coreService.openSnackBar('Employee detail updated!');
//             this.dialogRef.close(true);
//           },
//           error: (err: any) => {
//             console.error(err);
//           },
//         });
//     } else {
//       this.productService.addProduct(this.prodForm.value).subscribe({
//         next: (val: any) => {
//           // this._coreService.openSnackBar('Employee added successfully');
//           this.dialogRef.close(true);
//         },
//         error: (err: any) => {
//           console.error(err);
//         },
//       });
//     }
//   }
// }


// }
