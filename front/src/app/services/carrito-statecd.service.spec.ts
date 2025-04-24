import { TestBed } from '@angular/core/testing';

import { CarritoStatecdService } from './carrito-statecd.service';

describe('CarritoStatecdService', () => {
  let service: CarritoStatecdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoStatecdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
