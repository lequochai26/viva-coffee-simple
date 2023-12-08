import { Order } from "@/app/interfaces/Order";
import EntityAlterScreenProps from "../../management_panel/interfaces/EntityAlterScreenProps";
import { useState } from "react";
import User from "@/app/interfaces/User";
import Item from "@/app/interfaces/Item";
import AddOrderBox from "./AddOrderBox";

// Main component:
export default function AddOrderScreen({ user, onAlter, close }: EntityAlterScreenProps<Order>) {
    // States:
    const [ fields, setFields ] = useState<Order>(
        {
            id: "",
            createdBy: (user as User).username,
            createdByFullName: (user as User).fullName,
            date: new Date(),
            items: [
                {
                    item: "asd",
                    itemName: "Không biết",
                    itemPrice: 10000,
                    amount: 10,
                    totalPrice: 25
                }
            ],
            totalPrice: 0
        }
    );
    const [ itemList, setItemList ] = useState<{ [index: string]: Item[] }>({});

    // View:
    return (
        <div className="inlineBlock verticalAlignMiddle widthFitParent heightFitContent">
            {/* Add order box */}
            <AddOrderBox
                fields={fields}
                onAdd={function() {}}
                onAmountChange={function (event: any, index: number) {}}
                onCancel={function () {}}
                onRemove={function (index: number) {}}
            />
        </div>
    )
}