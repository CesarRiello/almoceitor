import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PlacesComponent } from './components/places/places.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlaceDetailComponent } from './components/place-detail/place-detail.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'restaurantes', component: PlacesComponent },
  { path: 'restaurante/:slug', component: PlaceDetailComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
