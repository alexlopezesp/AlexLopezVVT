import { Component, Input, OnInit } from '@angular/core';
import  datos from '../../../assets/json/datos.json';
import { CommonModule } from '@angular/common';
import { NavItem } from './navegacion/nav-item/nav-item';
import { Menu } from '../../modelos/menu';
import { OpcionesUsuario } from "./navegacion/opciones-usuario/opciones-usuario";
import { NavegacionService } from '../../servicios/navegacion-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NavItem, OpcionesUsuario],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit {
  constructor(protected navegacionSerevice:NavegacionService){}
  @Input() titulo?:string;

  ngOnInit(): void {
    console.log();
    this.navegacionSerevice.cargarNavegacion();
  }
  
}
