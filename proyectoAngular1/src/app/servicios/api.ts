import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroments/enviroment';
import { filter, map, Observable, tap } from 'rxjs';
import { Articulo } from '../modelos/articulo';
import { Usuario } from '../modelos/usuario';
import { Menu } from '../modelos/menu';
import { Carrito } from '../modelos/carrito';
import { LineaCarrito } from '../modelos/linea-carrito';

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
        error: (err) => console.error('❌ Error en PUT:', err),
      }),
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
  getCarritoPorUsuario(usuario: Usuario): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`${this.API_URL}/carrito?usuarioId=${usuario.id}`);
  }
  getCarrito(): Observable<Carrito | null>{
    return this.http.get<Carrito[]>(`${this.API_URL}/carrito`).pipe(
      map(carritos => (carritos.length >0 ? carritos[0]:null))
    )
  }

  getCarritoID(): Observable<number>{
    return this.http.get<Carrito[]>(`${this.API_URL}/carrito`).pipe(
      filter(carritos => carritos.length>0),
      map(carritos => Number(carritos[0]?.id))
    )
  }
  postCrearCarrito(carrito: Carrito): Observable<Carrito> {
    return this.http.post<Carrito>(`${this.API_URL}/carrito`, carrito);
  }
  eliminarCarrito(){
    return this.http.delete(`${this.API_URL}/carrito/}`);
  }

  /*------ Lineas Carrito ------*/
  getLineasCarritoID(carritoID: string): Observable<LineaCarrito[]> {
    return this.http.get<LineaCarrito[]>(`${this.API_URL}/lineasCarrito?carritoId=${carritoID}`);
  }

  getLineasCarrito():Observable<LineaCarrito[]>{
    return this.http.get<LineaCarrito[]>(`${this.API_URL}/lineasCarrito`);
  }
  postLineasCarrito(linea: LineaCarrito): Observable<LineaCarrito> {
    return this.http.post<LineaCarrito>(`${this.API_URL}/lineasCarrito`, linea);
  }

  actualizarlineaCarrito(linea: Partial<LineaCarrito>): Observable<LineaCarrito> {
    console.log('Linea a la hora de actualizarlo:', linea);

    return this.http.put<LineaCarrito>(`${this.API_URL}/lineasCarrito/${linea.id}`, linea).pipe(
      tap({
        next: (res) => console.log('✅ PUT exitoso:', res),
        error: (err) => console.error('❌ Error en PUT:', err),
      }),
    );
  }

  eliminarLineaCarrito(lineaId: number) {
    return this.http.delete(`${this.API_URL}/lineasCarrito/${lineaId}`);
  }
}
