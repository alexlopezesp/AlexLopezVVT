import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuarioService';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
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
  constructor(protected usuarioService: UsuarioService) {}

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

  iniciarSesion() {
    if (this.formulario.valid) {
      const usuario: Usuario = {
        nombre: this.formulario.value.nombre,
        apellidos: this.formulario.value.apellidos,
        email: this.formulario.value.email,
        password: this.formulario.value.password,
      };
      if (usuario != null) {
        this.usuarioService.crearUsuario(usuario);
      }
    }
  }
  passwordIgualValidator(control: FormGroup) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmacionPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
