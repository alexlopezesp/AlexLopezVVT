import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Header } from './componentes/header/header';
import { Footer } from './componentes/footer/footer';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected title = 'Proyecto Angular';

  constructor(private router: Router) {}

  get comprobanteRegistroLogin(): boolean {
    return !this.router.url.includes('login') && !this.router.url.includes('registro');
  }
}
