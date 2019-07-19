import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule,
  } from '@angular/material';

  @NgModule({
    imports: [
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatSidenavModule,
      MatToolbarModule,
      MatCardModule,
      MatSelectModule,
      MatListModule,
      MatDialogModule,
    ],
    exports: [
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatSidenavModule,
      MatToolbarModule,
      MatCardModule,
      MatSelectModule,
      MatListModule,
      MatDialogModule,
    ]
})

export class MaterialModule {}
