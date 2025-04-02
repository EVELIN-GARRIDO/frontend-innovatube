import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  useEmail: boolean = true;
  isFormSubmitted: boolean = false;

  constructor(
    private router: Router,
    private api: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  toggleLoginType(): void {
    this.useEmail = !this.useEmail;
  }

  loginUser(): void {
    this.isFormSubmitted = true;

    if (this.loginForm.invalid) {
      setTimeout(() => {
        this.isFormSubmitted = false;
      }, 3000);
      return;
    }

    const user = {
      usernameOrEmail: this.loginForm.get('usernameOrEmail')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.api.loginUser(user).subscribe(
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

          sessionStorage.setItem('token', response.token);

          this.router.navigate(['/login']);

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
          icon: 'success',
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
