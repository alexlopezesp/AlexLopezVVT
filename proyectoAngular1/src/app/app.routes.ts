import { Routes } from '@angular/router';
import { Home } from './vistas/home/home';
import { Articulos } from './vistas/articulos/articulos'
import { SobreNosotros } from './vistas/sobre-nosotros/sobre-nosotros';
import { Contacto } from './vistas/contacto/contacto';
import { Login } from './vistas/login/login';
import { Register } from './vistas/register/register';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'articulos',
        component: Articulos
    },
    {
        path: 'contacto',
        component: Contacto
    },
    {
        path: 'sobre nosotros',
        component: SobreNosotros
    },
    {
        path: 'login',
        component: Login
    },
        {
        path: 'registro',
        component: Register
    },
    {
        path: '**',
        redirectTo: ''
    }
];
