import { Component, Input } from '@angular/core';
import  datos from '../../../assets/json/datos.json';
import { CommonModule } from '@angular/common';
import { NavItem } from './navegacion/nav-item/nav-item';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NavItem ],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  @Input() titulo?:string;
  protected navegacion = datos.navegacion;

}
