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