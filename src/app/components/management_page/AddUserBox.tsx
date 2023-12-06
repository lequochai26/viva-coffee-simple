import { useState } from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import User from "@/app/interfaces/User";
import EntityAlterScreenProps from "../management_panel/interfaces/EntityAlterScreenProps";

// Info:
const routeHandler: string = "/management/user2";

// Main component:
export default function AddUserBox({ onAlter, close }: EntityAlterScreenProps<User>) {
    // States:
    const [ fields, setFields ] = useState<User>({username: "", password: "", fullName: "", permission: "EMPLOYEE" });
    const [ message, setMessage ] = useState<string | undefined>(undefined);

    // Event handlers:
    function onFieldChange({ target }: any): void {
        setFields({ ...fields, [target.name]: target.value });
    }

    async function onSubmit(event: any): Promise<void> {
        // Default preventing
        event.preventDefault();

        try {
            // Try sending HTTP request and receiving response
            const response: Response = await fetch(
                routeHandler,
                {
                    method: "POST",
                    body: JSON.stringify(
                        {
                            target: fields
                        }
                    )
                }
            );

            // Parse response's body into json
            const body: any = await response.json();

            // Failed case
            if (!body.success) {
                setMessage(body.message);
            }
            // Success case
            else {
                // Fire onAlter
                onAlter();

                // Close
                close();
            }
        }
        catch (error: any) {
            alert("Đã có lỗi xảy ra!");
            console.error(error);
        }
    }

    // View:
    return (
        <div className="inlineBlock withFitContent heightFitContent backgroundWhite borderBlackThin borderRadius5px verticalAlignMiddle padding10px paddingLeft25px paddingRight25px">
            
            {/* Add User form */}
            <form onSubmit={onSubmit}>

                {/* Username input */}
                <p>
                    <InputField type="text" name="username" value={fields.username} placeholder="Tên người dùng" onChange={onFieldChange} required={true} />
                </p>

                {/* Password input */}
                <p>
                    <InputField type="password" name="password" value={fields.password} placeholder="Mật khẩu" onChange={onFieldChange} required={true} />
                </p>

                {/* Full name input */}
                <p>
                    <InputField type="text" name="fullName" value={fields.fullName} placeholder="Họ và tên" onChange={onFieldChange} required={true} />
                </p>

                {/* Permission selector */}
                <p>
                    <SelectField name="permission" value={[ "EMPLOYEE", "ADMIN" ]} selecting={fields.permission} placeholder="Quyền" onChange={onFieldChange} />
                </p>

                {/* Actions area */}
                <p>
                    {/* Cancel button */}
                    <Button type="normalInForm" value="Hủy" onClick={close} className="margin5px" />

                    {/* Add button */}
                    <Button type="submit" value="Thêm" className="margin5px" />
                </p>

                {/* Message displaying */}
                {
                    message
                    && (
                        <p className="textColorRed">
                            { message }
                        </p>
                    )
                }

            </form>

        </div>
    )
}