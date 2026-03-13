import { Injectable, signal } from '@angular/core';
import { Api } from './api';
import { Observable } from 'rxjs';
import { Articulo } from '../modelos/articulo';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  articulos = signal<Articulo[]>([]);
  
  constructor(private api: Api) {}

  public cargarArticulos(){
    this.api.getArticulos().subscribe((data: Articulo[])=>{
      this.articulos.set(data);
    });
  }
}
