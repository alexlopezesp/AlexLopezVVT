import { TipoMensaje } from "../servicios/mensajesService";

export interface Mensaje {
    id:number,
    texto:string,
    tipo:TipoMensaje
}
