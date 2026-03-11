import { Injectable, Inject, PLATFORM_ID, signal, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Usuario } from '../modelos/usuario';
import { Api } from './api';
import { Observable, of, throwError, firstValueFrom } from 'rxjs';
import { switchMap, tap, timeout } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { enviroment } from '../../enviroments/enviroment';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  public usuarioAutenticado = signal<Usuario | null>(null);
  private KEY = enviroment.secret;

  private cookieCargada = false;
  private primeraEjecucionEffect = true;

  constructor(
    private api: Api,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.cargarUsuarioDesdeCookie();

    effect(() => {
      const usuario = this.usuarioAutenticado();
      if (!isPlatformBrowser(this.platformId)) return;

      if (this.primeraEjecucionEffect) {
        this.primeraEjecucionEffect = false;
        return;
      }

      if (usuario) {
        const usuarioEncriptado = this.encriptar(JSON.stringify(usuario));
        const usuarioBase64 = btoa(usuarioEncriptado);
        document.cookie = `user=${usuarioBase64}; max-age=${60 * 60 * 24}; path=/`;
      } else {
        this.cookieService.delete('user');
      }
    });
  }

  async loginUsuario(email: string, password: string): Promise<Usuario> {
    try {
      const usuarios = await firstValueFrom(this.api.getUsuarios());
      const usuario = usuarios.find((u) => u.email === email && u.password === password);

      if (!usuario) {
        throw new Error('Credenciales incorrectas');
      }

      this.setUsuarioAutenticado(usuario);
      console.log('usuario autenticado:', this.getUsuarioAutenticado());

      return usuario;
    } catch (error) {
      console.error('Error login:', error);
      throw error;
    }
  }

  logout(): void {
    this.usuarioAutenticado.set(null);
    this.cookieCargada = false;
    this.primeraEjecucionEffect = true;
    this.cookieService.delete('user')
  }

  registrar(usuario: Usuario): Observable<Usuario> {
    return this.api.getUsuarios().pipe(
      switchMap((usuarios) => {
        if (usuarios.some((u) => u.email === usuario.email)) {
          throw throwError(() => new Error('El correo ya existe'));
        }
        return this.api.postUsuario(usuario).pipe(
          tap((usuarioCreado) => {
            this.usuarioAutenticado.set(usuarioCreado);
          }),
        );
      }),
    );
  }

  getUsuarioAutenticado(): Usuario | null {
    return this.usuarioAutenticado();
  }

  setUsuarioAutenticado(usuario: Usuario) {
    this.usuarioAutenticado.set(usuario);
  }

  private cargarUsuarioDesdeCookie() {
    if (this.cookieCargada || !isPlatformBrowser(this.platformId)) {
      return;
    }

    this.cookieCargada = true;

    const match = document.cookie.match(new RegExp('(^| )user=([^;]+)'));
    if (match) {
      try {
        const usuarioEncriptado = atob(match[2]);
        const usuarioJson = this.desencriptar(usuarioEncriptado);
        this.usuarioAutenticado.set(JSON.parse(usuarioJson));
      } catch (error) {
        console.log('Error al desencriptar cookie', error);
        this.usuarioAutenticado.set(null);
      }
    }
  }

  // auth.ts
async actualizarUsuario(usuario: Partial<Usuario> & { email: string }) {
  try {
    if (!usuario) {
      throw new Error('Usuario no existe o está vacío');
    }

    const usuarioActualizado = await firstValueFrom(this.api.putActualizarUsuario(usuario));
    
    if (!usuarioActualizado) {
      throw new Error('El backend no devolvió el usuario actualizado');
    }

    const usuarioConNuevaReferencia = { ...usuarioActualizado };
    this.setUsuarioAutenticado(usuarioConNuevaReferencia);

    console.log('✅ Usuario actualizado en signal:', this.usuarioAutenticado());
    
    return usuarioActualizado;

  } catch (error) {
    console.error('❌ Error actualizando usuario:', error);
    throw error;
  }
}

  estaLogueado(): boolean {
    return this.usuarioAutenticado() !== null;
  }
  forzarCargaDeCookie(): void {
    this.cookieCargada = false;
    this.cargarUsuarioDesdeCookie();
  }

  encriptar(valor: string): string {
    return AES.encrypt(valor, this.KEY).toString();
  }
  desencriptar(valor: string): string {
    const bytes = AES.decrypt(valor, this.KEY);
    return bytes.toString(Utf8);
  }
}
