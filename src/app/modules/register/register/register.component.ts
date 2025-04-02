import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare var grecaptcha: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isFormSubmitted: boolean = false; 
  recaptchaToken: string = "";

  constructor(
    private router: Router,
    private api: UserService,
    private readonly fb: FormBuilder
  ) {
    this.registerForm = this.initForm();
  }

  passwordsMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsDontMatch: true };
  }

  ngAfterViewInit() {
    this.loadRecaptcha();
  }

  loadRecaptcha() {
    setTimeout(() => {
      grecaptcha.render('recaptcha-container', {
        sitekey: '6Lc_CQcrAAAAAK697voJJoKL8cIHuqSdEg_NyWJH',
        callback: (response: string) => this.resolvedCaptcha(response),
      });
    }, 500);
  }

  resolvedCaptcha(token: string) {
    this.recaptchaToken = token;
  }

  registerUser(): void {
    this.isFormSubmitted = true; 

    const user = {
      first_name: this.registerForm.get('firstName')?.value,
      last_name: this.registerForm.get('lastName')?.value,
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      recaptchaToken: this.recaptchaToken,
    };

    if (this.isFormSubmitted === true && this.registerForm.invalid || !this.recaptchaToken) {
      setTimeout(() => {
        this.isFormSubmitted = false; 
      }, 3000);
      return;

    } else {
      this.api.registerUser(user).subscribe(
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

  initForm(): FormGroup {
    return this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordsMatchValidator, 
      }
    );
  }
}
