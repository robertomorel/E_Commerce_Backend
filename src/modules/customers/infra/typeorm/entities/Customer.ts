import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * O Decorator funciona como se fosse uma função.
 * Quando colocamos o Decorator em cima da classe, ela se torna um parâmetro para o Entiry.
 * Isso só funciona usando o Typescript
 * Este @Entity indita que o Model, quando saldo, será sempre gravado na tabela 'appointments'
 * Porém, precisamos dizer para o código quais dos campos da classe representam colunas na tabela
 */
@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
