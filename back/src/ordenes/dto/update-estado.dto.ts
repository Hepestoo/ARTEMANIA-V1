export class UpdateEstadoDto {
    estado: 'pendiente' | 'pagado' | 'enviado' | 'cancelado';
    nombre_cliente: string;
    direccion: string;
    telefono: string;
  }
  