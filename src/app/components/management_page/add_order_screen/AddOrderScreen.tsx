import { Order } from "@/app/interfaces/Order";
import EntityAlterScreenProps from "../../management_panel/interfaces/EntityAlterScreenProps";
import { useState } from "react";
import User from "@/app/interfaces/User";
import Item from "@/app/interfaces/Item";
import AddOrderBox from "./AddOrderBox";
import AddOrderItemBox from "./AddOrderItemBox";

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
    const [ itemList, setItemList ] = useState<{ [index: string]: Item[] }>(
        {
            "Cà phê": [
                {
                    id: "ASD",
                    name: "Cà phê sữa đá",
                    price: 20000,
                    typeId: "A",
                    typeName: "ASD"
                }
            ]
        }
    );
    const [ keyword, setKeyword ] = useState<string>("");

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

            {/* Add order item box */}
            <AddOrderItemBox
                itemList={itemList}
                keyword={keyword}
                onAdd={function (type: string, index: number): void {}}
                onKeywordChange={function (event: any): void {}}
                onReload={function (): void {}}
                onSearch={function (): void {}}
            />
        </div>
    )
}