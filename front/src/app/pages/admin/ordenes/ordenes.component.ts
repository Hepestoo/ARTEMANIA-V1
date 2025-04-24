import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdenService, Orden } from '../../../services/ordenes.service';
@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.scss'
})
export class OrdenesComponent implements OnInit {
  ordenes: Orden[] = [];

  constructor(private ordenService: OrdenService) { }

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes() {
    this.ordenService.listar().subscribe((res) => {
      this.ordenes = res;
    });
  }

  cambiarEstado(id: number, nuevoEstado: string) {
    this.ordenService.actualizarEstado(id, nuevoEstado).subscribe(() => {
      this.cargarOrdenes();
    });
  }

  ordenSeleccionada: Orden | null = null;

  verDetalles(orden: Orden) {
    this.ordenSeleccionada = orden;
  }

  cerrarDetalles() {
    this.ordenSeleccionada = null;
  }

  eliminarOrden(id: number) {
    if (confirm('¿Estás seguro de eliminar esta orden?')) {
      this.ordenService.eliminar(id).subscribe(() => {
        this.cargarOrdenes();
      });
    }
  }

  
  

}
