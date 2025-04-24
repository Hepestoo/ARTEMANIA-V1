import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategoria } from './entities/subcategoria.entity';
import { CreateSubcategoriaDto } from './dto/create-subcategoria.dto';

@Injectable()
export class SubcategoriasService {
  constructor(
    @InjectRepository(Subcategoria)
    private subcategoriaRepository: Repository<Subcategoria>,
  ) {}

  async findAll(): Promise<Subcategoria[]> {
    return this.subcategoriaRepository.find({ relations: ['categoria'] });
  }

  async create(data: CreateSubcategoriaDto): Promise<Subcategoria> {
    const subcategoria = this.subcategoriaRepository.create(data);
    return this.subcategoriaRepository.save(subcategoria);
  }

  async update(id: number, data: CreateSubcategoriaDto): Promise<Subcategoria> {
    await this.subcategoriaRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.subcategoriaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subcategoría con ID ${id} no encontrada`);
    }
    return { message: `Subcategoría con ID ${id} eliminada exitosamente` };
  }
  
  async findOne(id: number): Promise<Subcategoria> {
    return this.subcategoriaRepository.findOne({ where: { id } });
  }
}
