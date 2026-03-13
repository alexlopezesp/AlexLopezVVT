import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavItem } from './navegacion/nav-item/nav-item';
import { OpcionesUsuario } from "./navegacion/opciones-usuario/opciones-usuario";
import { NavegacionService } from '../../servicios/navegacion-service';
import { Notificacion } from "../notificacion/notificacion";
import { MensajesService } from '../../servicios/mensajesService';
@Component({
  selector: 'app-header',
  imports: [CommonModule, NavItem, OpcionesUsuario, Notificacion],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit {
  constructor(protected navegacionSerevice:NavegacionService, public mensajesService: MensajesService){}
  @Input() titulo?:string;

  ngOnInit(): void {
    console.log();
    this.navegacionSerevice.cargarNavegacion();
  }
  
}
