import { Injectable } from '@angular/core';
import { Api } from './api';
import { LineaCarrito } from '../modelos/linea-carrito';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LineaCarritoService {
  constructor(private api: Api) {}

  public anyadirLineaCarrito(linea: LineaCarrito, comprobante: boolean) {
    if (comprobante) {
      console.log('crearLinea', linea);
      return this.api.postLineasCarrito(linea);
    } else {
      console.log('actualizarLinea', linea);
      return this.api.actualizarlineaCarrito(linea);
    }
  }

  public getLineasCarrito(): Observable<LineaCarrito[]> {
    return this.api.getLineasCarrito();
  }

  public eliminarLineaCarrito(lineaId: number) {
    return this.api.eliminarLineaCarrito(lineaId);
  }
}
