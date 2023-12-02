import { userDBHandler } from "@/persistent/DBHandlerCollection";
import User, { UserPermission } from "./entities/User";
import IOrderManager from "./interfaces/IOrderManager";
import Converter from "./converters/types/Converter";
import { UserData } from "@/persistent/dtos/UserData";
import BeforeConverting from "./converters/types/BeforeConverting";
import ConvertedSuccessful from "./converters/types/ConvertedSuccessful";
import Order from "./entities/Order";
import IUserManager from "./interfaces/IUserManager";

class UserManager implements IUserManager {
    // Fields:
    private orderManager?: IOrderManager;

    // Constructor:
    public constructor(orderManager?: IOrderManager) {
        this.orderManager = orderManager;
    }

    // Methods:
    async getAll(path: any[]): Promise<User[]> {
        // Getting data
        try {
            var usersData = await userDBHandler.getAll();
        }
        catch (error: any) {
            throw error;
        }

        // Try converting
        try {
            var result: User[] = await this.multiDataToUser(usersData, path);
        }
        catch (error: any) {
            throw error;
        }

        // Return result
        return result;
    }

    async getByFilter(filter: any, path: any[]): Promise<User[]> {
        // Getting data
        try {
            var usersData = await userDBHandler.getByFilter(filter);
        }
        catch (error: any) {
            throw error;
        }

        // Try converting
        try {
            var result: User[] = await this.multiDataToUser(usersData, path);
        }
        catch (error: any) {
            throw error;
        }

        // Return result
        return result;
    }

    async get(username: string, path: any[]): Promise<User | undefined> {
        // Getting data
        try {
            var userData: UserData | undefined = await userDBHandler.get(username);
        }
        catch (error: any) {
            throw error;
        }

        // Exit if not user data found
        if (!userData) {
            return;
        }

        // Try converting
        try {
            var user: User = await this.dataToUser(userData, path);
        }
        catch (error: any) {
            throw error;
        }

        // Return user
        return user;
    }

    async insert(entity: User): Promise<void> {
        // Converting entity to data
        const data: UserData = this.userToData(entity);

        // Try inserting
        try {
            return userDBHandler.insert(data);
        }
        catch (error: any) {
            throw error;
        }
    }

    async update(entity: User): Promise<void> {
        // Converting entity to data
        const data: UserData = this.userToData(entity);

        // Try updating
        try {
            return userDBHandler.update(data);
        }
        catch (error: any) {
            throw error;
        }
    }

    async save(entity: User): Promise<void> {
        // Try inserting or updating
        try {
            if (!await userDBHandler.get(entity.Username as string)) {
                return this.insert(entity);
            }
            else {
                return this.update(entity);
            }
        }
        catch (error: any) {
            throw error;
        }
    }

    async remove(entity: User): Promise<void> {
        // Converting entity to data
        const data: UserData = this.userToData(entity);

        // Try removing
        try {
            return userDBHandler.remove(data);
        }
        catch (error: any) {
            throw error;
        }
    }

    // Operations:
    private async dataToUser(data: UserData, path: any[]): Promise<User> {
        // Self definition
        const self: UserManager = this;

        // Local functions:
        function precheck(username: string, path: any[]): User | undefined {
            for (const obj of path) {
                if (obj instanceof User) {
                    if (obj.Username === username) {
                        return obj;
                    }
                }
            }
        }

        async function createdOrdersHandling(user: User, path: any[]): Promise<void> {
            try {
                if (self.orderManager) {
                    const orders: Order[] = await self.orderManager.getByFilter({ createdBy: user.Username }, path)
                    user.CreatedOrders = orders;
                }
            }
            catch (error: any) {
                throw error;
            }
        }

        // Executions:
        // User declaration
        let user: User | undefined;

        // Path prechecking
        user = precheck(data.username, path);

        // Return user if found in path
        if (user) {
            return user;
        }

        // Start converting if this user not found in path
        user = new User();

        // Copying fields
        user.Username = data.username;
        user.Password = data.password;
        user.FullName = data.fullName;
        user.Permission = data.permission as UserPermission;
        
        // Dependencies handling
        try {
            await createdOrdersHandling(user, path);
        }
        catch (error: any){
            throw error;
        }

        // Return user
        return user;
    }

    private async multiDataToUser(data: UserData[], path: any[]): Promise<User[]> {
        // Result initialization
        const result: User[] = [];

        // Try converting
        try {
            for (const userData of data) {
                result.push(await this.dataToUser(userData, path));
            }
        }
        catch (error: any) {
            throw error;
        }

        // Return result
        return result;
    }

    private userToData(user: User): UserData {
        return {
            username: user.Username as string,
            password: user.Password as string,
            fullName: user.FullName as string,
            permission: user.Permission as string,
        };
    }

    // Getters & setters
    public get OrderManager(): IOrderManager | undefined {
        return this.orderManager;
    }

    public set OrderManager(orderManager: IOrderManager | undefined) {
        this.orderManager = orderManager;
    }
}

export default UserManager;