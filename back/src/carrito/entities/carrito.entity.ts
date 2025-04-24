import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CarritoItem } from './carrito-item.entity';

@Entity('carrito')
export class Carrito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  session_id: string;

  @Column({nullable:true})
  usuario_id:number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @OneToMany(() => CarritoItem, item => item.carrito)
  items: CarritoItem[];
}
