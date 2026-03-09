import { Injectable } from '@angular/core';
import { Api } from './api';
import { Observable } from 'rxjs';
import { Articulo } from '../modelos/articulo';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  articulos: Articulo[] = [];
  constructor(private api: Api) {}

  public cargarArticulos(){
    this.api.getArticulos().subscribe((data: Articulo[])=>{
      this.articulos=data;
      console.log("Obtener todos los datos de articulo:"+this.articulos)
    });
  }
}
