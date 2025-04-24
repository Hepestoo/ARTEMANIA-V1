import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Orden } from './orden.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('ordernes_detalles')
export class OrdenDetalle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Orden, orden => orden.detalles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orden_id' })
  orden: Orden;

  @Column()
  orden_id: number;

  @ManyToOne(() => Producto, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column()
  producto_id: number;

  @Column()
  cantidad: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio_unitario: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  subtotal: number;
}
