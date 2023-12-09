import { userManager } from "@/domain/EntityManagerCollection";
import User from "@/domain/entities/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        // Parsing request's body into json
        const { username, curPassword, newPassword }: { username?: string, curPassword?: string, newPassword?: string } = await request.json();

        // Username not found case
        if (!username) {
            return NextResponse.json(
                { success: false, message: "Không xác định được đối tượng cần đổi mật khẩu!" }
            );
        }

        // Old password not found case
        if (!curPassword) {
            return NextResponse.json(
                { success: false, message: "Vui lòng cung cấp mật khẩu hiện tại trước khi thực hiện hành động này!" }
            );
        }

        // New password not found case
        if (!newPassword) {
            return NextResponse.json(
                { success: false, message: "Vui lòng cung cấp mật khẩu mới trước khi thực hiện hành động này!" }
            )
        }

        // Get target entity from browser
        const user: User | undefined = await userManager.get(username, []);

        // Target entity not found in db
        if (!user) {
            return NextResponse.json(
                { success: false, message: `Người dùng "${username}" không tồn tại trong cơ sở dữ liệu hệ thống!` }
            );
        }

        // Invalid current password case
        if (curPassword !== user.Password) {
            return NextResponse.json(
                { success: false, message: "Mật khẩu hiện tại không đúng!" }
            );
        }

        // Set new password for user
        user.Password = newPassword;

        // Updating user entity into db
        await userManager.update(user);

        // Success responding
        return NextResponse.json(
            { success: true }
        )
    }
    catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.toString() }
        );
    }
}