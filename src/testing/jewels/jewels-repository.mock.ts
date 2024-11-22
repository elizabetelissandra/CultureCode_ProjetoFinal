import { getRepositoryToken } from "@nestjs/typeorm";
import { Jewels } from "../../database/entities";
import { responseCreateJewelsMock } from "./response-create-jewels.mock";
import { jewelsMock } from "./jewels.mock";
import { updateJewelsMock } from "./update-jewels.mock";

export const jewelsRepositoryMock = {

    provide: getRepositoryToken(Jewels),
    useValue: {
        create: jest.fn().mockResolvedValue(responseCreateJewelsMock),
        save: jest.fn(),
        findOne: jest.fn().mockResolvedValue(jewelsMock[1]),
        find: jest.fn().mockResolvedValue(jewelsMock),
        update: jest.fn().mockResolvedValue({...jewelsMock[3], ...updateJewelsMock}),
    }
}