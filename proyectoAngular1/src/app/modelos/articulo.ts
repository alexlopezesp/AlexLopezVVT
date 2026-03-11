import { Descuento } from "./descuento";

export interface Articulo {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    categoria: number;
    descuento?: Descuento;
    precioConDescuento?: number;
}
