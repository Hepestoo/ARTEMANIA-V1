import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orden } from './entities/orden.entity';
import { OrdenDetalle } from './entities/orden-detalle.entity';
import { Carrito } from '../carrito/entities/carrito.entity';
import { CarritoItem } from '../carrito/entities/carrito-item.entity';
import { Producto } from '../productos/entities/producto.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Injectable()
export class OrdenesService {
  constructor(
    @InjectRepository(Orden)
    private ordenRepo: Repository<Orden>,

    @InjectRepository(OrdenDetalle)
    private detalleRepo: Repository<OrdenDetalle>,

    @InjectRepository(Carrito)
    private carritoRepo: Repository<Carrito>,

    @InjectRepository(CarritoItem)
    private carritoItemRepo: Repository<CarritoItem>,

    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>
  ) { }

  async crearOrden(dto: CreateOrdenDto) {
    const { usuario_id, session_id } = dto;

    const carrito = await this.carritoRepo.findOne({
      where: usuario_id ? { usuario_id } : { session_id },
    });

    if (!carrito) throw new NotFoundException('No se encontró el carrito');

    const items = await this.carritoItemRepo.find({
      where: { carrito_id: carrito.id },
    });

    if (items.length === 0)
      throw new NotFoundException('El carrito está vacío');

    const detalles: OrdenDetalle[] = [];
    let total = 0;

    for (const item of items) {
      const producto = await this.productoRepo.findOne({
        where: { id: item.producto_id },
      });

      if (!producto) continue;

      // Verificar stock disponible
      if (producto.stock < item.cantidad) {
        throw new NotFoundException(
          `No hay suficiente stock para el producto ${producto.nombre}`
        );
      }

      const subtotal = Number(producto.precio) * item.cantidad;
      total += subtotal;

      detalles.push(
        this.detalleRepo.create({
          producto_id: producto.id,
          cantidad: item.cantidad,
          precio_unitario: producto.precio,
          subtotal,
        }),
      );
    }

    const orden = this.ordenRepo.create({
      usuario_id: usuario_id || null,
      session_id: session_id || null,
      total,
      estado: 'pendiente',
      detalles,
    });

    const ordenGuardada = await this.ordenRepo.save(orden);

    // Limpiar carrito
    await this.carritoItemRepo.delete({ carrito_id: carrito.id });

    // ✅ Retornar la orden con los productos relacionados
    return this.ordenRepo.findOne({
      where: { id: ordenGuardada.id },
      relations: ['detalles', 'detalles.producto'],
    });
  }



  async listarPorUsuario(usuario_id: number) {
    return this.ordenRepo.find({
      where: { usuario_id },
      relations: ['detalles'],
    });
  }

  async listarPorSession(session_id: string) {
    return this.ordenRepo.find({
      where: { session_id },
      relations: ['detalles'],
    });
  }

  async actualizarEstado(id: number, estado: string) {
    const orden = await this.ordenRepo.findOne({
      where: { id },
      relations: ['detalles', 'detalles.producto']
    });

    if (!orden) {
      throw new NotFoundException('Orden no encontrada');
    }

    // ✅ Si la orden cambia a "pagado", entonces descontamos el stock
    if (estado === 'pagado') {
      for (const detalle of orden.detalles) {
        const producto = await this.productoRepo.findOne({ where: { id: detalle.producto_id } });

        if (producto) {
          if (producto.stock < detalle.cantidad) {
            throw new BadRequestException(`Stock insuficiente para ${producto.nombre}`);
          }

          producto.stock -= detalle.cantidad;
          await this.productoRepo.save(producto);
        }
      }
    }

    orden.estado = estado;
    return this.ordenRepo.save(orden);
  }



  findAll() {
    return this.ordenRepo.find({
      relations: ['usuario', 'detalles', 'detalles.producto']
    });
  }

  async eliminar(id: number) {
    const orden = await this.ordenRepo.findOne({ where: { id } });

    if (!orden) {
      throw new NotFoundException(`Orden ${id} no encontrada`);
    }

    await this.ordenRepo.remove(orden);

    return { message: `Orden ${id} eliminada correctamente` };
  }

  async actualizarDatosCliente(id: number, dto: UpdateEstadoDto) {
    const orden = await this.ordenRepo.findOne({ where: { id } });
    if (!orden) throw new NotFoundException('Orden no encontrada');
  
    orden.nombre_cliente = dto.nombre_cliente;
    orden.direccion = dto.direccion;
    orden.telefono = dto.telefono;
  
    return this.ordenRepo.save(orden);
  }
  
  



}
