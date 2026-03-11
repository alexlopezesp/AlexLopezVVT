import { Injectable } from '@angular/core';
import { Api } from './api';
import { Observable, firstValueFrom } from 'rxjs';
import { Usuario } from '../modelos/usuario';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private api: Api,
    private auth: Auth,
  ) {}
  obtenerTodosUsuarios(): Observable<Usuario[]> {
    return this.api.getUsuarios() as Observable<Usuario[]>;
  }

  async crearUsuario(usuario: Usuario): Promise<Usuario | null> {
    const payload = { ...usuario };
    delete payload.id;

    try {
      const usuarioExistente = await firstValueFrom(this.api.getUsuarioCorreo(usuario.email));

      if (usuarioExistente) {
        alert('El correo ya está registr ado');
        return null;
      }

      const usuarioCreado = await firstValueFrom(this.api.postUsuario(payload));
      usuarioCreado.imgPerfil = 'home.png';

      this.auth.setUsuarioAutenticado(usuarioCreado);

      console.log('Usuario creado:', usuarioCreado);

      return usuarioCreado;
    } catch (error) {
      console.error('Error creando usuario', error);
      return null;
    }
  }

}
