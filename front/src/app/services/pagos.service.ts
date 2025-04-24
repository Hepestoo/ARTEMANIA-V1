import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pago {
  id: number;
  orden_id: number;
  metodo_pago_id: number;
  monto: number;
  estado: string;
  fecha_pago: string;
  metodo?: {
    nombre: string;
  };
}

@Injectable({ providedIn: 'root' })
export class PagosService {
  private api = 'http://localhost:3000/pagos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.api);
  }

  listarMetodosPago(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/metodos`);
  }
  
  crearPago(data: any) {
    return this.http.post('http://localhost:3000/pagos', data);
  }
  
}
