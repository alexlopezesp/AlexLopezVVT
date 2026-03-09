import { Component, OnInit } from '@angular/core';
import datos from '../../../assets/json/datos.json';
import { CardArticulo } from '../../componentes/componentesArticulos/card-articulo/card-articulo';
import { CommonModule } from '@angular/common';
import { Articulo } from '../../modelos/articulo';
import { ArticuloService } from '../../servicios/articuloService';

@Component({
  selector: 'app-articulos',
  imports: [CardArticulo, CommonModule],
  templateUrl: './articulos.html',
  styleUrls: ['./articulos.css'],
})
export class Articulos implements OnInit {
  constructor(protected articuloService: ArticuloService){}


  //protected articulos: Array<Articulo> = datos.articulos;

  ngOnInit(): void {
    console.log(this.articuloService);
    this.articuloService.cargarArticulos()
  }
}
