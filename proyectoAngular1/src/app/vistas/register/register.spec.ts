import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Register } from './register';
import { Auth } from '../../servicios/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { email, minLength } from '@angular/forms/signals';

describe('Register Component', () => {
  let fixture: ComponentFixture<Register>;
  let component: Register;
  let authService: Auth;

  const authMock = {
    registerUsuario: vi.fn(),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, Register, RouterTestingModule],
      providers: [{ provide: Auth, useValue: authMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    authService = TestBed.inject(Auth);
    fixture.detectChanges();
  });

  it('debería mostrar un h1 con texto Bienvenido', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1).toBeTruthy();
    expect(h1.nativeElement.textContent).toContain('Bienvenido');
  });

  it('el nombre debería ser requerido y tener un minimo de 3 caracteres', () => {
    const nombreControl = component.formulario.get('nombre')!;
    nombreControl?.setValue('');
    expect(nombreControl.valid).toBe(false);
    expect(nombreControl.errors?.['required']).toBeTruthy();

    nombreControl.setValue('12');
    expect(nombreControl.errors?.['minlength']).toBeTruthy();
  });

  it('el apellido debería ser requerido y tener un minimo de 3 caracteres y un maximo de 45 caracteres', () => {
    const apellidoControl = component.formulario.get('apellidos')!;

    apellidoControl.setValue('');
    expect(apellidoControl.errors?.['required']).toBeTruthy();

    apellidoControl.setValue('12');
    expect(apellidoControl.errors?.['minlength']).toBeTruthy();

    apellidoControl.setValue('a'.repeat(46));
    expect(apellidoControl.errors?.['maxlength']).toBeTruthy();
  });

  it('el email debería ser requerido', () => {
    const emailControl = component.formulario.get('email')!;
    emailControl.setValue('');
    expect(emailControl.valid).toBe(false);
    expect(emailControl.errors?.['required']).toBeTruthy();
  });

  it('el password debería ser requerido y tener mínimo 6 caracteres', () => {
    const contraControl = component.formulario.get('password')!;
    contraControl?.setValue('');
    expect(contraControl.valid).toBe(false);
    expect(contraControl.errors?.['required']).toBeTruthy();

    contraControl.setValue('123');
    expect(contraControl.errors?.['minlength']).toBeTruthy();
  });

  it('el password y el confirmPassword debería ser igual', () => {
    const contraControl = component.formulario.get('password')!;
    const contraConfirmControl = component.formulario.get('confirmacionPassword')!;

    contraControl.setValue('345');
    contraConfirmControl.setValue('342');

    expect(component.formulario.errors?.['passwordMismatch']).toBeTruthy();

    contraControl.setValue('2d4');
    contraConfirmControl.setValue('2d4');

    expect(component.formulario.errors?.['passwordMismatch']).toBeFalsy();
  });

  it('el botón de login debería estar deshbilitado si el formulario es inválido', () => {
    component.formulario.setValue({
      email: '',
      password: '',
      nombre: '',
      apellidos: '',
      confirmacionPassword: '',
    });
    fixture.detectChanges();
    const boton = fixture.debugElement.query(By.css('button'));
    
    expect(boton.nativeElement.disabled).toBe(true);
  });

  it('el boton debería habilitarse cuando el formulario sea válido', () => {
    component.formulario.setValue({
        nombre:'Alex',
        apellidos:'Lopez España',
        email:'alex.lopez@vivaticket.com',
        password:'8jdhd8dh',
        confirmacionPassword:'8jdhd8dh'
    })
    fixture.detectChanges();
    const boton = fixture.debugElement.query(By.css('button'));
    
    expect(component.formulario.valid).toBe(true);
    expect(boton.nativeElement.disabled).toBe(false);
  });
});
