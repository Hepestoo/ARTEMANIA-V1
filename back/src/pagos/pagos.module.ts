import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { MetodoPago } from './entities/metodo-pago.entity';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { Orden } from 'src/ordenes/entities/orden.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pago, MetodoPago,Orden])],
  controllers: [PagosController],
  providers: [PagosService],
})
export class PagosModule {}
