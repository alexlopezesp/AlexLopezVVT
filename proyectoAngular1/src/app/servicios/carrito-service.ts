import { computed, Injectable, signal } from '@angular/core';
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
  private carritoEnProceso = false;

  constructor(
    private api: Api,
    private authService: Auth,
    private lineaCarritoService: LineaCarritoService,
  ) {}

  cantidadArticulos = computed(() => {
    return this.carrito()?.lineas?.length || 0;
  });

  public cargarCarrito(usuario: Usuario) {
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
  public crearCarrito(){
    const usuario = this.authService.getUsuarioAutenticado();
    
    if (!usuario?.id) {
      console.warn('Usuario no autenticado, no se puede crear carrito');
      return;
    }

    // Evitar múltiples llamadas simultáneas
    if (this.carritoEnProceso) {
      console.log('Carrito ya está en proceso de creación');
      return;
    }

    this.carritoEnProceso = true;

    // Primero intenta cargar el carrito existente
    this.api.getCarritoPorUsuario(usuario).subscribe({
      next: (carros) => {
        const carritoExistente = Array.isArray(carros) ? carros[0] : carros;
        
        if (carritoExistente) {
          // Si existe, usarlo
          this.carrito.set(carritoExistente);
          console.log('Carrito existente cargado:', carritoExistente);
        } else {
          // Si no existe, crear uno nuevo
          this.crearCarritoNuevo();
        }
        
        this.carritoEnProceso = false;
      },
      error: (err) => {
        console.error('Error al cargar carrito:', err);
        // Si hay error, intentar crear uno nuevo
        this.crearCarritoNuevo();
        this.carritoEnProceso = false;
      }
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
      error: (err) => console.error('Error al crear carrito:', err),
    });
  }
}
