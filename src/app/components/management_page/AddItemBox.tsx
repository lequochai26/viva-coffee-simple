import Item from "@/app/interfaces/Item";
import EntityAlterScreenProps from "../management_panel/interfaces/EntityAlterScreenProps";
import { useState } from "react";
import InputField from "../InputField";

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

    // View:
    return (
        <div className="inlineBlock verticalAlignMiddle widthFitContent heightFitContent padding10px paddingLeft25px paddingRight25px backgroundWhite borderBlackThin borderRadius5px">
            
            {/* Form */}
            <form>

                {/* ID input */}
                <p>
                    <InputField type="text" name="id" value={fields.id} placeholder="Mã sản phẩm" required={true} />
                </p>

                {/* Name input */}
                <p>
                    <InputField type="text" name="name" value={fields.name} placeholder="Tên sản phẩm" required={true} />
                </p>

                {/* Price input */}
                <p>
                    <InputField type="number" name="price" value={fields.price} placeholder="Đơn giá" required={true} />
                </p>

            </form>

        </div>
    )
}