import User from "@/app/interfaces/User";
import { ChangeEvent, useState } from "react";
import InputField from "../InputField";
import Button from "../Button";

// Info:
const routeHandler: string = "/user/changepassword";

// Interfaces:
interface ChangePasswordBoxProps {
    user: User;
    onCancel(): void;
    onSuccess(): void;
}

interface ChangePasswordBoxFields {
    curPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

// Main component:
export default function ChangePasswordBox({ user, onCancel, onSuccess }: ChangePasswordBoxProps) {
    // States:
    const [ fields, setFields ] = useState<ChangePasswordBoxFields>(
        {
            curPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        }
    );
    const [ message, setMessage ] = useState<string | undefined>(undefined);

    // Event handlers:
    function onFieldChange({ target }: any): void {
        setFields({ ...fields, [target.name]: target.value });
    }

    async function onSubmit(event: any): Promise<void> {
        // Default preventing
        event.preventDefault();

        // Prechecking
        // New password prechecking
        if (fields.newPassword !== fields.confirmNewPassword) {
            setMessage("Mật khẩu mới và xác nhận mật khẩu mới không khớp!");
            return;
        }

        try {
            // Sending HTTP request and receiving response
            const response: Response = await fetch(
                routeHandler,
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            username: user.username,
                            curPassword: fields.curPassword,
                            newPassword: fields.newPassword
                        }
                    )
                }
            );

            // Parsing response's body into json
            const { success, message }: { success: boolean, message: string } = await response.json();

            // Failed case
            if (!success) {
                setMessage(message);
            }
            // Success case
            else {
                // Fire onSuccess
                onSuccess();
            }
        }
        catch (error: any) {
            alert("Đã có lỗi xảy ra!");
            console.error(error);
        }
    }

    // View:
    return (
        <div className="inlineBlock verticalAlignMiddle widthFitContent heightFitContent backgroundWhite borderBlackThin borderRadius5px padding10px paddingLeft25px paddingRight25px">
            
            {/* Form */}
            <form onSubmit={onSubmit}>

                {/* Current password input */}
                <p>
                    <InputField type="password" name="curPassword" value={fields.curPassword} onChange={onFieldChange} placeholder="Mật khẩu hiện tại" required={true} />
                </p>

                {/* New password input */}
                <p>
                    <InputField type="password" name="newPassword" value={fields.newPassword} onChange={onFieldChange} placeholder="Mật khẩu mới" required={true} />
                </p>

                {/* Confirm new password */}
                <p>
                    <InputField type="password" name="confirmNewPassword" value={fields.confirmNewPassword} onChange={onFieldChange} placeholder="Xác nhận mật khẩu mới" required={true} />
                </p>

                {/* Submission area */}
                <p>
                    {/* Cancel button */}
                    <Button type="normalInForm" value="Hủy" onClick={onCancel} className="margin5px" />

                    {/* Submit button */}
                    <Button type="submit" value="Đổi" className="margin5px" />
                </p>

                {/* Message displaying area */}
                {
                    message && (
                        <p className="width200px heightFitContent textColorRed textAlignJustify fontSize12px">
                            { message }
                        </p>
                    )
                }

            </form>

        </div>
    )
}