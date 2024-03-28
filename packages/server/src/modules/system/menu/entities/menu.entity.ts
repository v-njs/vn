import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  menuName: string;

  @Column({
    length: 50,
  })
  menuCode: string;

  @Column({})
  parentId: number;

  @Column({})
  order: number;

  @Column({
    length: 20,
  })
  icon: string;

  @Column({
    length: 100,
  })
  path: string;

  @Column({
    length: 100,
  })
  component: string;

  @Column({
    length: 5,
  })
  type: string;

  @Column({
    length: 5,
  })
  hidden: string;

  @Column({
    length: 5,
  })
  cache: string;

  @Column({
    length: 5,
  })
  permission: string;

  @Column({
    length: 200,
  })
  query: string;

  @Column({
    length: 5,
  })
  delFlag: string;

  @Column({
    length: 5,
  })
  status: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
