import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Carrito } from './carrito.entity';
import { Producto } from '../../productos/entities/producto.entity';

@Entity('carrito_items')
export class CarritoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Carrito, carrito => carrito.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'carrito_id' })
  carrito: Carrito;

  @Column()
  carrito_id: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @Column()
  producto_id: number;

  @Column()
  cantidad: number;
}
