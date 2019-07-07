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
    ]
})

export class MaterialModule {}