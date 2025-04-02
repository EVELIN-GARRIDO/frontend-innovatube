import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
})
export class BusquedaComponent {
  searchForm: FormGroup;
  videos: any[] = [];
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private videoService: VideoService) {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}

  onSearch() {
    this.isLoading = true;
    const query = this.searchForm.get('query')?.value;

    this.videoService.searchVideos(query).subscribe({
      next: (data) => {
        this.videos = data.videos;
        this.isLoading = false;
      },
      error: (error) => {
        Swal.fire({
          html: `<p class="custom-title" style="margin-bottom: 0rem"><b>${error.message}</b></p>`,
          icon: 'info',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          customClass: {
            popup: 'popup-handle animate__animated animate__pulse',
            icon: 'custom-icon-size',
          },
        });
        this.isLoading = false;
      },
    });
  }

  addToFavorites(video: any) {
    const favoriteVideo = {
      id: video.id,
      title: video.title,
      channelTitle: video.channel,
      link: video.link,
      thumbnail: video.thumbnail,
    };

    this.videoService.savFavoriteVideo(favoriteVideo).subscribe(
      (response) => {
        if (response.status === 201) {
          Swal.fire({
            html: `<p class="custom-title" style="margin-bottom: 0rem"><b>${response.message}</b></p>`,
            icon: 'success',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            customClass: {
              popup: 'popup-handle animate__animated animate__pulse',
              icon: 'custom-icon-size',
            },
          });

        } else {
          Swal.fire({
            html: `<p class="custom-title" style="margin-bottom: 0rem"><b>${response.message}</b></p>`,
            icon: 'info',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            customClass: {
              popup: 'popup-handle animate__animated animate__heartBeat',
              icon: 'custom-icon-size',
            },
          });
        }
      },
      (error) => {
        Swal.fire({
          html: `<p class="custom-title" style="margin-bottom: 0rem"><b>${error.message}</b></p>`,
          icon: 'info',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          customClass: {
            popup: 'popup-handle animate__animated animate__pulse',
            icon: 'custom-icon-size',
          },
        });
      }
    );
  }
}
