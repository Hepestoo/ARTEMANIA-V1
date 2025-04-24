import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity('subcategorias')
export class Subcategoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'int', nullable: false, name: 'categoriaId' }) 
  categoria_id: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoriaId' }) 
  categoria: Categoria;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;
}
