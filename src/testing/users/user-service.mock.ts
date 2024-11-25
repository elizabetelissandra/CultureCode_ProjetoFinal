import { UserService } from "../../user/user.service";
import { updateUserMock } from "./update-user.mock";
import { userDecoratorMock } from "./user-decorator.mock";
import { usersMock } from "./users.mock";

export const userServiceMock = {
    provide: UserService,
    useValue: {
        profile: jest.fn().mockResolvedValue(usersMock[1]),
        findAll: jest.fn().mockResolvedValue(usersMock),
        userById: jest.fn().mockResolvedValue(usersMock[2]),
        update: jest.fn().mockResolvedValue({...usersMock[4], ...updateUserMock}),
        delete: jest.fn().mockResolvedValue({message: 'ok'}),
    }
}