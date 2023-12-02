import User from "../entities/User";
import EntityManager from "./EntityManager";

export default interface IUserEntityManager extends EntityManager<User> {
    get(username: string): Promise<User | undefined>
}