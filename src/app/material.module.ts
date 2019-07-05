import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
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
    ],
    exports: [
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatSidenavModule,
      MatToolbarModule,
      MatCardModule,
    ]
})

export class MaterialModule {}