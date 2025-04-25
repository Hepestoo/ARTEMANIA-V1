import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

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
  private apiUrl = environment.apiUrl;
  private api = `${this.apiUrl}/subcategorias`;

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