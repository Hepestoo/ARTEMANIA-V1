import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Producto, ProductoService } from '../../../services/producto.service';
import { SubcategoriaService } from '../../../services/subcategorias.service';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss'],
})
export class CatalogoComponent implements OnInit {
  subcategorias: any[] = [];
  productos: Producto[] = [];
  productosOriginal: Producto[] = [];
  cantidades: { [id: number]: number } = {};
  subcategoriaSeleccionada: number | null = null;

  // Paginación
  paginaActual: number = 1;
  productosPorPagina: number = 16;
  paginas: number[] = [];

  constructor(
    private productoService: ProductoService,
    private subcategoriaService: SubcategoriaService,
    private carritoService: CarritoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Cargar subcategorías
    this.subcategoriaService.listar().subscribe((res) => {
      this.subcategorias = res;

      // 2. Verificar si hay query param "sub" y cargar productos
      this.route.queryParams.subscribe(params => {
        const subId = parseInt(params['sub'], 10);

        if (subId && this.subcategorias.some(sc => sc.id === subId)) {
          this.seleccionarSubcategoria(subId);
        } else if (this.subcategorias.length > 0) {
          this.seleccionarSubcategoria(this.subcategorias[0].id);
        }
      });
    });

    this.generarSessionIdSiNoExiste();
  }

  generarSessionIdSiNoExiste() {
    const id = localStorage.getItem('session_id');
    if (!id) {
      const nuevoId = crypto.randomUUID();
      localStorage.setItem('session_id', nuevoId);
    }
  }

  seleccionarSubcategoria(id: number) {
    this.subcategoriaSeleccionada = id;
    this.paginaActual = 1;

    this.productoService.obtenerPorSubcategoria(id).subscribe((res) => {
      this.productosOriginal = res;
      this.productos = [...res];
      this.generarPaginas();

      // Actualizar URL con query param
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { sub: id },
        queryParamsHandling: 'merge'
      });
    });
  }

  agregarAlCarrito(producto: Producto) {
    const cantidad = this.cantidades[producto.id] || 1;

    if (cantidad > producto.stock) {
      alert('La cantidad supera el stock disponible.');
      return;
    }

    const session_id = localStorage.getItem('session_id')!;

    this.carritoService.agregarProducto(producto.id, cantidad, session_id).subscribe({
      next: () => {
        alert('Producto agregado al carrito');
        this.cantidades[producto.id] = 1;
        this.carritoService.refrescarCantidad();
      },
      error: () => {
        alert('Ocurrió un error al agregar al carrito');
      }
    });
  }

  // Paginación
  generarPaginas() {
    const totalPaginas = Math.ceil(this.productos.length / this.productosPorPagina);
    this.paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
  }

  get productosPaginados(): Producto[] {
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    const fin = inicio + this.productosPorPagina;
    return this.productos.slice(inicio, fin);
  }

  paginaSiguiente() {
    if (this.paginaActual < this.paginas.length) {
      this.paginaActual++;
    }
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  irAPagina(pagina: number) {
    this.paginaActual = pagina;
  }

  // Filtro por precio
  filtrarPorPrecio(min: number, max: number) {
    this.productos = this.productosOriginal.filter(
      (p) => p.precio >= min && p.precio <= max
    );
    this.paginaActual = 1;
    this.generarPaginas();
  }

  terminoBusqueda: string = '';

buscarProducto() {
  const termino = this.terminoBusqueda.trim().toLowerCase();

  if (termino === '') {
    this.productos = [...this.productosOriginal];
  } else {
    this.productos = this.productosOriginal.filter(producto =>
      producto.nombre.toLowerCase().includes(termino)
    );
  }

  this.paginaActual = 1;
  this.generarPaginas();
}
}
