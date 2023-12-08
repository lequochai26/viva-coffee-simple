import { Order } from "@/app/interfaces/Order";
import EntityAlterScreenProps from "../../management_panel/interfaces/EntityAlterScreenProps";
import { useEffect, useState } from "react";
import User from "@/app/interfaces/User";
import Item from "@/app/interfaces/Item";
import AddOrderBox from "./AddOrderBox";
import AddOrderItemBox from "./AddOrderItemBox";

// Info:
const routeHandler: string = "/management/order";
const itemManagementRouteHandler: string = "/management/item";

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

    // Data operations:
    async function load(keyword?: string): Promise<void> {
        try {
            // Sending HTTP request and receiving response
            const response: Response = await fetch(
                (keyword ? `${itemManagementRouteHandler}?keyword=${keyword}` : itemManagementRouteHandler),
                {
                    method: "GET",
                    headers: [
                        ["method", "GETALL"]
                    ]
                }
            );

            // Parsing response's body into json
            const { success, result, message }: { success: boolean, result: Item[], message: string } = await response.json();

            // Failed case
            if (!success) {
                alert(message);
            }
            // Success case
            else {
                setItemList(
                    itemsToItemList(result)
                );
            }
        }
        catch (error: any) {
            alert("Đã có lỗi xảy ra!");
            console.error(error);
        }
    }

    // Effects:
    useEffect(
        function () {
            load();
        }, []
    )

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

// Local functions:
function itemsToItemList(items: Item[]): { [index: string]: Item[] } {
    // Item list initialization
    const itemList: { [index: string]: Item[] } = {};

    // Conversion
    items.forEach(
        function (item: Item): void {
            if (!itemList[item.typeName]) {
                itemList[item.typeName] = [];
            }
            itemList[item.typeName].push(item);
        }
    )

    // Return item list
    return itemList
}