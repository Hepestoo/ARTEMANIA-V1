import { TestBed } from '@angular/core/testing';
import { SubcategoriaService } from './subcategorias.service'; // 👈 asegurarte que el nombre y la ruta estén bien

describe('SubcategoriaService', () => {
  let service: SubcategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
