import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';
import { CarritoItem } from './entities/carrito-item.entity';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito)
    private carritoRepo: Repository<Carrito>,

    @InjectRepository(CarritoItem)
    private itemRepo: Repository<CarritoItem>,
  ) {}

  async getCarrito(usuario_id?: number, session_id?: string) {
    if (!usuario_id && !session_id) {
      throw new BadRequestException('Se requiere usuario_id o session_id');
    }

    let carrito: Carrito | null = null;

    if (usuario_id) {
      carrito = await this.carritoRepo.findOne({
        where: { usuario_id },
        relations: ['items', 'items.producto'],
      });
    } else {
      carrito = await this.carritoRepo.findOne({
        where: { session_id },
        relations: ['items', 'items.producto'],
      });
    }

    if (!carrito) {
      carrito = this.carritoRepo.create({ usuario_id, session_id });
      await this.carritoRepo.save(carrito);
      carrito.items = [];
    }

    return carrito;
  }

  async addItem(dto: AddItemDto) {
    if (!dto.usuario_id && !dto.session_id) {
      throw new BadRequestException('Se requiere usuario_id o session_id');
    }

    const carrito = await this.getCarrito(dto.usuario_id, dto.session_id);

    const existente = await this.itemRepo.findOne({
      where: {
        carrito_id: carrito.id,
        producto_id: dto.producto_id,
      },
    });

    if (existente) {
      existente.cantidad += dto.cantidad;
      return this.itemRepo.save(existente);
    }

    const nuevoItem = this.itemRepo.create({
      carrito_id: carrito.id,
      producto_id: dto.producto_id,
      cantidad: dto.cantidad,
    });

    return this.itemRepo.save(nuevoItem);
  }

  async updateItem(id: number, dto: UpdateItemDto) {
    const item = await this.itemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Item no encontrado');
    item.cantidad = dto.cantidad;
    return this.itemRepo.save(item);
  }

  async removeItem(id: number) {
    const item = await this.itemRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Item no encontrado');
    return this.itemRepo.remove(item);
  }

  async clear(usuario_id?: number, session_id?: string) {
    const carrito = await this.getCarrito(usuario_id, session_id);
    await this.itemRepo.delete({ carrito_id: carrito.id });
    return { message: 'Carrito vaciado exitosamente' };
  }
}
