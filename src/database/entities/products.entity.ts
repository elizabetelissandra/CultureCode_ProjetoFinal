import { CategoryEnum } from "src/enum/category.enum"
import { User } from "./users.entity"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 60, unique: true})
    name: string
    
    @Column({type: 'int'})
    price: number
    
    @Column({type: 'enum', enum: CategoryEnum, default: CategoryEnum.dev})
    category: CategoryEnum
    
    @Column({type: 'bool', default: true})
    inStock: boolean
    
    @ManyToMany(() => User, (user) => user.productsPurchased, {onDelete: 'CASCADE'})
    buyer: User[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({type: Date, default: null})
    deleteAt: Date


}