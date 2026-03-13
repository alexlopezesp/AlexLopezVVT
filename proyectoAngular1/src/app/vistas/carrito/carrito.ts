import { Component, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../servicios/carrito-service';
import { Auth } from '../../servicios/auth';
import { Router } from '@angular/router';
import { LineaCarrito } from '../../modelos/linea-carrito';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
})
export class Carrito implements OnInit {
  lineas = computed(() => this.carritoService.carrito()?.lineas ?? []);
  usuarioNoAutenticado = computed(() => !this.authService.getUsuarioAutenticado());

  precioTotal = computed(() => {
    const lineas = this.carritoService.carrito()?.lineas ?? [];

    return lineas.reduce((total, linea) => {
      const precioUnitario = linea.articulo.precioConDescuento ?? linea.articulo.precio ?? 0;
      return total + precioUnitario * linea.cantidad;
    }, 0);
  });

  effectCarrito = effect(() => {
    const carro = this.carritoService.carrito();
    if (carro) console.log('Carrito cargado:', carro);
  });

  constructor(
    private carritoService: CarritoService,
    private authService: Auth,
    private router: Router,
  ) {}

  ngOnInit() {
    const usuario = this.authService.getUsuarioAutenticado();
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }
    this.carritoService.cargarCarrito();
    console.log();
  }
  incrementar(linea: LineaCarrito) {
    this.carritoService.anyadirLineaCarrito(linea.articulo!);
  }

  decrementar(linea: LineaCarrito) {
    console.log('disminuir');
    this.carritoService.quitarLineaCarrito(linea.articulo);
  }

  realizarCompra(){
    console.log("REALIZAR CO;PRA");
    alert("Compra realizada");
  }
}
