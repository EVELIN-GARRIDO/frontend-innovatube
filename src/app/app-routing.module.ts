import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { VideoComponent } from './modules/video/video.component';
import { PanelComponent } from './modules/panel/panel.component';
import { BusquedaComponent } from './modules/video/busqueda/busqueda.component';
import { AuthGuard } from './auth.guard';
import { FavoriteComponent } from './modules/video/favorite/favorite.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'panel', component: PanelComponent, canActivate: [AuthGuard] },
  { path: 'panel/video', component: VideoComponent, canActivate: [AuthGuard] },
  { path: 'panel/video/search', component: BusquedaComponent, canActivate: [AuthGuard] },
  { path: 'panel/video/favorite', component: FavoriteComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
