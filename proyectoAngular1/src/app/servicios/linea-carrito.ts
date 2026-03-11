import { Injectable } from '@angular/core';
import { Api } from './api';
import { LineaCarrito } from '../modelos/linea-carrito';
import { CarritoService } from './carrito-service';

@Injectable({
  providedIn: 'root',
})
export class LineaCarritoService {
  constructor(private api: Api) {}

  public anyadirLineaCarrito(linea: LineaCarrito, comprobante: boolean) {
    if (comprobante) {
      return this.api.postLineasCarrito(linea);
    }else{
      return this.api.actualizarlineaCarrito(linea);
    }
  }
}
