import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { Auth } from '../../servicios/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('Login Component', () => {
  let fixture: ComponentFixture<Login>;
  let component: Login;
  let authService: Auth;

  const authMock = {
    loginUsuario: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, Login],
      providers: [{ provide: Auth, useValue: authMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    authService = TestBed.inject(Auth);
    fixture.detectChanges();
  });

  it('debería mostrar un h1 con texto Bienvenido', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1).toBeTruthy();
    expect(h1.nativeElement.textContent).toContain('Bienvenido');
  });

  it('el formulario debería crearse con controles email y password', () => {
    expect(component.formulario.contains('email')).toBe(true);
    expect(component.formulario.contains('password')).toBe(true);
  });

  it('el email debería ser requerido', () => {
    const emailControl = component.formulario.get('email')!;
    emailControl.setValue('');
    expect(emailControl.valid).toBe(false);
    expect(emailControl.errors?.['required']).toBeTruthy();
  });

  it('el password debería ser requerido y tener mínimo 6 caracteres', () => {
    const contraControl = component.formulario.get('password')!;
    contraControl.setValue('');
    expect(contraControl.valid).toBe(false);
    expect(contraControl.errors?.['required']).toBeTruthy();

    contraControl.setValue('123');
    expect(contraControl.errors?.['minlength']).toBeTruthy();
  });
  it('el botón de login debería estar deshabilitado si el formulario es inválido', () => {
    component.formulario.setValue({ email: '', password: '' });
    fixture.detectChanges();
    const boton = fixture.debugElement.query(By.css('button'));
    expect(boton.nativeElement.disabled).toBe(true);
  });

  it('debería llamar a loginUSuario y navegar al iniciar sesión', async () => {
    authMock.loginUsuario.mockResolvedValue({ id: 1, nombre: 'Test' });
    component.formulario.setValue({ email: 'test@test.com', password: '123456' });
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate');

    await component.iniciarSesion();

    expect(authMock.loginUsuario).toHaveBeenCalledWith('test@test.com', '123456');
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('debería mostrar errro si login falla ', async () => {
  const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

  // Hacer que el login devuelva un error
  authMock.loginUsuario.mockRejectedValue({ message: 'Usuario no encontrado' });
  component.formulario.setValue({ email: 'fail@test.com', password: '123456' });
  await component.iniciarSesion();
  expect(alertSpy).toHaveBeenCalledWith('Usuario no encontrado');
  alertSpy.mockRestore();
  });
});
