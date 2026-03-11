import { Injectable, signal } from '@angular/core';
import { Carrito } from '../modelos/carrito';
import { Api } from './api';
import { Usuario } from '../modelos/usuario';
import { LineaCarrito } from '../modelos/linea-carrito';
import { Articulo } from '../modelos/articulo';
import { Auth } from './auth';
import { LineaCarritoService } from './linea-carrito';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  carrito = signal<Carrito | null>(null);

  constructor(
    private api: Api,
    private authService: Auth,
    private lineaCarritoService: LineaCarritoService,
  ) {}

  public cargarCarrito(usuario: Usuario) {
    this.api.getCarritoPorUsuario(usuario).subscribe((car) => {
      this.carrito.set(car);
    });
  }

  public obtenerCantidadArticulosCarrito(): number {
    const car = this.carrito();
    return car?.lineas?.length || 0;
  }

  public anyadirLineaCarrito(articuloLinea: Articulo) {
    if (!this.carrito()) {
      this.carrito.set({
        id: Date.now(),
        usuario: this.authService?.getUsuarioAutenticado() || undefined,
        lineas: [],
        precioTotal: 0,
      });
    }

    const car = this.carrito();
    const lineas = car?.lineas ?? [];
    const lineaExistente = lineas.find((l) => l.articulo.id === articuloLinea.id);

    let linea: LineaCarrito;
    let comprobante: boolean;

    if (lineaExistente) {
      linea = {
        ...lineaExistente,
        cantidad: lineaExistente.cantidad + 1,
      };
      comprobante = false;
    } else {
      linea = {
        carritoId: car!.id,
        articulo: articuloLinea,
        cantidad: 1,
        comprado: false,
      };
      comprobante = true;
    }

    this.lineaCarritoService.anyadirLineaCarrito(linea, comprobante).subscribe({
      next: () => {
        const usuario = this.authService.getUsuarioAutenticado();
        if (usuario) {
          this.api.getCarritoPorUsuario(usuario).subscribe((carActualizado) => {
            const carrito = Array.isArray(carActualizado) ? carActualizado[0] : carActualizado;
            this.carrito.set(carrito ?? null);
            console.log('Carrito actualizado desde API:', carActualizado);
          });
        }
      },
      error: (err) => console.error('Error al añadir/actualizar línea:', err),
    });
  }

  private existeArticuloCarrito(articulo: Articulo) {
    const car = this.carrito();
    if (!car || !car.lineas) return false;
    return car.lineas.some((lin) => lin.articulo.id === articulo.id);
  }
}
