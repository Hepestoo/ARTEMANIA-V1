import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  crearPago(@Body() dto: CreatePagoDto) {
    return this.pagosService.crearPago(dto);
  }

  @Get()
  listarPorOrden(@Query('orden_id') orden_id: number) {
    return this.pagosService.listarPagosPorOrden(orden_id);
  }

  @Get('metodos')
  listarMetodos() {
    return this.pagosService.listarMetodosDePago();
  }

  @Post('metodos')
  crearMetodo(@Body() body: { nombre: string; descripcion?: string }) {
    return this.pagosService.crearMetodo(body.nombre, body.descripcion);
  }
}
