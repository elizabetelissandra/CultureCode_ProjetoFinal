import { RoleEnum } from "src/enum/role.enum"
import { Product } from "./products.entity"
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Jewels } from "./jewels.entity"
import { TransactionEnum } from "src/enum/transaction.enum"
import { BadGatewayException } from "@nestjs/common"
import * as bcrypt from 'bcrypt'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "varchar", length: 64})
    firstName: string
    
    @Column({type: "varchar", length: 100, nullable: true})
    lastName: string
    
    @Column({type: "varchar", length: 120, unique: true})
    email: string
    
    @Column({type: "varchar", length: 64, select: false})
    password: string
    
    @Column({type: 'enum', enum: RoleEnum, default: RoleEnum.user})
    role?: RoleEnum
    
    @Column({type: "bool", default: true})
    emailVerificado: boolean
    
    @OneToMany(() => Jewels, (jewel) => jewel.userTransaction)
    coins: Jewels[]
    
    @OneToMany(() => Product, (product) => product.comprador)
    productsPurchased: Product[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn({type: Date, default: null})
    deleteAt: Date

    @BeforeInsert()
    async hashPassword(){
        try {
            this.password = await bcrypt.hash(this.password, 10)
        } catch (error) {
            console.error(error)

            throw new BadGatewayException('Error trying to hash password')
        }
    }

    getCoinsBalance(): number{
        return this.coins.filter(jewel => jewel.active && jewel.transactionType === TransactionEnum.buy).reduce((sum, jewel) => sum + jewel.price, 0)
    }

}