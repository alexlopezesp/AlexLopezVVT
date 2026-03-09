// login.ts
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '../../servicios/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  protected correo!: string;
  protected password!: string;
  constructor(private authService: Auth) {}
  formulario!: FormGroup;

  private fb = new FormBuilder();

  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          /*Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':",.<>\/?\\|`~-]).{8,}$/,
          ),*/
        ],
      ],
    });
  }

  iniciarSesion() {
    if (this.formulario.valid) {
      this.correo=this.formulario.value.email;
      this.password = this.formulario.value.password;
      this.authService.login(this.correo, this.password);
    }
  }
}
