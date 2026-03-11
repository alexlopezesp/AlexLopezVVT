import { Injectable, signal } from '@angular/core';
import { Carrito } from '../modelos/carrito';
import { Api } from './api';
import { Usuario } from '../modelos/usuario';
import { ItemCarrito } from './item-carrito';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  carrito = signal<Carrito | null>(null);

  constructor(private api: Api) {}

  public cargarCarrito(usuario: Usuario) {
    this.api.getCarritoPorUsuario(usuario).subscribe((car) => {
      this.carrito.set(car);
    });
  }

  public obtenerCantidadArticulosCarrito():number {
    console.log('Carrito cantidad:', this.carrito);
    const car = this.carrito();
    console.log('Carrito cantidad parte 2:', car);
    return car?.items?.length || 0;
  }

  public anyadirLineaCarrito(linea:ItemCarrito){
    this.api.postLineasCarrito(linea);
    console.log(this.carrito());

  }
}
