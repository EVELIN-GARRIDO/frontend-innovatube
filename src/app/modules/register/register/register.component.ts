import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isFormSubmitted: boolean = false; 

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

  registerUser(): void {
    this.isFormSubmitted = true; 

    const user = {
      first_name: this.registerForm.get('firstName')?.value,
      last_name: this.registerForm.get('lastName')?.value,
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    };

    if (this.isFormSubmitted === true && this.registerForm.invalid) {
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
            html: `<p class="custom-title">${error.message}</p>`,
            confirmButtonText: 'Aceptar',
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
