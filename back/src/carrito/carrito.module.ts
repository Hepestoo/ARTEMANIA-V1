import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from './entities/carrito.entity';
import { CarritoItem } from './entities/carrito-item.entity';
import { CarritoController } from './carrito.controller';
import { CarritoService } from './carrito.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito, CarritoItem])],
  controllers: [CarritoController],
  providers: [CarritoService],
})
export class CarritoModule {}
