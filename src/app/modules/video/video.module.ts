import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PanelModule } from '../panel/panel.module';
import { VideoComponent } from './video.component';

@NgModule({
  declarations: [
    VideoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PanelModule
  ],
  exports: [
    VideoComponent,
  ]
})
export class VideoModule { }
