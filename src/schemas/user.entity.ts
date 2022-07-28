import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {
  // @PrimaryGeneratedColumn()
  // _id: number;

  @PrimaryColumn()
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @Column({ type: 'bigint' })
  createdAt: number;

  @Column({ type: 'bigint' })
  updatedAt: number;
}
