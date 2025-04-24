import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Orden } from '../../ordenes/entities/orden.entity';
import { MetodoPago } from './metodo-pago.entity';

@Entity('pagos')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orden_id: number;

  @ManyToOne(() => Orden, { eager: true, cascade:true, onDelete:'CASCADE' })
  @JoinColumn({ name: 'orden_id' })
  orden: Orden;

  @Column()
  metodo_pago_id: number;

  @ManyToOne(() => MetodoPago)
  @JoinColumn({ name: 'metodo_pago_id' })
  metodo: MetodoPago;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'varchar', default: 'completado' })
  estado: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_pago: Date;
}
