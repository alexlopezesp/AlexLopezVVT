import { Articulo } from "./articulo";
import { Descuento } from "./descuento";
import { LineaCarrito } from "./linea-carrito";
import { Usuario } from "./usuario";

export interface Carrito {
    id: number;
    usuario?: Usuario;
    lineas: LineaCarrito[];
    precioTotal:number
}
