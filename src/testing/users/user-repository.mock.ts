import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../database/entities";
import { usersMock } from "./users.mock";
import { updateUserMock } from "./update-user.mock";

export const userRepositoryMock  = {
    provide: getRepositoryToken(User),
    useValue: {
        find: jest.fn().mockResolvedValue([usersMock]),
        findOne: jest.fn().mockResolvedValue(usersMock[1]),
        update: jest.fn().mockResolvedValue({...usersMock[1], ...updateUserMock}),
        softDelete: jest.fn(),
        findOneBy: jest.fn().mockResolvedValue({...usersMock[1], ...updateUserMock}),
        save: jest.fn()
    }
}