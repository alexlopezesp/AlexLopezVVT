import { Injectable, signal } from '@angular/core';
import { Mensaje } from '../modelos/mensaje';

export type TipoMensaje = 'info' | 'error';

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  mensajes = signal<Mensaje[]>([]);
  private contadorID = 0;

  agregarMensaje(texto: string, tipo: TipoMensaje = 'info', duracionMS = 5000) {
    const id = this.contadorID++;
    this.mensajes.update((m) => [...m, { texto, tipo, id }]);

    setTimeout(() => {
      this.mensajes.update((m) => m.filter((msg) => msg.id !== id));
    },duracionMS);
  }

  limpiarMensajes(){
    this.mensajes.set([])
  }
}
