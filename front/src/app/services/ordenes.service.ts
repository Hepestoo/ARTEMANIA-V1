import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Orden {
  id: number;
  usuario?: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
  };
  session_id?: string;
  total: number;
  estado: string;
  fecha_creacion: string;
  nombre_cliente?: string;
  direccion?: string;
  telefono?: string;
  detalles: {
    producto: {
      nombre: string;
    };
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
  }[];
  pagos?: {
    metodo?: {
      nombre: string;
    };
  }[];
}


@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  private api = 'http://localhost:3000/ordenes';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  listar(): Observable<Orden[]> {
    return this.http.get<Orden[]>(this.api, {
      headers: this.getAuthHeaders()
    });
  }

  actualizarEstado(id: number, estado: string): Observable<any> {
    return this.http.patch(
      `${this.api}/${id}/estado`,
      { estado },
      { headers: this.getAuthHeaders() }
    );
  }

  eliminar(id: number) {
    return this.http.delete(`${this.api}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  crearOrden(data: { session_id?: string; usuario_id?: number }): Observable<any> {
    return this.http.post(this.api, data);
  }
  
  registrarPago(data: { orden_id: number, metodo: string, estado: string }) {
    return this.http.post('http://localhost:3000/pagos', data);
  }

  actualizarDatosCliente(id: number, data: { nombre_cliente: string, direccion: string, telefono: string }) {
    return this.http.patch(`${this.api}/${id}/datos`, data);
  }
  
}
