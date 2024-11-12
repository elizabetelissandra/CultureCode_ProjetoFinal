import { TransactionEnum } from "src/enum/transaction.enum"
import { User } from "./users.entity"
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Jewels{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    
    @Column()
    price: number
    
    @Column()
    description: string
    
    @Column()
    transactionType: TransactionEnum
    
    @Column()
    active: boolean

    @ManyToOne(() => User, (user) => user.coins, {onDelete: 'CASCADE'})
    userTransaction: User

    createdAt: Date

    updatedAt: Date

    deleteAt: Date
}