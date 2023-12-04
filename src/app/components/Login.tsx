import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

export type LoginOnSubmit = (username: string, password: string) => void;

export interface LoginProps {
    onSubmit?: LoginOnSubmit;
    message?: string;
    messageClassName?: string;
}

interface LoginFields {
    username?: string;
    password?: string;
}

export function Login(props: LoginProps) {
    // States:
    const [ fields, setFields ] = useState<LoginFields>({});

    // Event handlers:
    function onFieldChanged({ target }: any): void {
        setFields({...fields, [target.name]: target.value});
    }

    function onSubmit(event: any) {
        event.preventDefault();

        if (props.onSubmit) {
            props.onSubmit(
                (fields.username ? fields.username : ""),
                (fields.password ? fields.password : "")
            );
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
                </form>
            </div>
        </div>
    )
}