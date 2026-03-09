import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { map, Observable } from 'rxjs';
import { Articulo } from '../modelos/articulo';
import { Usuario } from '../modelos/usuario';
import { NavegacionService } from './navegacion-service';
import { get } from 'http';
import { Menu } from '../modelos/menu';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private API_URL = enviroment.apiUrl;
  constructor(private http: HttpClient) {}

  /*------ Usuarios ------*/
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API_URL}/usuarios`);
  }
  getUsuarioCorreo(correo: string): Observable<Usuario | null> {
    return this.http
      .get<Usuario[]>(`${this.API_URL}/usuarios?correo=${correo}`)
      .pipe(map((usuarios) => (usuarios.length > 0 ? usuarios[0] : null)));
  }
  postUsuario(user:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.API_URL}/usuarios`, user);
  }


  /*------ Articulos ------*/

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.API_URL}/articulos`);
  }

  /*------ Navegación ------*/
  getNavegacion(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.API_URL}/navegacion`);
  }
}
