// login.ts
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../servicios/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  protected correo!: string;
  protected password!: string;
  constructor(private authService: Auth, private router: Router) {}
  formulario!: FormGroup;

  private fb = new FormBuilder();

  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ],
      ],
    });
  }

   async iniciarSesion(){
    if(!this.formulario.valid) return;
    try {
      const usuario = await this.authService.loginUsuario(
        this.formulario.value.email, this.formulario.value.password
      );
      console.log('Usuario logueado:', usuario);
      this.router.navigate(['/']);
      
    } catch (error:any) {
      console.log('Error al iniciar sesión: ', error.message);
      alert(error.message);
    }
   }
}
