import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from 'src/usuarios/entities/user.entity';
import { OrdenDetalle } from './orden-detalle.entity';

@Entity('ordenes')
export class Orden {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  session_id?: string;

  @Column({ nullable: true })
  usuario_id?: number;

  @Column({ nullable: true })
  nombre_cliente?: string;

  @Column({ nullable: true })
  direccion?: string;

  @Column({ nullable: true })
  telefono?: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total: number;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario: User;

  @OneToMany(() => OrdenDetalle, detalle => detalle.orden, { eager: true, cascade: true, onDelete: 'CASCADE' })
  detalles: OrdenDetalle[];
}
