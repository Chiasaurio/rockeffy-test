import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    MatFormFieldModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class MaterialModule {}