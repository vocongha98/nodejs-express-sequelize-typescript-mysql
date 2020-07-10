import { Model, Column, PrimaryKey, Table } from "sequelize-typescript";
@Table({
  tableName: "tbl_user",
})
export default class User extends Model<User> {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  public id!: number;

  @Column
  public username!: string;

  @Column
  public password!: string;

  @Column({
    field: "full_name",
  })
  public fullName!: string;
}
