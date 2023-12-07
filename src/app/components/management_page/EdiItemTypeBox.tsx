import ItemType from "@/app/interfaces/ItemType";
import EntityAlterScreenProps from "../management_panel/interfaces/EntityAlterScreenProps";
import { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";

// Info:
const routeHandler: string = "/management/itemtype";

// Main component:
export default function EditItemTypeBox({ target, onAlter, close }: EntityAlterScreenProps<ItemType>) {
    // States:
    const [ fields, setFields ] = useState<ItemType>(
        {
            id: (target as ItemType).id,
            name: (target as ItemType).name
        }
    );
    const [ message, setMessage ] = useState<string | undefined>(undefined);

    // Event handlers:
    function onFieldChange({ target }: any) {
        setFields({ ...fields, [target.name]: target.value });
    }

    async function onSubmit(event: any) {
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
            const { success, message }: any = await response.json();

            // Failed case
            if (!success) {
                setMessage(message);
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
        <div className="inlineBlock verticalAlignMiddle widthFitContent heightFitContent padding10px paddingLeft25px paddingRight25px backgroundWhite borderBlackThin borderRadius5px">

            {/* Form */}
            <form onSubmit={onSubmit}>

                {/* Name input field */}
                <p>
                    <InputField type="text" name="name" value={fields.name} placeholder="Tên loại sản phẩm" required={true} onChange={onFieldChange} />
                </p>

                {/* Submission area */}
                <p>
                    {/* Cancel button */}
                    <Button type="normalInForm" value="Hủy" onClick={close} className="margin5px" />

                    {/* Edit button */}
                    <Button type="submit" value="Sửa" className="margin5px" />
                </p>

            </form>

        </div>
    )
}