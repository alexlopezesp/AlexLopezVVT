import { Routes } from '@angular/router';
import { Home } from './vistas/home/home';
import { Articulos } from './vistas/articulos/articulos'
import { SobreNosotros } from './vistas/sobre-nosotros/sobre-nosotros';
import { Contacto } from './vistas/contacto/contacto';

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
        path: '**',
        redirectTo: ''
    }
];
