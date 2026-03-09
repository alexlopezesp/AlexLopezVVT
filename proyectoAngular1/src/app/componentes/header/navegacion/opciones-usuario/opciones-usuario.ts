import { Component } from '@angular/core';
import { Filtros  } from "../filtros/filtros";
import { Auth } from '../../../../servicios/auth';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-opciones-usuario',
  imports: [Filtros, RouterLink],
  templateUrl: './opciones-usuario.html',
  styleUrl: './opciones-usuario.css',
})
export class OpcionesUsuario {

  constructor(private authService: Auth) {}

  get sesionIniciada(): boolean {
    return this.authService.estaLogueado();
  }
  get usuarioAutenticado() {
    return this.authService.getUsuarioAutenticado();
  }

  verCarrito(){
    console.log("Ver carrito");
  }
  verPerfil(){
    console.log("Ver perfil");
  }

  loginORegister(){
    console.log("Login o Register");
  }
}
