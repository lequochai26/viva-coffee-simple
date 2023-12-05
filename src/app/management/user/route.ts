import { userManager } from "@/domain/EntityManagerCollection";
import User, { UserPermission } from "@/domain/entities/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Get neccessary headers
        const getMethod: string | null = request.headers.get("getMethod");
        const username: string | null = request.headers.get("username");
        const searchKeyword: string | null = request.nextUrl.searchParams.get("searchKeyword");

        // Method undefined case
        switch(getMethod) {
            case "GETALL": return NextResponse.json(
                {
                    success: true,
                    result: (await userManager.getAll([])).map(
                        function (user: User) {
                            return {
                                username: user.Username,
                                fullName: user.FullName,
                                permission: user.Permission
                            };
                        }
                    )
                }
            );

            case "GET": {
                // Username provided case
                if (username) {
                    const user: User | undefined = await userManager.get(username, []);
                    
                    // User found case
                    if (user) {
                        return NextResponse.json(
                            {
                                success: true,
                                result: {
                                    username: user.Username,
                                    fullName: user.FullName,
                                    permission: user.Permission
                                }
                            }
                        );
                    }
                    // User not found case
                    else {
                        return NextResponse.json(
                            {
                                success: false,
                                message: "Không tìm thấy người dùng được yêu cầu"
                            }
                        );
                    }
                }
                // Username not provided case
                else {
                    return NextResponse.json(
                        {
                            success: false,
                            message: "Username chưa được cung cấp!"
                        }
                    )
                }
            }

            case "GETBYKEYWORD": {
                if (!searchKeyword) {
                    return NextResponse.json(
                        {
                            success: false,
                            message: "Không tìm thấy từ khóa tìm kiếm!"
                        }
                    )
                }
                else {
                    return NextResponse.json(
                        {
                            success: true,
                            result: (await userManager.getAll([])).map(
                                function(user: User) {
                                    return {
                                        username: user.Username,
                                        fullName: user.FullName,
                                        permission: user.Permission
                                    }
                                }
                            ).filter(
                                function (user: {username?: string, fullName?: string, permission?: string}) {
                                    if (`${user.username} ${user.fullName} ${user.permission}`.indexOf(searchKeyword) !== -1) {
                                        return user;
                                    }
                                }
                            )
                        }
                    );
                }
            }

            default: return NextResponse.json(
                {
                    success: false,
                    message: "Phương thức không hợp lệ!"
                }
            );
        }
    }
    catch (error: any) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: error.toString()
            }
        );
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Parsing request's body into json
        const body: any = await request.json();

        // Get necessary parameters
        const username: string = body.username;
        const password: string = body.password;
        const fullName: string = body.fullName;
        const permission: UserPermission = body.permission;

        // Account already exist case
        if (await userManager.get(username, [])) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Tài khoản này đã tồn tại!"
                }
            )
        }

        // Create new user based on given informations
        const user: User = new User(username, password, fullName, permission);

        // Inserting user
        userManager.insert(user);

        // Responding
        return NextResponse.json({ success: true });
    }
    catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: `${error}` }
        );
    }
}