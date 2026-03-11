import { Component, OnInit } from '@angular/core';
import { Auth } from '../../servicios/auth';
import { Usuario } from '../../modelos/usuario';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  usuario: Usuario | null = null;

  protected email!: string;
  protected nombre!: string;
  protected apellidos!: string;
  protected nombreImagen!:string;

  imageActual: string | ArrayBuffer | null = null;

  formulario!: FormGroup;
  private fb = new FormBuilder();

  constructor(protected auth: Auth) {}

  ngOnInit() {
    this.usuario = this.auth.getUsuarioAutenticado();
    this.imageActual = this.usuario?.imgPerfil ?? null
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      email: ['', [Validators.required, Validators.email]],
      imagen: [null],
    });
  }

  ficheroSeleccionado(event: any) {
    const fichero: File = event?.target.files[0];

    if (fichero) {
      this.formulario.patchValue({ imagen: fichero });
      const lector = new FileReader();
      lector.onload = () => {
        this.imageActual = lector.result;
      };
      lector.readAsDataURL(fichero);
    }
    this.nombreImagen = fichero.name;
  }

  async actualizarPerfil() {
    if (!this.usuario) return;
    this.usuario.nombre = this.formulario.value.nombre;
    this.usuario.apellidos = this.formulario.value.apellidos;
    this.usuario.email = this.formulario.value.email;
    if (this.formulario.value.imagen) this.usuario.imgPerfil = this.nombreImagen;

    await this.auth.actualizarUsuario(this.usuario);
    console.log('Perfil actualizado');
  }
}
