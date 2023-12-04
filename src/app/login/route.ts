import { userManager } from "@/domain/EntityManagerCollection";
import User from "@/domain/entities/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    // Parse request to json
    const parameters: any = await request.json();

    // Get username and password
    const username: string = parameters.username;
    const password: string = parameters.password;

    // Get user based on username
    const path: any[] = [];
    const user: User | undefined = await userManager.get(username, path);

    // User not exist case
    if (!user) {
        return NextResponse.json(
            { success: false, message: "Tài khoản hoặc mật khẩu không đúng!" }
        );
    }

    // Password invalid case
    if (user.Password !== password) {
        return NextResponse.json(
            { success: false, message: "Tài khoản hoặc mật khẩu không đúng!" }
        );
    }

    // Successfully
    return NextResponse.json(
        {
            success: true,
            user: {
                username: user.Username,
                fullName: user.FullName
            }
        }
    );
}