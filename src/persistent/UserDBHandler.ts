import { get, getAll, getByFilter, insert, remove, update } from "./DBHandler";
import IUserDBHandler from "./interfaces/IUserDBHandler";
import { UserData, userDataPattern } from "./dtos/UserData";

// Collection info:
const collectionName: string = "User";

// Pattern:
const pattern: UserData = userDataPattern;

// Class definition
class UserDBHandler implements IUserDBHandler {
    // Constructor:
    public constructor() {

    }

    // Methods:
    public async getAll(): Promise<UserData[]> {
        try {
            return getAll(collectionName, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async getByFilter(filter: any): Promise<UserData[]> {
        try {
            return getByFilter(collectionName, filter, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async get(username: string): Promise<UserData | undefined> {
        try {
            return get(collectionName, { username: username }, pattern);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async insert(userData: UserData): Promise<void> {
        try {
            return insert(collectionName, userData);
        }
        catch (error: any) {
            throw error;
        }
    }

    public async update(userData: UserData): Promise<void> {
        try {
            return update(collectionName, userData, { username: userData.username });
        }
        catch (error: any) {
            throw error;
        }
    }

    public async save(userData: UserData): Promise<void> {
        try {
            if (!await this.get(userData.username)) {
                return this.insert(userData);
            }
            else {
                return this.update(userData);
            }
        }
        catch (error: any) {
            throw error;
        }
    }

    public async remove(userData: UserData): Promise<void> {
        try {
            return remove(collectionName, { username: userData.username });
        }
        catch (error: any) {
            throw error;
        }
    }
}

export default UserDBHandler;