export class CreatePagoDto {
    orden_id: number;
    metodo_pago_id: number;
    monto: number;
    estado?: string;
  }
