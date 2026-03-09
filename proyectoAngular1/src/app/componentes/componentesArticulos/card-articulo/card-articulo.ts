import { Component, Input, OnInit } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-card-articulo',
  templateUrl: './card-articulo.html',
  styleUrl: './card-articulo.css',
})
export class CardArticulo implements OnInit{
  @Input() articulo?: any;
  
  ngOnInit(): void {
    console.log(this.articulo);
  }

  comprarArticulo(articulo: any):void {
    console.log(`Comprando artículo: ${articulo.nombre}`);
  }
}
