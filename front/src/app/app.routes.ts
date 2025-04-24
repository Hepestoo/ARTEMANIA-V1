import { Routes } from '@angular/router';
import { adminAuthGuard } from './pages/admin/guards/admin-auth.guard';
import { ClienteLayoutComponent } from './pages/cliente/cliente-layout.component';

export const routes: Routes = [
  // Redirección principal
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  // Ruta login (fuera del layout del cliente)
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/cliente/login/login.component').then(m => m.LoginComponent),
  },

  // Rutas cliente con layout fijo
  {
    path: '',
    component: ClienteLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/cliente/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'catalogo',
        loadComponent: () =>
          import('./pages/cliente/catalogo/catalogo.component').then(m => m.CatalogoComponent),
      },
      {
        path: 'contacto',
        loadComponent: () =>
          import('./pages/cliente/contacto/contacto.component').then(m => m.ContactoComponent),
      },
      {
        path: 'nosotros',
        loadComponent: () =>
          import('./pages/cliente/nosotros/nosotros.component').then(m => m.NosotrosComponent),
      },
      {
        path: 'carrito',
        loadComponent: () =>
          import('./pages/cliente/carrito/carrito.component').then(m => m.CarritoComponent),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./pages/cliente/checkout/checkout.component').then(m => m.CheckoutComponent),
      }
    ]
  },

  // Rutas admin
  {
    path: 'admin',
    children: [
      {
        path: '',
        canActivate: [adminAuthGuard],
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'productos',
        canActivate: [adminAuthGuard],
        loadComponent: () =>
          import('./pages/admin/productos/productos.component').then(m => m.ProductosComponent),
      },
      {
        path: 'subcategorias',
        canActivate: [adminAuthGuard],
        loadComponent: () =>
          import('./pages/admin/subcategorias/subcategorias.component').then(m => m.SubcategoriasComponent),
      },
      {
        path: 'ordenes',
        canActivate: [adminAuthGuard],
        loadComponent: () =>
          import('./pages/admin/ordenes/ordenes.component').then(m => m.OrdenesComponent),
      },
      {
        path: 'pagos',
        canActivate: [adminAuthGuard],
        loadComponent: () =>
          import('./pages/admin/pagos/pagos.component').then(m => m.PagosComponent),
      }
    ]
  }
];

