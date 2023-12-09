import Item from "@/app/interfaces/Item";
import EntityAlterScreenProps from "../management_panel/interfaces/EntityAlterScreenProps";
import { useEffect, useState } from "react";
import InputField from "../InputField";
import ItemType from "@/app/interfaces/ItemType";
import SelectField from "../SelectField";
import Button from "../Button";

// Info:
const routeHandler: string = "/management/item";
const itemTypeManagementRouteHandler: string = "/management/itemtype";

// Main component:
export default function AddItemBox({ onAlter, close }: EntityAlterScreenProps<Item>) {
    // States:
    const [ fields, setFields ] = useState<Item>(
        {
            id: "",
            name: "",
            price: 0,
            typeId: "",
            typeName: ""
        }
    );
    const [ message, setMessage ] = useState<string | undefined>(undefined);
    const [ itemTypes, setItemTypes ] = useState<[string, string][]>([]);

    // Effects:
    useEffect(
        function () {
            // Local functions:
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
                    const body: any = await response.json();

                    // Failed case
                    if (!body.success) {
                        alert(body.message);
                        close();
                    }
                    // Success case
                    else {
                        setItemTypes(
                            body.result.map(
                                function (itemType: ItemType, index: number) {
                                    if (index === 0) {
                                        setFields({ ...fields, typeId: itemType.id });
                                    }
                                    return [itemType.id, itemType.name];
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
    )

    // Event handlers:
    function onFieldChange({ target }: any): void {
        switch(target.name) {
            case 'price': {
                if (Number.isNaN(target.valueAsNumber)) {
                    return;
                }

                if (target.valueAsNumber < 0) {
                    return;
                }

                return setFields({ ...fields, price: target.valueAsNumber });
            }

            default: return setFields({ ...fields, [target.name]: target.value });
        }
    }

    async function onSubmit(event: any): Promise<void> {
        // Default preventing
        event.preventDefault();

        // Precheck
        // Price checking
        if (fields.price < 1) {
            setMessage("Đơn giá không hợp lệ!");
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

                {/* ID input */}
                <p>
                    <InputField type="text" name="id" value={fields.id} placeholder="Mã sản phẩm" required={true} onChange={onFieldChange} />
                </p>

                {/* Name input */}
                <p>
                    <InputField type="text" name="name" value={fields.name} placeholder="Tên sản phẩm" required={true} onChange={onFieldChange} />
                </p>

                {/* Price input */}
                <p>
                    <InputField type="number" name="price" value={fields.price} placeholder="Đơn giá" required={true} onChange={onFieldChange} />
                </p>

                {/* Item type select field */}
                <p>
                    <SelectField name="typeId" value={itemTypes} selecting={fields.typeId} placeholder="Loại sản phẩm" onChange={onFieldChange} />
                </p>

                {/* Submission area */}
                <p>
                    {/* Cancel button */}
                    <Button type="normalInForm" value="Hủy" onClick={close} className="margin5px" />

                    {/* Add button */}
                    <Button type="submit" value="Thêm" className="margin5px" />
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