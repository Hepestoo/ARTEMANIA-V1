export class CreateOrdenDto {
  usuario_id?: number;
  session_id?: string;
  total: number;
  nombre_cliente?: string;
  direccion?: string;
  telefono?: string;
  detalles: {
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
  }[];
}
