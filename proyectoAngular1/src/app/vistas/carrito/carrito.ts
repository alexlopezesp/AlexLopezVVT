import { Component, computed, OnInit, signal } from '@angular/core';
import { CarritoService } from '../../servicios/carrito-service';
import { Auth } from '../../servicios/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
})
export class Carrito implements OnInit {
  lineas = computed(() => this.carrito.carrito()?.lineas ?? []);
  usuarioNoAutenticado = computed(() => !this.authService.getUsuarioAutenticado());

  constructor(
    private carrito: CarritoService,
    private authService: Auth,
    private router: Router,
  ) {}

  ngOnInit() {
    const usuario = this.authService.getUsuarioAutenticado();
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }
    this.carrito.cargarCarrito(usuario);
  }
}
