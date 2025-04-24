import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';
import { MetodoPago } from './entities/metodo-pago.entity';
import { sendTelegramMessage } from 'src/telegram/telegram.helper';
import { Orden } from 'src/ordenes/entities/orden.entity';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private pagoRepo: Repository<Pago>,

    @InjectRepository(MetodoPago)
    private metodoRepo: Repository<MetodoPago>,

    @InjectRepository(Orden)
    private ordenRepo: Repository<Orden>
  ) { }

  async crearPago(dto: CreatePagoDto) {
    const metodo = await this.metodoRepo.findOne({ where: { id: dto.metodo_pago_id } });
    if (!metodo) throw new NotFoundException('Método de pago no válido');

    const pago = this.pagoRepo.create({
      ...dto,
      estado: dto.estado || 'completado',
    });

    const pagoGuardado = await this.pagoRepo.save(pago);

    //Obtener la orden con detalles y productos
    const ordenRepo = this.ordenRepo as Repository<Orden>;
    const orden = await ordenRepo.findOne({
      where: { id: dto.orden_id },
      relations: ['detalles', 'detalles.producto'],
    });

    if (!orden) {
      await sendTelegramMessage(`Se registró un pago pero no se pudo cargar la orden #${dto.orden_id}`);
      return pagoGuardado;
    }

    const productosResumen = orden.detalles.map((d) =>
      `•${d.producto.nombre} - Cantidad: ${d.cantidad} - Subtotal: $${Number(d.subtotal).toFixed(2)}`).join('\n');

    //Construir mensaje Telegram
    const mensaje = `
  *Nueva Orden Confirmada*
  
  Orden: ${orden.id}
  Cliente: ${orden.nombre_cliente || 'No registrado'}
  Teléfono: ${orden.telefono || 'No registrado'}
  Dirección: ${orden.direccion || 'No registrada'}
  
  *Productos:*
  ${productosResumen}
  
  Método de Pago: ${metodo.nombre}
  Total: $${orden.total}
  `;

    await sendTelegramMessage(mensaje);

    return pagoGuardado;
  }

  async listarPagosPorOrden(orden_id: number) {
    return this.pagoRepo.find({
      where: { orden_id },
      relations: ['metodo'],
    });
  }

  async listarMetodosDePago() {
    return this.metodoRepo.find();
  }

  async crearMetodo(nombre: string, descripcion?: string) {
    const metodo = this.metodoRepo.create({ nombre, descripcion });
    return this.metodoRepo.save(metodo);
  }
}
