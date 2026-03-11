import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { map, Observable, tap } from 'rxjs';
import { Articulo } from '../modelos/articulo';
import { Usuario } from '../modelos/usuario';
import { Menu } from '../modelos/menu';
import { Carrito } from '../modelos/carrito';
import { ItemCarrito } from './item-carrito';

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

  putActualizarUsuario(usuario: Partial<Usuario>): Observable<Usuario> {
  console.log('Usuario a la hora de actualizarlo:', usuario);
  
  return this.http.put<Usuario>(`${this.API_URL}/usuarios/${usuario.id}`, usuario).pipe(
    tap({
      next: (res) => console.log('✅ PUT exitoso:', res),
      error: (err) => console.error('❌ Error en PUT:', err)
    })
  );
}

  postUsuario(user: Usuario): Observable<Usuario> {
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

    /*------ Carrito ------*/
    getCarritoPorUsuario(usuario:Usuario):Observable<Carrito>{
      return this.http.get<Carrito>(`${this.API_URL}/carrito`)

    }

    /*------ Lineas Carrito ------*/
    getLineasCarrito(carritoID:number):Observable<ItemCarrito[]>{
      return this.http.get<ItemCarrito[]>(`${this.API_URL}/itemCarrito?carritoId=${carritoID}`)
    }
    postLineasCarrito(linea:ItemCarrito):Observable<ItemCarrito>{
      return this.http.post<ItemCarrito>(`${this.API_URL}/itemCarrito`,linea)
    }

}
