import { useState } from "react";
import AlterUserBoxProps from "./interfaces/AlterUserBoxProps";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";

// Main component:
export default function AddUserBox({ onCancel, afterAlter }: AlterUserBoxProps) {
    // States:
    const [ fields, setFields ] = useState<{username: string, password: string, fullName: string, permission: string}>({username: "", password: "", fullName: "", permission: "EMPLOYEE"});
    const [ message, setMessage ] = useState<string | undefined>(undefined);

    // Event handlers:
    function onFieldChange({ target }: any) {
        setFields({ ...fields, [target.name]: target.value });
    }

    async function onSubmit(event: any) {
        // Default preventing
        event.preventDefault();

        try {
            // Sending HTTP Request and receiving response
            const response: Response = await fetch(
                "/management/user",
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            username: fields.username,
                            password: fields.password,
                            fullName: fields.fullName,
                            permission: fields.permission
                        }
                    )
                }
            );

            // Parse response's body to json
            const body: any = await response.json();

            // Failed case
            if (!body.success) {
                setMessage(body.message);
            }
            // Successfully case
            else {
                if (afterAlter) {
                    afterAlter();
                }
            }
        }
        catch (error: any) {
            alert("Đã có lỗi xảy ra trong quá trình gửi yêu cầu!");
            console.error(error);
        }
    }

    // View:
    return (
        <div className="inlineBlock widthFitContent heightFitContent backgroundWhite borderBlackThin borderRadius5px padding10px paddingLeft25px paddingRight25px verticalAlignMiddle">
            
            {/* Login form */}
            <form onSubmit={onSubmit}>

                {/* Username input field */}
                <p>
                    <InputField type="text" name="username" value={fields.username} placeholder="Tên người dùng" onChange={onFieldChange} required={true} />
                </p>

                {/* Password input field */}
                <p>
                    <InputField type="password" name="password" value={fields.password} placeholder="Mật khẩu" onChange={onFieldChange} required={true} />
                </p>

                {/* Full name input field */}
                <p>
                    <InputField type="text" name="fullName" value={fields.fullName} placeholder="Họ và tên" onChange={onFieldChange} required={true} />
                </p>

                {/* Permission input field */}
                <p>
                    <SelectField name="permission" value={["EMPLOYEE", "ADMIN"]} selecting={fields.permission} placeholder="Quyền" onChange={onFieldChange} />
                </p>

                {/* Submit / cancel area */}
                <p>
                    <Button type="submit" value="Thêm" className="margin5px" />
                    <Button type="normalInForm" value="Hủy" className="margin5px" onClick={onCancel} />
                </p>

                {/* Message displaying */}
                {
                    message
                    &&
                    <p className="textColorRed">
                        {message}
                    </p>
                }

            </form>

        </div>
    )
}