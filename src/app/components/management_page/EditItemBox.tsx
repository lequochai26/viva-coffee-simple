import Item from "@/app/interfaces/Item";
import EntityAlterScreenProps from "../management_panel/interfaces/EntityAlterScreenProps";
import { useEffect, useState } from "react";
import ItemType from "@/app/interfaces/ItemType";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";

// Info:
const routeHandler: string = "/management/item";
const itemTypeManagementRouteHandler: string = "/management/itemtype";

// Main component:
export default function EditItemBox({ target, onAlter, close }: EntityAlterScreenProps<Item>) {
    // States:
    const [ fields, setFields ] = useState<Item>(
        {
            id: (target as Item).id,
            name: (target as Item).name,
            price: (target as Item).price,
            typeId: (target as Item).typeId,
            typeName: (target as Item).typeName
        }
    );
    const [ message, setMessage ] = useState<string | undefined>(undefined);
    const [ itemTypes, setItemTypes ] = useState<[string, string][]>([]);

    // Effects:
    useEffect(
        function () {
            async function run(): Promise<void> {
                try {
                    // Sending HTTP request and receiving response
                    const response: Response = await fetch(
                        itemTypeManagementRouteHandler,
                        {
                            method: "GET",
                            headers: [
                                ["method", "GETALL"]
                            ]
                        }
                    );

                    // Parsing response's body into json
                    const { success, result, message }: any = await response.json();

                    // Failed case
                    if (!success) {
                        alert(message);
                    }
                    // Success case
                    else {
                        setItemTypes(
                            result.map(
                                function (itemType: ItemType, index: number) {
                                    if (!fields.typeId) {
                                        if (index === 0) {
                                            setFields({ ...fields, typeId: itemType.id })
                                        }
                                    }
                                    return [ itemType.id, itemType.name ];
                                }
                            )
                        );
                    }
                }
                catch (error: any) {
                    throw error;
                }
            }

            run().catch(
                function (error: any) {
                    alert("Đã có lỗi xảy ra!");
                    console.error(error);
                }
            )
        }, []
    );

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
                    <InputField type="text" name="name" value={fields.name} placeholder="Tên sản phẩm" required={true} onChange={onFieldChange} />
                </p>

                {/* Price input field */}
                <p>
                    <InputField type="number" name="price" value={fields.price} placeholder="Đơn giá" required={true} onChange={onFieldChange} />
                </p>

                {/* Type select field */}
                <p>
                    <SelectField name="typeId" value={itemTypes} placeholder="Loại sản phẩm" selecting={fields.typeId} onChange={onFieldChange} />
                </p>

                {/* Submission area */}
                <p>
                    {/* Cancel button */}
                    <Button type="normalInForm" value="Hủy" onClick={close} className="margin5px" />

                    {/* Edit button */}
                    <Button type="submit" value="Sửa" className="margin5px" />
                </p>

                {/* Message displaying area */}
                {
                    message && (
                        <p className="width200px heightFitContent textColorRed fontSize12px textAlignJustify">
                            { message }
                        </p>
                    )
                }

            </form>

        </div>
    )
}