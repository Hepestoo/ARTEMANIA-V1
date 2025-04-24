import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subcategoria, SubcategoriaService } from '../../../../services/subcategorias.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  subcategorias: Subcategoria[] = [];

  constructor(private subcategoriaService: SubcategoriaService) {}

  ngOnInit(): void {
    this.subcategoriaService.listar().subscribe({
      next: (data) => (this.subcategorias = data),
      error: (err) => console.error('Error al cargar subcategorías', err),
    });
  }
}
