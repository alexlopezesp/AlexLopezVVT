import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import data from '../../assets/json/datos.json';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private usuarioAutenticado: Usuario | null = null;

  private usuarios: Array<Usuario> = data.usuarios;

  constructor() {}

  login(email: string, password: string): void {
    const usuario = this.usuarios.find((u) => u.email === email && u.password === password);
    if (usuario) {
      this.usuarioAutenticado = usuario;
    } else {
      throw new Error('Credenciales inválidas');
    }
  }
  logout(): void {
    this.usuarioAutenticado = null;
  }
  registrar(nombre: string, apellidos: string, email: string, password: string): void {
    const nuevoUsuario: Usuario = {
      id: this.usuarios.length + 1,
      nombre,
      apellidos,
      email,
      password,
    };
    this.usuarios.push(nuevoUsuario);
    this.usuarioAutenticado = nuevoUsuario;
  }
  getUsuarioAutenticado(): Usuario | null {
    return this.usuarioAutenticado;
  }
  estaLogueado(): boolean {
    return this.usuarioAutenticado !== null;
  }

}
