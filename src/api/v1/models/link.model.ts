import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, VirtualColumn } from 'typeorm';
import { User } from './user.model';

@Entity({ name: 'links' })
export class Link {
  @PrimaryGeneratedColumn({ type: 'integer' })
  public id: number | undefined;

  @Column({ type: 'varchar', length: 20, unique: true })
  public slug: string | undefined;

  @Column({ type: 'text' })
  public url: string | undefined;

  @ManyToOne(() => User, user => user.links, { eager: true })
  @JoinColumn({ name: 'user_id' })
  public user: User | undefined;

  @Column({ type: 'integer' })
  public user_id: number | undefined;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  public created_at: string | undefined;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  public updated_at: string | undefined;
}
