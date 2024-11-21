import { TransactionEnum } from "../../enum/transaction.enum";

export const responseCreateJewelsMock = {
    id: 10,
    name: 'Event Jewel',
    price: 50,
    description: 'Recompensa por evento finalizado com sucesso',
    transactionType: TransactionEnum.R,
    active: true
}