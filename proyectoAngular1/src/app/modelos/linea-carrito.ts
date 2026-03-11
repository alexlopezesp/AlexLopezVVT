import { Articulo } from './articulo';

export interface LineaCarrito {
  id?: number;
  carritoId?: number;
  articulo: Articulo;
  cantidad: number;
  comprado: boolean;
}
