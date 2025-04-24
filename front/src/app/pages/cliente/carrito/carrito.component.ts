import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';
import { FormsModule } from '@angular/forms';
import { OrdenService } from '../../../services/ordenes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  carrito: any = { items: [] };
  session_id: string = '';
  ordenConfirmada: any = null;


  constructor(private carritoService: CarritoService, private ordenService: OrdenService, private router: Router) { }

  ngOnInit(): void {
    this.session_id = localStorage.getItem('session_id') || this.generarSessionId();
    this.obtenerCarrito();

  }

  generarSessionId(): string {
    const id = crypto.randomUUID();
    localStorage.setItem('session_id', id);
    return id;
  }

  obtenerCarrito() {
    this.carritoService.getCarrito(this.session_id).subscribe((res) => {
      this.carrito = res;
    });
  }

  eliminarItem(id: number) {
    this.carritoService.eliminarItem(id).subscribe(() => {
      this.obtenerCarrito();
    });
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito(this.session_id).subscribe(() => {
      this.obtenerCarrito();
    });
  }

  calcularTotal(): number {
    return this.carrito.items.reduce((acc: number, item: any) => acc + item.cantidad * item.producto.precio, 0);
  }

  generarOrden() {
    const session_id = localStorage.getItem('session_id');
    if (!session_id) {
      alert('No se pudo obtener la sesión');
      return;
    }

    this.ordenService.crearOrden({ session_id }).subscribe({
      next: (orden) => {
        localStorage.setItem('orden_generada', JSON.stringify(orden));
        this.router.navigate(['/checkout']); // <- esto redirige correctamente
      },
    });
  }

}
