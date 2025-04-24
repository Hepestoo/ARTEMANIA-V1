import { Component } from '@angular/core';
import { ProductosComponent } from "../productos/productos.component";
import { SubcategoriasComponent } from "../subcategorias/subcategorias.component";
import { OrdenesComponent } from "../ordenes/ordenes.component";
import { CommonModule } from '@angular/common';
import { PagosComponent } from '../pagos/pagos.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductosComponent, SubcategoriasComponent, OrdenesComponent, PagosComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  vistaActual: string = 'productos';
  constructor(private auth: AuthService) {}


mostrarVista(vista: string) {
  this.vistaActual = vista;
}
logout() {
  this.auth.logout();
}

}
