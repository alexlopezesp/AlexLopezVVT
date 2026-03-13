import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../servicios/carrito-service';

@Component({
  selector: 'app-card-articulo',
  templateUrl: './card-articulo.html',
  styleUrl: './card-articulo.css',
  imports: [CommonModule],
})
export class CardArticulo implements OnInit {
  @Input() articulo?: any;

  constructor(private carritoService: CarritoService) {}
  
  ngOnInit(): void {
    console.log(this.articulo);
    console.log("Descueno articulo:", this.articulo.descuento);
  }

  comprarArticulo(articulo: any): void {
    console.log(`Comprando artículo: ${articulo.nombre}`);
    this.carritoService.anyadirLineaCarrito(articulo);
  }
}
