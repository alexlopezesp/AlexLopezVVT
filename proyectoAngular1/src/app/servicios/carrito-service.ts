import { computed, Injectable, signal } from '@angular/core';
import { Carrito } from '../modelos/carrito';
import { Api } from './api';
import { Usuario } from '../modelos/usuario';
import { LineaCarrito } from '../modelos/linea-carrito';
import { Articulo } from '../modelos/articulo';
import { LineaCarritoService } from './linea-carrito';
import { map, switchMap } from 'rxjs';
import { MensajesService } from './mensajesService';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  carrito = signal<Carrito | null>(null);
  private carritoEnProceso = false;

  constructor(
    private api: Api,
    private lineaCarritoService: LineaCarritoService,
    private mensajesService: MensajesService,
  ) {}

  cantidadArticulos = computed(() => {
    return this.carrito()?.lineas?.length || 0;
  });

  public cargarCarrito() {
    this.api.getCarrito().subscribe((carro) => {
      if (!carro) {
        this.carrito.set(null);
        return;
      }

      this.carrito.set({ ...carro, lineas: [] });

      this.api.getLineasCarritoID(String(carro.id)).subscribe((lineas) => {
        this.carrito.update((c) => (c ? { ...c, lineas } : null));
        console.log('Carrito Cargado con las lineas:', this.carrito());
      });
    });
  }

  public cargarCarritoUsuario(usuario: Usuario) {
    this.api.getCarritoPorUsuario(usuario).subscribe((carros) => {
      const carrito = Array.isArray(carros) ? carros[0] : carros;
      this.carrito.set(carrito || null);
      console.log('Carrito cargado:', carrito);
    });
  }

  public obtenerCantidadArticulosCarrito(): number {
    const car = this.carrito();
    return car?.lineas?.length || 0;
  }
  public crearCarrito() {
    if (this.carritoEnProceso) {
      console.log('Carrito ya está en proceso de creación');
      return;
    }

    this.carritoEnProceso = true;

    this.api.getCarrito().subscribe({
      next: (carros) => {
        const carritoExistente = Array.isArray(carros) ? carros[0] : carros;

        if (carritoExistente) {
          this.carrito.set(carritoExistente);
          console.log('Carrito existente cargado:', carritoExistente);
        } else {
          this.crearCarritoNuevo();
        }

        this.carritoEnProceso = false;
      },
      error: (err) => {
        this.mensajesService.agregarMensaje(`Error al cargar carrito: ${err}`, 'error');
        this.crearCarritoNuevo();
        this.carritoEnProceso = false;
      },
    });
  }

  private crearCarritoNuevo() {
    const nuevoCarrito: Carrito = {
      lineas: [],
      precioTotal: 0,
    };

    this.api.postCrearCarrito(nuevoCarrito).subscribe({
      next: (carritoCreado) => {
        this.carrito.set(carritoCreado);
        console.log('Carrito creado en DB:', carritoCreado);
      },
      error: (err) =>
        this.mensajesService.agregarMensaje(`Error al cargar carrito: ${err}`, 'error'),
    });
  }

  public anyadirLineaCarrito(articulo: Articulo) {
    this.api
      .getCarritoID()
      .pipe(
        switchMap((idCarrito) =>
          this.lineaCarritoService.getLineasCarrito().pipe(
            map((lineas) => {
              const lineaExistente = lineas.find((l) => l.articulo.id === articulo.id);
              return { idCarrito, lineaExistente };
            }),
          ),
        ),
      )
      .subscribe(({ idCarrito, lineaExistente }) => {
        if (lineaExistente) {
          // Incrementar cantidad
          const lineaActualizada: LineaCarrito = {
            ...lineaExistente,
            cantidad: lineaExistente.cantidad + 1,
          };

          this.lineaCarritoService.anyadirLineaCarrito(lineaActualizada, false).subscribe(() => {
            // ✅ Actualizar el signal para que la UI se refresque
            this.carrito.update((c) => {
              if (!c?.lineas) return c;

              return {
                ...c,
                lineas: c.lineas.map((l) => (l.id === lineaExistente.id ? lineaActualizada : l)),
              };
            });

            this.mensajesService.agregarMensaje('Cantidad del artículo actualizada en el carrito');
          });
        } else {
          const nuevaLinea: LineaCarrito = {
            carritoId: idCarrito,
            articulo: articulo,
            cantidad: 1,
            comprado: false,
          };

          this.lineaCarritoService
            .anyadirLineaCarrito(nuevaLinea, true)
            .subscribe((lineaCreada) => {
              this.carrito.update((c) => {
                if (!c) return c;

                return {
                  ...c,
                  lineas: [...(c.lineas ?? []), lineaCreada],
                };
              });

              this.mensajesService.agregarMensaje('Artículo agregado al carrito');
            });
        }
      });

    console.log('mensajes', this.mensajesService.mensajes());
  }

  public quitarLineaCarrito(articulo: Articulo) {
    this.api
      .getCarritoID()
      .pipe(
        switchMap((idCarrito) =>
          this.lineaCarritoService.getLineasCarrito().pipe(
            map((lineas) => {
              const lineaExistente = lineas.find((l) => l.articulo.id === articulo.id);
              return { idCarrito, lineaExistente };
            }),
          ),
        ),
      )
      .subscribe(({ idCarrito, lineaExistente }) => {
        if (!lineaExistente || lineaExistente.id === undefined) return; // Validación de id

        if (lineaExistente.cantidad > 1) {
          const lineaActualizada: LineaCarrito = {
            ...lineaExistente,
            cantidad: lineaExistente.cantidad - 1,
          };
          this.lineaCarritoService.anyadirLineaCarrito(lineaActualizada, false).subscribe(() => {
            this.carrito.update((c) => {
              if (!c?.lineas) return c;
              return {
                ...c,
                lineas: c.lineas.map((l) => (l.id === lineaExistente.id ? lineaActualizada : l)),
              };
            });
            this.mensajesService.agregarMensaje('Cantidad del artículo reducida en el carrito');
          });
        } else {
          this.lineaCarritoService.eliminarLineaCarrito(lineaExistente.id).subscribe(() => {
            this.carrito.update((c) => {
              if (!c?.lineas) return c;
              return {
                ...c,
                lineas: c.lineas.filter((l) => l.id !== lineaExistente.id),
              };
            });
            this.mensajesService.agregarMensaje('Artículo eliminado del carrito');
          });
        }
      });
  }
}
