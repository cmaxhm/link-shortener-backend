import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Link } from './link.model';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number | undefined;

  @Column({ type: 'varchar', length: 30, unique: true })
  public username: string | undefined;

  @Column({ type: 'varchar', length: 30, nullable: true })
  public email: string | undefined;

  @Column({ type: 'varchar', length: 100, select: false })
  public password: string | undefined;

  @OneToMany(() => Link, link => link.user)
  public links: Link[] | undefined;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  public created_at: string | undefined;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  public updated_at: string | undefined;
}
