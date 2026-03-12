import { Component, computed, effect, OnInit } from '@angular/core';
import { Filtros } from '../filtros/filtros';
import { Auth } from '../../../../servicios/auth';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../../../servicios/carrito-service';

@Component({
  selector: 'app-opciones-usuario',
  imports: [Filtros, RouterLink],
  templateUrl: './opciones-usuario.html',
  styleUrls: ['./opciones-usuario.css'],
})
export class OpcionesUsuario implements OnInit {
  desplegable: boolean = false;

  constructor(
    private authService: Auth,
    private router: Router,
    private carritoService: CarritoService,
  ) {
    effect(()=>{
      
    })
  }
  cantidadCarrito = computed(() => this.carritoService.cantidadArticulos());
  usuarioAutenticado = computed(() => this.authService.getUsuarioAutenticado());
  sesionIniciada = computed(() => this.authService.estaLogueado());

  ngOnInit(): void {
    const usuario = this.authService.getUsuarioAutenticado();
    if (usuario) this.carritoService.cargarCarrito(usuario);
  }

  verCarrito() {
    console.log('Ver carrito');
    console.log('Cantidad del carrito:', this.carritoService.cantidadArticulos());
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
