import { Articulo } from "./articulo";
import { Descuento } from "./descuento";

export interface ItemCarrito {
    id:number;
    carritoId:number;
    articulo:Articulo;
    cantidad:number;
    descuento?:Descuento;
    comprado:boolean;
}
