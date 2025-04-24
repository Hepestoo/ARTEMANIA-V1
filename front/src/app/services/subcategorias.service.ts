import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Subcategoria {
  id: number;
  nombre: string;
  categoria_id: number;
  categoria?: {
    id: number;
    nombre: string;
  };
}

@Injectable({ providedIn: 'root' })
export class SubcategoriaService {
  private api = 'http://localhost:3000/subcategorias';

  constructor(private http: HttpClient) {}

  listar(): Observable<Subcategoria[]> {
    return this.http.get<Subcategoria[]>(this.api);
  }

  crear(data: Partial<Subcategoria>) {
    return this.http.post(this.api, data, {
      headers: this.getAuthHeaders()
    });
  }

  actualizar(id: number, data: Partial<Subcategoria>) {
    return this.http.patch(`${this.api}/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  eliminar(id: number) {
    return this.http.delete(`${this.api}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }
}