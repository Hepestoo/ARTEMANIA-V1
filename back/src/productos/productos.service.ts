import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Subcategoria } from '../subcategorias/entities/subcategoria.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>
  ) { }

  findAll() {
    return this.productoRepo.find();
  }

  async findOne(id: number) {
    const producto = await this.productoRepo.findOne({ where: { id } });
    if (!producto) throw new NotFoundException(`Producto ${id} no encontrado`);
    return producto;
  }

  async create(dto: CreateProductoDto) {
    const subcategoria = await this.productoRepo.manager.findOne('subcategorias', {
      where: { id: dto.subcategoria_id }
    });

    if (!subcategoria) {
      throw new NotFoundException(`Subcategoría con ID ${dto.subcategoria_id} no encontrada`);
    }

    const nuevo = this.productoRepo.create({
      ...dto,
      subcategoria
    });

    return this.productoRepo.save(nuevo);
  }

  async update(id: number, dto: UpdateProductoDto) {
    const producto = await this.findOne(id);

    // Si se envía subcategoria_id, buscar y asignar la subcategoría
    if (dto.subcategoria_id) {
      const subcategoria = await this.productoRepo.manager.findOne(Subcategoria, {
        where: { id: dto.subcategoria_id }
      });

      if (!subcategoria) {
        throw new NotFoundException(`Subcategoría con ID ${dto.subcategoria_id} no encontrada`);
      }

      producto.subcategoria = subcategoria;
    }

    // Asignar el resto de campos (sin pisar subcategoria)
    Object.assign(producto, {
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      precio: dto.precio,
      stock: dto.stock,
      imagen_url: dto.imagen_url,
      destacado: dto.destacado
    });

    return this.productoRepo.save(producto);
  }


  async delete(id: number) {
    const resultado = await this.productoRepo.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }
    return { message: `Producto ${id} eliminado exitosamente` };
  }

  async findBySubcategoria(id: number) {
    return this.productoRepo.find({
      where: {
        subcategoria: { id },
      },
      relations: ['subcategoria']
    });
  }
  
}
