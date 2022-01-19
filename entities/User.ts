import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @CreateDateColumn({
    comment: "作成日時",
    precision: 0,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: string;

  @UpdateDateColumn({
    comment: "更新日時",
    precision: 0,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt!: string;
}
