import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Articulos } from './articulos';
import { By } from '@angular/platform-browser';
import { ArticuloService } from '../../servicios/articuloService';

// Tenemos que poner el nombre del component que vamos a probar
describe('Articulos Component', () => {
  // Este será el objeto que controla el component y su HTML
  let fixture: ComponentFixture<Articulos>;
  let articuloService: ArticuloService;
  const articuloMock = [
    {
      id: 1,
      nombre: 'Teclado mecánico',
      descripcion: 'Teclado gaming RGB',
      precio: 80,
      imagen: 'teclado.jpg',
      categoria: 1,
    },
    {
      id: 2,
      nombre: 'Ratón gaming',
      descripcion: 'Ratón óptico 16000 DPI',
      precio: 50,
      imagen: 'raton.jpg',
      categoria: 1,
    },
  ];

  // Se ejecuta antes de cada test, aquí se prepara lo necesario para probar el componente
  beforeEach(async () => {
    // Configuramos Angular para test
    await TestBed.configureTestingModule({
      imports: [Articulos],
    }).compileComponents();

    // Tenemos que crear el componente y renderizamos su HTML
    fixture = TestBed.createComponent(Articulos);
    articuloService = TestBed.inject(ArticuloService);
    fixture.detectChanges(); // Esto sirve para actualizar el DOM
  });

  // Esto lo que hace es un test individual, aquí se dice lo que queremos hacer
  it('debería mostrar un h1 con el texto de "Artículos"', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1).toBeTruthy(); // Comprobamos que exista
    expect(h1.nativeElement.textContent).toContain('Artículos');
  });

  it('deberíamos renderizar los artículos del for', () => {
    articuloService.articulos.set(articuloMock);
    fixture.detectChanges();
    const articulos = fixture.debugElement.queryAll(By.css('app-card-articulo'));
    expect(articulos.length).toBe(2);
  });

  it('todos los artículos deberían tener precio mayor que 0', () => {
    const articulos = fixture.debugElement.queryAll(By.css('app-card-articulo'));
    articulos.forEach((art) => {
      expect(art.componentInstance.articulo.precio).toBeGreaterThan(0);
    });
  });
});
