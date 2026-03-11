import { Articulo } from "./articulo";
import { Descuento } from "./descuento";
import { ItemCarrito } from "./item-carrito";
import { Usuario } from "./usuario";

export interface Carrito {
    id: number;
    usuario: Usuario;
    items: ItemCarrito[];
}
