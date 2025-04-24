import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_url?: string;
  destacado?: boolean;
  subcategoria: {
    id: number;
    nombre: string;
  };
}

// DTO para crear/editar productos
export interface ProductoDTO {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  subcategoria_id: number;
  imagen_url?: string;
  destacado?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private api = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.api);
  }

  crear(producto: ProductoDTO): Observable<Producto> {
    return this.http.post<Producto>(this.api, producto, {
      headers: this.getAuthHeaders()
    });
  }

  actualizar(id: number, producto: ProductoDTO): Observable<Producto> {
    return this.http.put<Producto>(`${this.api}/${id}`, producto, {
      headers: this.getAuthHeaders()
    });
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
  obtenerPorSubcategoria(subcategoriaId: number) {
    return this.http.get<any[]>(`${this.api}/subcategoria/${subcategoriaId}`);
  }
  
  
}
