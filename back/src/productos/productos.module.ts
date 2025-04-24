import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { Producto } from './entities/producto.entity';
import { UsersModule } from 'src/usuarios/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), UsersModule],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
