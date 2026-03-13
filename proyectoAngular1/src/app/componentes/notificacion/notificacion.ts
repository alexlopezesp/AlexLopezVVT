import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensajesService } from '../../servicios/mensajesService';
import { Mensaje } from '../../modelos/mensaje';


@Component({
  selector: 'app-notificacion',
  imports: [CommonModule],
  templateUrl: './notificacion.html',
  styleUrls: ['./notificacion.css'],
})
export class Notificacion {
  constructor(public mensajesService: MensajesService) {}

  get mensajes(): Mensaje[]{
    return this.mensajesService.mensajes();
  }

  eliminarMensaje(id: number) {
    this.mensajesService.mensajes.update((m) => m.filter((msg) => msg.id !== id));
  }
}
