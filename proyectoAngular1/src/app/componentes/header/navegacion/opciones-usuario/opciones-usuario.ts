import { Component, computed, OnInit } from '@angular/core';
import { Filtros } from '../filtros/filtros';
import { Auth } from '../../../../servicios/auth';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../../../servicios/carrito-service';

@Component({
  selector: 'app-opciones-usuario',
  imports: [Filtros, RouterLink],
  templateUrl: './opciones-usuario.html',
  styleUrl: './opciones-usuario.css',
})
export class OpcionesUsuario implements OnInit{
  desplegable: boolean = false;

  constructor(
    private authService: Auth,
    private router: Router,
    private carritoService: CarritoService,
  ) {}
  ngOnInit(): void {
    const usuario= this.authService.getUsuarioAutenticado();
    if(usuario) this.carritoService.cargarCarrito(usuario);
  }

  usuarioAutenticado = computed(() => this.authService.getUsuarioAutenticado());
  sesionIniciada = computed(() => this.authService.estaLogueado());
  cantidadCarrito = computed(() => {
    const car = this.carritoService.carrito();
    return car?.lineas?.length || 0;
  });

  verCarrito() {
    console.log('Ver carrito');
    console.log('Cantidad del carrito:', this.cantidadCarrito());
  }

  verDesplegable() {
    console.log('Ver perfil, desplegable:', this.desplegable);
    this.desplegable = !this.desplegable;
  }

  loginORegister() {
    console.log('Login o Register');
  }
  desconectar() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
