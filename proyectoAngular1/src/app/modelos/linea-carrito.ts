import { Articulo } from './articulo';

export interface LineaCarrito {
  id?: number;
  carritoId?: number | string ;
  articulo: Articulo;
  cantidad: number;
  comprado: boolean;
}
