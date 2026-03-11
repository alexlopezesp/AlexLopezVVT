import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router,RouterModule } from '@angular/router';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuarioService';
import { Auth } from '../../servicios/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  protected correo!: string;
  protected password!: string;
  protected nombre!: string;
  protected apellidos!: string;
  protected confirmacionPassword!: string;

  formulario!: FormGroup;
  private fb = new FormBuilder();
  constructor(protected usuarioService: UsuarioService,protected auth:Auth, private router: Router) {}

  ngOnInit(): void {
    this.formulario = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmacionPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.passwordIgualValidator },
    );
  }

 async iniciarSesion() {
    if (this.formulario.valid) {
      const usuario: Usuario = {
        nombre: this.formulario.value.nombre,
        apellidos: this.formulario.value.apellidos,
        email: this.formulario.value.email,
        password: this.formulario.value.password,
      };

      await this.usuarioService.crearUsuario(usuario);
      console.log('Usuario autenticado', this.auth.getUsuarioAutenticado());
      this.router.navigate(['/'])
    }
  }
  passwordIgualValidator(control: FormGroup) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmacionPassword')?.value;
    if (!password || !confirmPassword) return null;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
