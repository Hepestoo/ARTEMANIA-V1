export class CreateProductoDto {
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    subcategoria_id: number;
    imagen_url?: string;
    destacado?: boolean;
  }
  