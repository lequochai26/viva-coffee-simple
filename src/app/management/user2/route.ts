import { userManager } from "@/domain/EntityManagerCollection";
import User from "@/domain/entities/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Get request's method header
        const getMethod: string | null = request.headers.get("method");

        // No get method case
        if (!getMethod) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy phương thức truy vấn!" }
            );
        }

        switch (getMethod) {
            // Get all case
            case 'GETALL': return NextResponse.json(
                {
                    success: true,
                    result: (await userManager.getAll([])).map(
                        function (user: User) {
                            return {
                                username: user.Username,
                                password: user.Password,
                                fullName: user.FullName,
                                permission: user.Permission
                            }
                        }
                    )
                }
            );

            // Get by keyword case
            case 'GETBYKEYWORD': {
                const keyword: string | null = request.nextUrl.searchParams.get("keyword");

                if (!keyword) {
                    return NextResponse.json(
                        { success: false, message: "Không tìm thấy từ khóa tìm kiếm!" }
                    );
                }

                return NextResponse.json(
                    {
                        success: true,
                        result: (await userManager.getAll([])).map(
                            function (user: User) {
                                return {
                                    username: user.Username,
                                    password: user.Password,
                                    fullName: user.FullName,
                                    permission: user.Permission
                                };
                            }
                        ).filter(
                            function (user) {
                                if (`${user.username} ${user.fullName} ${user.permission}`.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
                                    return user;
                                }
                            }
                        )
                    }
                );
            }

            default: return NextResponse.json(
                { success: false, message: "Phương thức không hợp lệ!" }
            );
        }
    }
    catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.toString() }
        );
    }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
    try {
        // Parsing request's body into json
        const body: any = await request.json();

        // Get target field from body
        const target: any = body.target;

        // Target not found case
        if (!target) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy đối tượng cần xóa! "}
            );
        }

        // Get target's username
        const username: string = target.username;

        // Get user from given username
        const user: User | undefined = await userManager.get(username, []);

        // User not found case
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy đối tượng cần xóa trong cơ sở dữ liệu hệ thống!" }
            );
        }

        // Delete successfully case
        await userManager.remove(user);

        // Responding
        return NextResponse.json(
            { success: true }
        );
    }
    catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.toString() }
        );
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Parsing request's body into json
        const body: any = await request.json();

        // Get target from body
        const target: any = body.target;

        // Target not found in request's body
        if (!target) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy đối tượng cần thêm!" }
            )
        }

        // Destruct target's info
        const { username, password, fullName, permission }: any = target;

        // User already exist case
        if (await userManager.get(username, [])) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Đã có tài khoản với tên người dùng "${username}" tồn tại trong cơ sở dữ liệu hệ thống!`
                }
            );
        }

        // Create new user based on given information
        const user: User = new User();
        user.Username = username;
        user.Password = password;
        user.FullName = fullName;
        user.Permission = permission;

        // Insert user into db
        await userManager.insert(user);

        // Success
        return NextResponse.json({ success: true });
    }
    catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.tostring() }
        );
    }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
    try {
        // Parsing request's body into json
        const body: any = await request.json();

        // Get target from body
        const target: any = body.target;

        // Target not found case
        if (!target) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy đối tượng cần chỉnh sửa!" }
            );
        }

        // Destruct target
        const { username, fullName, permission }: any = target;

        // Get user with given username
        const user: User | undefined = await userManager.get(username, []);

        // User not exist case
        if (!user) {
            return NextResponse.json(
                { success: false, message: `Không tồn tại tài khoản với tên người dùng "${username}" trong cơ sở dữ liệu hệ thống!` }
            );
        }

        // Updating user's info
        user.FullName = fullName;
        user.Permission = permission;

        // Updating user into db
        await userManager.update(user);

        // Success responding
        return NextResponse.json({ success: true });
    }
    catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.toString() }
        );
    }
}