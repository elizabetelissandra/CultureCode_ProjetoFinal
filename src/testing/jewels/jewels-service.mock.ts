import { JewelsService } from "../../jewels/jewels.service";
import { usersMock } from "../users/users.mock";
import { jewelsMock } from "./jewels.mock";
import { responseCreateJewelsMock } from "./response-create-jewels.mock";
import { responseDistribuiteJewelsMock } from "./response-distribuite-jewels.mock";
import { updateJewelsMock } from "./update-jewels.mock";

export const jewelsServiceMock = {

    provide: JewelsService,
    useValue: {
        create: jest.fn().mockResolvedValue(responseCreateJewelsMock),
        distribuiteJewels: jest.fn().mockResolvedValue(responseDistribuiteJewelsMock),
        findAll: jest.fn().mockResolvedValue(jewelsMock),
        jewelById: jest.fn().mockResolvedValue(jewelsMock[3]),
        update: jest.fn().mockResolvedValue({...jewelsMock[0], ...updateJewelsMock}),
    }
}