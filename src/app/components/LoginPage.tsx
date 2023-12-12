import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import User from "../interfaces/User";

export type LoginOnSubmit = (username: string, password: string) => void;

export interface LoginPageProps {
    onLogin(user: User): void;
}

interface LoginFormFields {
    username?: string;
    password?: string;
}

export function LoginPage({ onLogin }: LoginPageProps) {
    // States:
    const [ fields, setFields ] = useState<LoginFormFields>({});
    const [ message, setMessage ] = useState<string | undefined>(undefined);

    // Event handlers:
    function onFieldChanged({ target }: any): void {
        setFields({...fields, [target.name]: target.value});
    }

    async function onSubmit(event: any): Promise<void> {
        // Default preventing
        event.preventDefault();

        try {
            // Sending HTTP request and receiving response
            const response: Response = await fetch(
                "/login",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            username: fields.username,
                            password: fields.password
                        }
                    )
                }
            );

            // Parsing response's body into json
            const body: any = await response.json();

            // Destruct body
            const { success, user, message }: { success: boolean, user: User, message: string } = body;

            // Failed case
            if (!success) {
                setMessage(message);
            }
            // Success case
            else {
                // Fire onLogin event handler
                onLogin(user);
            }
        }
        catch (error: any) {
            alert("Đã có lỗi xảy ra!");
            console.error(error);
        }
    }

    // View:
    return (
        <div className="block widthFitParent heightFitParent textAlignCenter">
            {/* Ruler */}
            <div className="ruler"></div>

            {/* Login box */}
            <div className="inlineBlock verticalAlignMiddle widthFitContent heightFitContent padding10px paddingLeft25px paddingRight25px borderBlackThin borderRadius5px">
                {/* Login label */}
                <div>
                    <h1 className="fontWeightNormal">
                        Đăng nhập
                    </h1>
                </div>

                {/* Login form */}
                <form onSubmit={onSubmit}>
                    {/* Username input */}
                    <div className="margin10px">
                        <InputField type="text" name="username" value={fields.username} onChange={onFieldChanged} placeholder="Tên người dùng" />
                    </div>

                    {/* Password input */}
                    <div className="margin10px marginBottom25px">
                        <InputField type="password" name="password" value={fields.password} onChange={onFieldChanged} placeholder="Mật khẩu" />
                    </div>

                    {/* Submit button */}
                    <div className="margin10px">
                        <Button type="submit" value="Đăng nhập" />
                    </div>

                    {/* Message displaying area */}
                    {
                        message && (
                            <div>
                                <p className="width200px heightFitContent textColorRed fontSize12px textAlignJustify">
                                    { message }
                                </p>
                            </div>
                        )
                    }
                </form>
            </div>
        </div>
    )
}