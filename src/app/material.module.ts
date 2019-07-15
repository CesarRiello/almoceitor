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
    ]
})

export class MaterialModule {}
