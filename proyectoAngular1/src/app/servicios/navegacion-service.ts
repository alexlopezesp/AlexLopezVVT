import { Injectable, signal } from '@angular/core';
import { Menu } from '../modelos/menu';
import { Api } from './api';

@Injectable({
  providedIn: 'root',
})
export class NavegacionService {
  menu = signal<Menu[]>([]);
  
  constructor(private api:Api){};

  public cargarNavegacion(){
    this.api.getNavegacion().subscribe((dato:Menu[])=>{
      this.menu.set(dato);
    });
  }

}
