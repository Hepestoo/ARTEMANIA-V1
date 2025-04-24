import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SubcategoriaService } from "../../../services/subcategorias.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-subcategorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subcategorias.component.html',
  styleUrl: './subcategorias.component.scss'
})
export class SubcategoriasComponent implements OnInit {
  subcategorias: any[] = [];
  categorias: any[] = [];

  nueva: {
    id: number | null;
    nombre: string;
    categoria_id: number;
  } = {
    id: null,
    nombre: '',
    categoria_id: 0
  };

  constructor(
    private http: HttpClient,
    private subcategoriaService: SubcategoriaService
  ) {}

  ngOnInit(): void {
    this.listar();
    this.http.get('http://localhost:3000/categorias').subscribe((res: any) => {
      this.categorias = res;
    });
  }

  listar() {
    this.subcategoriaService.listar().subscribe((res) => {
      this.subcategorias = res;
    });
  }

  guardar() {
    const dto = {
      nombre: this.nueva.nombre,
      categoria_id: +this.nueva.categoria_id
    };

    if (this.nueva.id === null) {
      // Crear
      this.subcategoriaService.crear(dto).subscribe(() => {
        this.reset();
        this.listar();
      });
    } else {
      // Actualizar
      this.subcategoriaService.actualizar(this.nueva.id, dto).subscribe(() => {
        this.reset();
        this.listar();
      });
    }
  }

  editar(sub: any) {
    this.nueva = {
      id: sub.id,
      nombre: sub.nombre,
      categoria_id: sub.categoria?.id ?? 0
    };
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar subcategoría?')) {
      this.subcategoriaService.eliminar(id).subscribe(() => this.listar());
    }
  }

  reset() {
    this.nueva = {
      id: null,
      nombre: '',
      categoria_id: 0
    };
  }
}
