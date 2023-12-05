import Order from "./Order";

export type UserPermission = "EMPLOYEE" | "ADMIN";

export default class User {
    // Fields:
    private username?: string;
    private password?: string;
    private fullName?: string;
    private permission?: UserPermission;
    private createdOrders: Order[]

    // Constructor:
    public constructor(username?: string, password?: string, fullName?: string, permission?: UserPermission, createdOrders?: Order[]) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.permission = permission;
        this.createdOrders = (createdOrders || []);
    }

    // Getters & setters:
    public get Username(): string | undefined {
        return this.username;
    }

    public set Username(username: string | undefined) {
        this.username = username;
    }

    public get Password(): string | undefined {
        return this.password;
    }

    public set Password(password: string | undefined) {
        this.password = password;
    }

    public get FullName(): string | undefined {
        return this.fullName;
    }

    public set FullName(fullName: string | undefined) {
        this.fullName = fullName;
    }

    public get Permission(): UserPermission | undefined {
        return this.permission;
    }

    public set Permission(permission: UserPermission | undefined) {
        this.permission = permission;
    }

    public get CreatedOrders(): Order[] {
        return this.createdOrders;
    }

    public set CreatedOrders(createdOrders: Order[]) {
        this.createdOrders = createdOrders;
    }
}