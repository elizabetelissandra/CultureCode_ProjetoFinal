import { TransactionEnum } from "src/enum/transaction.enum"
import { User } from "./users.entity"
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Jewels{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 64, unique: true})
    name: string
    
    @Column({type: 'int'})
    price: number
    
    @Column({type: 'text'})
    description: string
    
    @Column({type: 'enum', enum: TransactionEnum, default: TransactionEnum.G})
    transactionType: TransactionEnum
    
    @Column({type: 'bool', default: true})
    active: boolean

    @ManyToOne(() => User, (user) => user.jewels, {onDelete: 'CASCADE'})
    user: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}