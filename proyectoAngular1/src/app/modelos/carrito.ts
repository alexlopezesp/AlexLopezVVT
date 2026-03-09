import { Articulo } from "./articulo";
import { Descuento } from "./descuento";

export interface Carrito {
    id: number;
    articulo: Articulo;
    cantidad: number;
    precioTotal: number;
    descuento: Descuento;


}
