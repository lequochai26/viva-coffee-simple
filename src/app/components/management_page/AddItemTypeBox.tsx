import ItemType from "@/app/interfaces/ItemType";
import EntityAlterScreenProps from "../management_panel/interfaces/EntityAlterScreenProps";
import { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";

// Info:
const routeHandler: string = "/management/itemtype";

// Main component:
export default function AddItemTypeBox({ onAlter, close }: EntityAlterScreenProps<ItemType>) {
    // States:
    const [ fields, setFields ] = useState<ItemType>(
        {
            id: "",
            name: ""
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
                    method: "POST",
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
                alert(message);
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

                {/* ID input field */}
                <p>
                    <InputField type="text" name="id" value={fields.id} placeholder="Mã loại sản phẩm" required={true} onChange={onFieldChange} />
                </p>

                {/* Name input field */}
                <p>
                    <InputField type="text" name="name" value={fields.name} placeholder="Tên loại sản phẩm" required={true} onChange={onFieldChange} />
                </p>

                {/* Submission area */}
                <p>
                    {/* Cancel button */}
                    <Button type="normalInForm" value="Hủy" onClick={close} className="margin5px" />

                    {/* Add button */}
                    <Button type="submit" value="Thêm" className="margin5px" />
                </p>

            </form>

        </div>
    )
}