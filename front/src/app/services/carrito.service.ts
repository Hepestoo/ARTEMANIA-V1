import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarritoStateService } from './carrito-state.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:3000/carrito';

  // Observable para el contador
  private totalItemsSubject = new BehaviorSubject<number>(this.obtenerCantidadGuardada());
  totalItems$ = this.totalItemsSubject.asObservable();

  constructor(private http: HttpClient, private carritoState: CarritoStateService) { }

  // Obtener el carrito por usuario_id o session_id
  getCarrito(session_id: string): Observable<any> {
    const params = new HttpParams().set('session_id', session_id);
    return this.http.get<any>(`${this.apiUrl}`, { params }).pipe(
      tap((carrito) => {
        const total = carrito.items.reduce((sum: number, item: any) => sum + item.cantidad, 0);
        this.actualizarCantidad(total);
      })
    );
  }


  // Agregar un producto al carrito
  agregarProducto(producto_id: number, cantidad: number, session_id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, {
      producto_id,
      cantidad,
      session_id
    });
  }

  // Actualizar la cantidad de un producto
  private actualizarCantidad(valor: number) {
    this.totalItemsSubject.next(valor);
    localStorage.setItem('total_carrito', valor.toString());
  }

  private obtenerCantidadGuardada(): number {
    return parseInt(localStorage.getItem('total_carrito') || '0', 10);
  }

  // Eliminar un ítem del carrito
  eliminarItem(item_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/item/${item_id}`);
  }

  // Vaciar carrito
  vaciarCarrito(session_id: string): Observable<any> {
    const params = new HttpParams().set('session_id', session_id);
    return this.http.delete(`${this.apiUrl}/clear`, { params });
  }

  refrescarCantidad() {
    const session_id = localStorage.getItem('session_id');
    if (session_id) {
      this.getCarrito(session_id).subscribe(); // tap se encargará de actualizar
    }
  }

}
