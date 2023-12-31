import User from "@/app/interfaces/User";
import { useState } from "react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import EntityAlterScreenProps from "../management_panel/interfaces/EntityAlterScreenProps";

// Info:
const routeHandler: string = "/management/user2";

// Main component:
export default function EditUserBox({ target, onAlter, close }: EntityAlterScreenProps<User>) {
    // States:
    const [ fields, setFields ] = useState<User>(
        {
            username: (target as User).username,
            password: (target as User).password,
            fullName: (target as User).fullName,
            permission: (target as User).permission
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

        try {
            // Sending HTTP request and receiving response
            const response: Response = await fetch(
                routeHandler,
                {
                    method: "PUT",
                    body: JSON.stringify(
                        {
                            target: fields
                        }
                    )
                }
            );

            // Parsing response's body into json
            const body: any = await response.json();

            // Failed case
            if (!body.success) {
                setMessage(body.message);
            }
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
        <div className="inlineBlock widthFitContent heightFitContent backgroundWhite borderBlackThin borderRadius5px padding5px paddingLeft25px paddingRight25px">
            
            {/* Form */}
            <form onSubmit={onSubmit}>

                {/* Full name input */}
                <p>
                    <InputField type="text" name="fullName" value={fields.fullName} onChange={onFieldChange} required={true} />
                </p>

                {/* Permission selector */}
                <p>
                    <SelectField name="permission" value={[ "EMPLOYEE", "ADMIN" ]} onChange={onFieldChange} selecting={fields.permission} />
                </p>

                {/* Actions area */}
                <p>
                    {/* Cancel button */}
                    <Button type="normalInForm" value="Hủy" onClick={close} className="margin5px" />

                    {/* Edit button */}
                    <Button type="submit" value="Sửa" />
                </p>

                {/* Message displaying area */}
                {
                    message && (
                        <p className="textColorRed width200px heightFitContent fontSize12px">
                            { message }
                        </p>
                    )
                }

            </form>

        </div>
    )
}