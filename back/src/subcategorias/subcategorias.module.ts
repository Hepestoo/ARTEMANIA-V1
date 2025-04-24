import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoriasService } from './subcategorias.service';
import { SubcategoriasController } from './subcategorias.controller';
import { Subcategoria } from './entities/subcategoria.entity';
import { UsersModule } from 'src/usuarios/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategoria]),UsersModule],
  controllers: [SubcategoriasController],
  providers: [SubcategoriasService],
})
export class SubcategoriasModule {}
