import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orden } from './entities/orden.entity';
import { OrdenDetalle } from './entities/orden-detalle.entity';
import { OrdenesService } from './ordenes.service';
import { OrdenesController } from './ordenes.controller';
import { Carrito } from '../carrito/entities/carrito.entity';
import { CarritoItem } from '../carrito/entities/carrito-item.entity';
import { Producto } from '../productos/entities/producto.entity';
import { UsersModule } from '../usuarios/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Orden,
      OrdenDetalle,
      Carrito,
      CarritoItem,
      Producto,
    ]),
    UsersModule
  ],
  controllers: [OrdenesController],
  providers: [OrdenesService],
})
export class OrdenesModule {}
