import { usersMock } from "../users/users.mock";
import { jewelsMock } from "./jewels.mock";

export const responseDistribuiteJewelsMock = {
    ...jewelsMock[2], 
    active: false, 
    user: {id: usersMock[0].id}
}