import { Injectable } from '@angular/core';
import { Api } from './api';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario'

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private api: Api) {}
  obtenerTodosUsuarios(): Observable<Usuario[]>{
    return this.api.getUsuarios() as Observable<Usuario[]>;
  }
  crearUsuario(usuario:Usuario){
    return this.api.postUsuario(usuario) ;
  }

}
