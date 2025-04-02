import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterModule } from './modules/register/register.module';
import { LoginModule } from './modules/login/login.module';
import { VideoModule } from './modules/video/video.module';
import { BusquedaModule } from './modules/video/busqueda/busqueda.module';
import { FavoriteModule } from './modules/video/favorite/favorite.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RegisterModule,
    LoginModule,
    VideoModule,
    BusquedaModule,
    FavoriteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
