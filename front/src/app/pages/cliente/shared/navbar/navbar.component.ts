import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../../../services/carrito.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  totalCarrito: number = 0;

  constructor(
    private carritoService: CarritoService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.carritoService.totalItems$.subscribe((total) => {
      this.totalCarrito = total;
    });

    this.carritoService.refrescarCantidad();
  }

  logout() {
    this.auth.logout();
  }
}
